package io.github.mobi_led.client.models;

import android.test.InstrumentationTestCase;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class UserTest extends InstrumentationTestCase {

    private JSONObject jsonData;

    public void setUp() {
        try {
            InputStream inputStream = getInstrumentation().getContext().getAssets().open("user.json");
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

    public void testUser() {
        User user = new User();
        try {
            user.updateFromJSON(jsonData);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        assertEquals("id incorrect", "55117b6ef461f4df34290a0a", user.getId());
        assertEquals("name incorrect", "Triston Windler", user.getName());
    }

}

