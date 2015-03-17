package io.github.mobi_led.socialights.controller;
import android.test.InstrumentationTestCase;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.JsonHttpResponseHandler;

import org.apache.http.Header;
import org.json.JSONObject;

import io.github.mobi_led.socialights.controllers.GameRestClient;
import io.github.mobi_led.socialights.controllers.RestApi;


public class GameRestClientUsageTest extends InstrumentationTestCase {


    public GameRestClientUsageTest(){


    }

    @Override
    public void setUp(){

    }

    public void tearDown() throws Exception{
        super.tearDown();
    }

    public void testAsyncHttpClient() throws Throwable {

        final StringBuilder strBuilder = new StringBuilder();

        runTestOnUiThread(new Runnable() {
            @Override
            public void run() {
                RestApi.get("socialights", null, new JsonHttpResponseHandler() {

                    @Override
                    public void onSuccess(int statusCode, Header[] headers, JSONObject response) {

                        if (statusCode == 200) {
                           strBuilder.append(response.toString());
                        }
                    }

                });
            }
        });



    }

}

