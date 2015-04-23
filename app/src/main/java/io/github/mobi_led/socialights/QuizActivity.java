package io.github.mobi_led.socialights;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Button;

import java.util.List;

import io.github.mobi_led.client.Client;
import io.github.mobi_led.client.models.AskedQuestion;
import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.Answer;
import io.github.mobi_led.client.models.Question;

import io.github.mobi_led.client.models.Team;
import io.github.mobi_led.client.models.User;
import rx.functions.Action1;

import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Toast;

public class QuizActivity extends Activity {

    private Game mGame;
    private Button[] buttons = new Button[4];
    private Animation animScale = null;
    private TextView quizQuestion;
    private Client client;
    private User user;
    private ProgressBar progress;
    private TextView teamTxt;
    private int currentTeamIdx;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_quiz);
        client = Client.getInstance();

        buttons = new Button[] {(Button) findViewById(R.id.button1),
                (Button) findViewById(R.id.button2),
                (Button) findViewById(R.id.button3),
                (Button) findViewById(R.id.button4)};


        animScale = AnimationUtils.loadAnimation(this, R.anim.button_scale);
        progress = (ProgressBar) findViewById(R.id.progressBar);
        Intent quizz = getIntent();

        mGame = (Game)quizz.getSerializableExtra("game");
        user = (User)quizz.getSerializableExtra("user");
        quizQuestion = (TextView)findViewById(R.id.txtQuestion);

        TextView nameTxt = (TextView)findViewById(R.id.txtWhichUser);
        nameTxt.setText("Hello " + user.getName() + "!");
        currentTeamIdx = quizz.getIntExtra("teamIndex", 0);
        teamTxt = (TextView)findViewById(R.id.txtWhichTeam);
        Team currentTeam = mGame.getTeams().get(currentTeamIdx);
        setTeamScore(currentTeam.getName() , currentTeam.getScore());

        setQuestionsThread(mGame);
    }

    private void setTeamScore(String name, int score){
        teamTxt.setText(name + " | Score: " + score);
    }

    public void btnClick(View view) {

        Answer userAnswer = (Answer) view.getTag();

        int feedbackColor = (userAnswer.getCorrect()) ? Color.rgb(0, 255, 0) : Color.rgb(255, 0, 0);
        findViewById(view.getId()).setBackgroundColor(feedbackColor);

        for (int i = 0; i < buttons.length; i++) {
           if(i != view.getId()) buttons[i].setEnabled(false);
           view.startAnimation(animScale);
        }

        progress.setVisibility(View.VISIBLE);
        client.answerQuestion(mGame.getId(), user.getId(), userAnswer.getId()).subscribe(new Action1<Game>() {
            @Override
            public void call(Game game) {
                setQuestionsThread(game);
                logQuestions(game.getPreviousQuestions());
                progress.setVisibility(View.INVISIBLE);
            }
        }, new Action1<Throwable>() {

            @Override
            public void call(Throwable throwable) {
                Toast.makeText(getApplicationContext(),throwable.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }

    private void logQuestions(List<AskedQuestion> questions){
          if(questions == null || questions.size() == 0)
          {
              Log.i("logQuestions ", "Nothing to log");
              return;
          }
        for (int i = 0; i < questions.size(); i++) {
          Log.i("logQuestions: " + i, questions.get(i).getAskedAt().toString());
        }
    }

    private void setQuestionsThread(final Game game) {

        if(game == null || game.getQuestion() == null || game.getQuestion().getQuestion() == null){
           // No Question available
            Toast.makeText(getApplication().getApplicationContext(),"setQuestionThread: No Question", Toast.LENGTH_LONG).show();
            return;
        }

        Log.i("QuizActivity", "setQuestionsThread ");

        final Handler handler = new Handler();

      //  if(mGame.getQuestion().getQuestion().getId() != game.getQuestion().getQuestion().getId())
      //      mGame = game;

        Runnable runnable = new Runnable() {

            public void run() {

              try{

                  final Question question = game.getQuestion().getQuestion();
                  final List<Answer> answerList = question.getAnswers();

                  handler.post(new Runnable(){
                      public void run() {
                          quizQuestion.invalidate();
                          quizQuestion.setText(question.getQuestion());
                          Team team = game.getTeams().get(currentTeamIdx);
                          setTeamScore(team.getName(), team.getScore());

                          for (int i= 0; i < answerList.size(); i++){
                              Button btn = buttons[i];
                              Answer answer =  answerList.get(i);
                              String answerText= answer.getAnswer();
                              btn.setEnabled(true);
                              btn.setText(answerText);
                              btn.setTag(answer);
                              btn.setBackgroundColor(Color.parseColor("#EB9F3D"));
                          }
                      }
                  });
               }catch (Exception ex){
                  Toast.makeText(getApplication().getApplicationContext(),
                          "setQuestionThread " + ex.getMessage(), Toast.LENGTH_LONG).show();
                  Log.i("QuizActivity", "setQuestionsThread " + ex.getMessage());
              }
                }
        };
        new Thread(runnable).start();
    }
}
