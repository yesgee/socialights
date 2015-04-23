package io.github.mobi_led.socialights;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.animation.Animation;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import io.github.mobi_led.client.Client;
import io.github.mobi_led.client.models.Answer;
import io.github.mobi_led.client.models.AskedQuestion;
import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.Team;
import io.github.mobi_led.client.models.User;
import rx.Subscription;
import rx.functions.Action1;

public class QuizActivity extends Activity {

    private Game currentGame;
    private Button[] buttons = new Button[4];
    private Animation animScale = null;
    private TextView questionTxt;
    private Client client;
    private User currentUser;
    private ProgressBar progress;
    private TextView teamTxt;
    private TextView nameTxt;
    private TextView questionForTxt;
    private int currentTeamIdx;

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

        currentUser = (User) getIntent().getExtras().get("user");
        currentGame = (Game) getIntent().getExtras().get("game");
        currentTeamIdx = getIntent().getExtras().getInt("teamIndex", 0);

        client = Client.getInstance();

        nameTxt.setText("Hello, " + currentUser.getName() + "!");
    }

    private Subscription gameSubscription;

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
        onGameUpdate();
    }

    @Override
    protected void onPause() {
        super.onPause();
        gameSubscription.unsubscribe();
    }

    protected void onGameUpdate() {
        Log.i("onGameUpdate", "Updated");

        if (currentGame.getFinished()) {
            // Move to next screen
            Intent intent = new Intent(this, GameFinishedActivity.class);
            startActivity(intent);
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
                if (currentQuestion.getAnswer() != null && currentQuestion.getAnswer().equals(a)) {
                    if (currentQuestion.getAnsweredCorrectly()) {
                        // TODO: Set the color to correct
                    } else {
                        // TODO: Set the color to incorrect
                    }
                } else {
                    // TODO: Reset the color to default
                }
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
