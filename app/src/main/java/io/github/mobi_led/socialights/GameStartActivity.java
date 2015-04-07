package io.github.mobi_led.socialights;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.Toast;

import com.loopj.android.http.JsonHttpResponseHandler;
import org.apache.http.Header;
import org.json.JSONException;
import org.json.JSONObject;

import io.github.mobi_led.client.Client;
import io.github.mobi_led.client.models.Game;
import rx.Observable;

public class GameStartActivity extends Activity {

    private ImageButton startPlay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        startPlay = (ImageButton)findViewById(R.id.imageButton);
       // startPlay.setClickable(false);
            //getGameObject();

    }

    public void startPlayingGame(View view){

        Intent intent = new Intent(this, LoginActivity.class);

       // intent.putExtra("game", game);
        startActivity(intent);
    }

/**
    public void getGameObject() throws JSONException {

        RestApi.get("games/55117b6ef461f4df34290a26", null, new JsonHttpResponseHandler() {

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {

                if (statusCode == 200) {

                    game = GameRestClient.getGame(response);

                    if(game != null){
                        startPlay.setClickable(true);
                        Toast.makeText(getApplicationContext(),"Connection Success!", Toast.LENGTH_LONG).show();
                    }
                }
            }

        });
    }
*/
}
