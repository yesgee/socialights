package io.github.mobi_led.socialights;

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
 TextView errorMsg;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_game_start);
        errorMsg = (TextView)findViewById(R.id.show_error);

    }

    public void testClick(View view){
        try {
            getGameObject();

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }


    public void getGameObject() throws JSONException {

        RestApi.get("socialights", null, new JsonHttpResponseHandler() {

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {

                if (statusCode == 200) {

                    Game game;
                    game = GameRestClient.getGame(response);

                    if(game != null){
                        Toast.makeText(getApplicationContext(),"Yeps", Toast.LENGTH_LONG).show();
                    }
                }
            }

        });
    }

}
