package io.github.mobi_led.client.models;

import android.test.InstrumentationTestCase;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class BaseTest extends InstrumentationTestCase {

    private JSONObject jsonData;

    public void setUp() {
        try {
            InputStream inputStream = getInstrumentation().getContext().getAssets().open("base.json");
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

    public void testBase() {
        Base base = new Base();
        try {
            base.updateFromJSON(jsonData);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        assertEquals("id incorrect", "55117b6ef461f4df34290a0a", base.getId());
        assertEquals("createdAt incorrect", 1427209070519l, base.getCreatedAt().getTime());
        assertEquals("updatedAt incorrect", 1427360575309l, base.getUpdatedAt().getTime());
    }

}

