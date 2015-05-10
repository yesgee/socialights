package io.github.mobi_led.client.models;

import android.test.InstrumentationTestCase;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class GameTest extends InstrumentationTestCase {

    private JSONObject jsonData;

    public void setUp() {
        try {
            InputStream inputStream = getInstrumentation().getContext().getAssets().open("game.json");
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

    public void testGame() {
        Game game = new Game();
        try {
            game.updateFromJSON(jsonData);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        assertEquals("id incorrect", "55117b6ef461f4df34290a26", game.getId());
        assertEquals("startedAt incorrect", 1427209070504l, game.getStartedAt().getTime());
        assertEquals("users incorrect", "55117b6ef461f4df34290a08", game.getUsers().get(0).getId());
        assertEquals("teams incorrect", "55117b6ef461f4df34290a27", game.getTeams().get(0).getId());
        assertEquals("previousQuestions incorrect", "55117ba3da38720b351c8a79", game.getPreviousQuestions().get(0).getId());
        assertEquals("nextQuestions incorrect", "55117b6ef461f4df34290a17", game.getNextQuestions().get(0).getId());
        assertFalse("finished incorrect", game.getFinished());
        assertEquals("question incorrect", "55117d1cda38720b351c8a7a", game.getQuestion().getId());
    }

}

