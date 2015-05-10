package io.github.mobi_led.client.models;

import android.test.InstrumentationTestCase;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class TeamTest extends InstrumentationTestCase {

    private JSONObject jsonData;

    public void setUp() {
        try {
            InputStream inputStream = getInstrumentation().getContext().getAssets().open("team.json");
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

    public void testTeam() {
        Team team = new Team();
        try {
            team.updateFromJSON(jsonData);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        assertEquals("id incorrect", "55117b6ef461f4df34290a27", team.getId());
        assertEquals("name incorrect", "Red Team", team.getName());
        assertEquals("color incorrect", "#ff0000", team.getColor());
        assertEquals("users incorrect", "55117b6ef461f4df34290a08", team.getUsers().get(0).getId());
        assertEquals("score incorrect", 0, (int) team.getScore());
    }

}

