package io.github.mobi_led.socialights;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.Team;
import io.github.mobi_led.client.models.User;


public class GameFinishedActivity extends Activity {

    private User currentUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game_finished);

        currentUser = (User) getIntent().getExtras().get("user");
        Game game = (Game)getIntent().getExtras().get("game");
        TextView scoreViews [] = new TextView[]{(TextView)findViewById(R.id.teamRedScore) ,
                                                (TextView)findViewById(R.id.teamBlueScore)};

        for (int i = 0; i < game.getTeams().size(); i++) {
            Team team = game.getTeams().get(i);
            scoreViews[i].setText(team.getName() + " : " + team.getScore());
        }
    }

    public void newGame(View view) {
        Intent intent = new Intent(this, SelectGameActivity.class);
        intent.putExtra("user", currentUser);
        startActivity(intent);
    }
}
