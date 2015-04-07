package io.github.mobi_led.socialights;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Button;

import java.util.List;

import io.github.mobi_led.client.Client;
import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.Answer;
import io.github.mobi_led.client.models.Question;

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
        Intent quizz = getIntent();

        mGame = (Game)quizz.getSerializableExtra("game");
        Question question = mGame.getQuestion().getQuestion();
        user = (User)quizz.getSerializableExtra("user");
        quizQuestion = (TextView)findViewById(R.id.txtQuestion);

        TextView nameTxt = (TextView)findViewById(R.id.txtWhichUser);
        nameTxt.setText("Hello " + user.getName() + "!");
        int teamIdx = quizz.getIntExtra("teamIndex", 0);
        TextView teamTxt = (TextView)findViewById(R.id.txtWhichTeam);
        teamTxt.setText(mGame.getTeams().get(teamIdx).getName());

        setQuestion(question);
    }

    private void setQuestion(Question question) {

        Log.v("Asking question", question.getId());
        Toast.makeText(this, question.getId(), Toast.LENGTH_SHORT);
        quizQuestion.setText(question.getQuestion());
        List<Answer> answerList = question.getAnswers();

        for (int i= 0; i < answerList.size(); i++){
           Button btn = buttons[i];
           Answer answer =  answerList.get(i);
           String answerText= answer.getAnswer();
           btn.setText(answerText);
           btn.setTag(answer);
        }
    }

    public void btnClick(View view) {

        Answer userAnswer = (Answer) view.getTag();
        int feedbackColor = (userAnswer.getCorrect()) ? Color.rgb(0, 255, 0) : Color.rgb(255, 0, 0);
        findViewById(view.getId()).setBackgroundColor(feedbackColor);

        for (int i = 0; i < buttons.length; i++) {
           if(i != view.getId()) buttons[i].setEnabled(false);
           view.startAnimation(animScale);
        }

        //progressbar
        client.answerQuestion(mGame.getId(), user.getId(), userAnswer.getId()).subscribe(new Action1<Game>() {
            @Override
            public void call(Game game) {
                mGame = game;
                setQuestion(game.getQuestion().getQuestion());
            }
        });
    }

}
