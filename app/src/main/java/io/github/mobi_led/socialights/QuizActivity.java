package io.github.mobi_led.socialights;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.text.format.Time;
import android.util.Log;
import android.view.View;
import android.view.animation.Animation;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import java.util.concurrent.TimeUnit;

import io.github.mobi_led.client.Client;
import io.github.mobi_led.client.models.Answer;
import io.github.mobi_led.client.models.AskedQuestion;
import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.Team;
import io.github.mobi_led.client.models.User;
import rx.Observable;
import rx.Subscription;
import rx.android.schedulers.AndroidSchedulers;
import rx.functions.Action1;
import rx.schedulers.Schedulers;

public class QuizActivity extends Activity {

    private Game currentGame;
    private Button[] buttons = new Button[4];
    private Animation animScale = null;
    private TextView questionTxt;
    private Client client;
    private User currentUser;
    private ProgressBar progress;
    private Handler handler = new Handler();
    private TextView teamTxt;
    private TextView nameTxt;
    private TextView questionForTxt;
    private int currentTeamIdx;
    private Observable<Long> interval;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiz);

        buttons = new Button[]{(Button) findViewById(R.id.button1),
                (Button) findViewById(R.id.button2),
                (Button) findViewById(R.id.button3),
                (Button) findViewById(R.id.button4)};

        questionForTxt = (TextView) findViewById(R.id.txtQuestionFor);
        questionTxt = (TextView) findViewById(R.id.txtQuestion);
        nameTxt = (TextView) findViewById(R.id.txtWhichUser);
        teamTxt = (TextView) findViewById(R.id.txtWhichTeam);

        interval = Observable.interval(100l, TimeUnit.MILLISECONDS);
        progress = (ProgressBar) findViewById(R.id.progressBar);

        currentUser = (User) getIntent().getExtras().get("user");
        currentGame = (Game) getIntent().getExtras().get("game");
        currentTeamIdx = getIntent().getExtras().getInt("teamIndex", 0);

        client = Client.getInstance();

        nameTxt.setText("Hello, " + currentUser.getName() + "!");
    }

    private Subscription gameSubscription;

    private Subscription progressSubscription;

    @Override
    protected void onResume() {
        super.onResume();
        gameSubscription = client.watch(currentGame).subscribe(new Action1<Game>() {
            @Override
            public void call(Game game) {
                currentGame = game;
                onGameUpdate();
            }
        });

        progressSubscription = interval
                .subscribeOn(Schedulers.newThread())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Action1<Long>() {
                    private long askedAt;
                    private long deadlineAt;
                    private long now;

                    @Override
                    public void call(Long aLong) {
                        AskedQuestion currentQuestion = currentGame.getQuestion();

                        if (currentQuestion != null) {
                            Time n = new Time();
                            n.setToNow();
                            now = n.toMillis(true);

                            askedAt = currentQuestion.getAskedAt().getTime();
                            deadlineAt = currentQuestion.getDeadlineAt().getTime();

                            if (askedAt <= now && deadlineAt > now && currentQuestion.getAnsweredAt() == null) {
                                // Active Question
                                long totalTime = deadlineAt - askedAt;
                                long timeLeft = deadlineAt - now;
                                progress.setMax((int) totalTime);
                                progress.setProgress((int) timeLeft);
                            } else {
                                // Inactive Question
                                progress.setMax(100);
                                progress.setProgress(0);
                            }

                            if (deadlineAt < now && currentQuestion.getAnsweredAt() == null) {
                                for (int i = 0; i < 4; i++) {
                                    buttons[i].setEnabled(false);
                                    buttons[i].setBackgroundColor(Color.rgb(255, 0, 0));
                                }
                                questionForTxt.setText("Deadline expired.");
                            }
                        }

                    }
                });

        onGameUpdate();
    }

    @Override
    protected void onPause() {
        super.onPause();
        gameSubscription.unsubscribe();
        progressSubscription.unsubscribe();
    }

    protected void onGameUpdate() {
        Log.i("onGameUpdate", "Updated");

        final QuizActivity activity = this;

        if (currentGame.getFinished()) {
            Observable.timer(1000l, TimeUnit.MILLISECONDS)
                    .subscribeOn(Schedulers.newThread())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(new Action1<Long>() {
                        @Override
                        public void call(Long aLong) {
                            // Move to next screen
                            Intent intent = new Intent(activity, GameFinishedActivity.class);
                            intent.putExtra("user", currentUser);
                            startActivity(intent);
                        }
                    });
        }

        Team currentTeam = currentGame.getTeams().get(currentTeamIdx);
        currentUser.setTeam(currentTeam);
        teamTxt.setText(currentTeam.getName() + " | Score: " + currentTeam.getScore());

        if (currentGame.getQuestion() != null) {
            AskedQuestion currentQuestion = currentGame.getQuestion();

            Team team = currentGame.getTeams().get(currentQuestion.getTeam());
            if (currentQuestion.getAnswer() != null) {
                String correctly;
                if (currentQuestion.getAnsweredCorrectly()) {
                    correctly = "correctly";
                } else {
                    correctly = "incorrectly";
                }
                questionForTxt.setText("Question answered " + correctly + " by " + team.getName() + ":");
            } else {
                questionForTxt.setText("Question for " + team.getName() + ":");
            }
            questionTxt.setText(currentQuestion.getQuestion().getQuestion());

            for (int i = 0; i < 4; i++) {
                Answer a = currentQuestion.getQuestion().getAnswers().get(i);
                buttons[i].setText(a.getAnswer());
                buttons[i].setTag(a);
                buttons[i].setEnabled(currentQuestion.getTeam().equals(currentTeamIdx));
                if((currentQuestion.getAnswer() != null && currentQuestion.getAnswer().equals(a))){
                    int feedbackColor = currentQuestion.getAnsweredCorrectly() ? Color.rgb(0, 255, 0):Color.rgb(255, 0, 0);
                    buttons[i].setBackgroundColor(feedbackColor);
                }
                else buttons[i].setBackgroundColor(android.R.drawable.btn_default);
            }
        } else {
            questionTxt.setText("Waiting for question...");
            for (int i = 0; i < 4; i++) {
                buttons[i].setText("");
                buttons[i].setEnabled(false);
            }
        }
    }

    public void btnClick(View view) {

        Answer answer = (Answer) view.getTag();

        if (currentGame.getQuestion().getAnswer() == null) {
            client.answerQuestion(currentGame.getId(), currentUser.getId(), answer.getId()).subscribe(new Action1<Game>() {
                @Override
                public void call(Game game) {

                }
            });
        }

    }

}
