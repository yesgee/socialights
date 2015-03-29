package io.github.mobi_led.socialights;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.Button;

import java.util.List;

import io.github.mobi_led.socialights.models.Answer;
import io.github.mobi_led.socialights.models.Game;
import io.github.mobi_led.socialights.models.Question;


public class QuizActivity extends Activity {

    private Question question;
    private RadioGroup answersRadioGroup;
    private Button[] buttons = new Button[4];

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiznew);
        buttons = new Button[] {(Button) findViewById(R.id.button1),
                (Button) findViewById(R.id.button2),
                (Button) findViewById(R.id.button3),
                (Button) findViewById(R.id.button4)};

        Intent quizz = getIntent();
        question = (Question)quizz.getSerializableExtra("question");
        String name = quizz.getStringExtra("name");
        TextView quizQuestion = (TextView)findViewById(R.id.txtQuestion);
        TextView nameTxt = (TextView)findViewById(R.id.txtWhichTeam);
        nameTxt.setText("Hello " + name + "!");

        quizQuestion.setText(question.getQuestion());
        List<Answer> answerList = question.getAnswers();

        for (int i= 0; i < answerList.size(); i++){
           Button btn = buttons[i];
           Answer answer =  answerList.get(i);
//           String answerText = answer.getAnswerString().length() > 20 ?
//                   answer.getAnswerString().substring(0, 19) : answer.getAnswerString();
           String answerText=answer.getAnswerString();
           btn.setText(answerText);
           btn.setTag(answer);
        }
    }
    public void btnClick(View view) {
        Answer userAnswer = (Answer) view.getTag();
        String message = (userAnswer.isCorrect()) ?  "Correct answer!" : "Wrong answer" ;
        if (userAnswer.isCorrect())
        {
            findViewById(view.getId()).setBackgroundColor(Color.rgb(0, 255, 0));
        }
        else

           findViewById(view.getId()).setBackgroundColor(Color.rgb(255, 0, 0));

        switch(view.getId())
        {
            case (R.id.button1):
               findViewById(R.id.button2).setEnabled(false);
               findViewById(R.id.button3).setEnabled(false);
               findViewById(R.id.button4).setEnabled(false);
                break;

            case (R.id.button2):
                findViewById(R.id.button1).setEnabled(false);
                findViewById(R.id.button3).setEnabled(false);
                findViewById(R.id.button4).setEnabled(false);
                break;

            case (R.id.button3):
                findViewById(R.id.button1).setEnabled(false);
                findViewById(R.id.button2).setEnabled(false);
                findViewById(R.id.button4).setEnabled(false);
                break;

            case (R.id.button4):
                findViewById(R.id.button1).setEnabled(false);
                findViewById(R.id.button2).setEnabled(false);
                findViewById(R.id.button3).setEnabled(false);
                break;
        }


    }

}
