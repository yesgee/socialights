package io.github.mobi_led.client.models;

import android.test.InstrumentationTestCase;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class AskedQuestionTest extends InstrumentationTestCase {

    private JSONObject jsonData;

    public void setUp() {
        try {
            InputStream inputStream = getInstrumentation().getContext().getAssets().open("askedQuestion.json");
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

    public void testAskedQuestion() {
        AskedQuestion askedQuestion = new AskedQuestion();
        try {
            askedQuestion.updateFromJSON(jsonData);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        assertEquals("id incorrect", "55117ba3da38720b351c8a79", askedQuestion.getId());
        assertFalse("answeredCorrectly incorrect", askedQuestion.getAnsweredCorrectly());
        assertEquals("answeredAt incorrect", 1427209443969l, askedQuestion.getAnsweredAt().getTime());
        assertEquals("answeredBy incorrect", "55117b6ef461f4df34290a08", askedQuestion.getAnsweredBy().getId());
        assertEquals("answer incorrect", "55117b6ef461f4df34290a22", askedQuestion.getAnswer().getId());
        assertEquals("question incorrect", "55117b6ef461f4df34290a0d", askedQuestion.getQuestion().getId());
        assertEquals("team incorrect", 0, (int) askedQuestion.getTeam());
        assertEquals("askedAt incorrect", 1427209123143l, askedQuestion.getAskedAt().getTime());
        assertEquals("deadlineAt incorrect", 1427209133143l, askedQuestion.getDeadlineAt().getTime());
    }

}

