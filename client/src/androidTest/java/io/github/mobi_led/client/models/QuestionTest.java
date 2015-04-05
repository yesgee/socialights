package io.github.mobi_led.client.models;

import android.test.InstrumentationTestCase;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class QuestionTest extends InstrumentationTestCase {

    private JSONObject jsonData;

    public void setUp() {
        try {
            InputStream inputStream = getInstrumentation().getContext().getAssets().open("question.json");
            BufferedReader r = new BufferedReader(new InputStreamReader(inputStream));
            StringBuilder total = new StringBuilder();
            String line;
            while ((line = r.readLine()) != null) {
                total.append(line);
            }
            jsonData = new JSONObject(total.toString());
        } catch (IOException | JSONException e) {
            e.printStackTrace();
        }
    }

    public void testQuestion() {
        Question question = new Question();
        try {
            question.updateFromJSON(jsonData);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        assertEquals("id incorrect", "55117b6ef461f4df34290a0d", question.getId());
        assertEquals("question incorrect", "hic quis aut laborum?", question.getQuestion());
        assertEquals("answer list incorrect", "55117b6ef461f4df34290a11", question.getAnswers().get(0).getId());
        assertEquals("correctAnswer incorrect", "55117b6ef461f4df34290a0f", question.getCorrectAnswer().getId());
    }

}

