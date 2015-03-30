package io.github.mobi_led.socialights;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Button;
import android.widget.Toast;

import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.apache.http.Header;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

import io.github.mobi_led.socialights.controllers.GameRestClient;
import io.github.mobi_led.socialights.controllers.RestApi;
import io.github.mobi_led.socialights.models.Answer;
import io.github.mobi_led.socialights.models.Game;
import io.github.mobi_led.socialights.models.Question;


public class QuizActivity extends Activity {

    private Question question;
    private Button[] buttons = new Button[4];
    Game game;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiznew);

        buttons = new Button[] {(Button) findViewById(R.id.button1),
                (Button) findViewById(R.id.button2),
                (Button) findViewById(R.id.button3),
                (Button) findViewById(R.id.button4)};

        Intent quizz = getIntent();
        game = (Game)quizz.getSerializableExtra("game");
        question = (Question)quizz.getSerializableExtra("question");
        String name = quizz.getStringExtra("name");
        TextView quizQuestion = (TextView)findViewById(R.id.txtQuestion);
        TextView nameTxt = (TextView)findViewById(R.id.txtName);
        nameTxt.setText("Hello " + name + "!");

        quizQuestion.setText(question.getQuestion());
        List<Answer> answerList = question.getAnswers();

        for (int i= 0; i < answerList.size(); i++){
           Button btn = buttons[i];
           Answer answer =  answerList.get(i);
           String answerText=answer.getAnswerString();
           btn.setText(answerText);
           btn.setTag(answer);
        }
    }
    public void btnClick(View view) {

        Answer userAnswer = (Answer) view.getTag();
        int feedbackColor = (userAnswer.isCorrect()) ? Color.rgb(0, 255, 0) : Color.rgb(255, 0, 0);
        findViewById(view.getId()).setBackgroundColor(feedbackColor);

        for (int i = 0; i < buttons.length; i++) {
            if(i != view.getId()) buttons[i].setEnabled(false);
        }

        // prepare game for post
        // post

    }

}
