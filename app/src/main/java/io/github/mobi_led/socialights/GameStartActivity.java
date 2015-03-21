package io.github.mobi_led.socialights;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.loopj.android.http.JsonHttpResponseHandler;
import org.apache.http.Header;
import org.json.JSONException;
import org.json.JSONObject;

import io.github.mobi_led.socialights.controllers.GameRestClient;
import io.github.mobi_led.socialights.controllers.RestApi;
import io.github.mobi_led.socialights.models.Game;

public class GameStartActivity extends ActionBarActivity {

    private Game game;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void startPlayingGame(View view){

        try {
            getGameObject();

            Intent intent = new Intent(this, LoginActivity.class);
            intent.putExtra("game", game);
            startActivity(intent);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }


    public void getGameObject() throws JSONException {

        RestApi.get("socialights", null, new JsonHttpResponseHandler() {

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {

                if (statusCode == 200) {

                    game = GameRestClient.getGame(response);

                    if(game != null){
                        Toast.makeText(getApplicationContext(),"Connection Success!", Toast.LENGTH_LONG).show();
                    }
                }
            }

        });
    }

}
