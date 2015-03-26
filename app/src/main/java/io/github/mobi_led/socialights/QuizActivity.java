package io.github.mobi_led.socialights;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

import io.github.mobi_led.socialights.models.Answer;
import io.github.mobi_led.socialights.models.Game;
import io.github.mobi_led.socialights.models.Question;


public class QuizActivity extends Activity {

    private Question question;
    private RadioGroup answersRadioGroup;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiznew);
        Intent quizz = getIntent();
        question = (Question)quizz.getSerializableExtra("question");
        String name = quizz.getStringExtra("name");

        TextView quizQuestion = (TextView)findViewById(R.id.txtQuestion);
        TextView nameTxt = (TextView)findViewById(R.id.txtWhichTeam);
        nameTxt.setText("Hello " + name + "!");

        quizQuestion.setText(question.getQuestion());
        answersRadioGroup = (RadioGroup)findViewById(R.id.radioGroup1);
        List<Answer> answerList = question.getAnswers();

        for (int i= 0; i < answersRadioGroup.getChildCount(); i++){

           RadioButton btn = (RadioButton)answersRadioGroup.getChildAt(i);
           Answer answer =  answerList.get(i);
           btn.setText(answer.getAnswerString());
           btn.setTag(answer);
        }
    }

    public void nextBtnClick(View view ){

      int checked = answersRadioGroup.getCheckedRadioButtonId();
      View radioButton = answersRadioGroup.findViewById(checked);
      int idx = answersRadioGroup.indexOfChild(radioButton);
      RadioButton btn = (RadioButton)answersRadioGroup.getChildAt(idx);

      Answer userAnswer = (Answer)btn.getTag();
      String message = (userAnswer.isCorrect()) ?  "Correct answer!" : "Wrong answer" ;

      Toast.makeText(getApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }

}
