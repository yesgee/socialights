package io.github.mobi_led.socialights;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.Team;
import io.github.mobi_led.client.models.User;


public class GameFinishedActivity extends ActionBarActivity {

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


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_game_finished, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void newGame(View view) {
        Intent intent = new Intent(this, SelectGameActivity.class);
        intent.putExtra("user", currentUser);
        startActivity(intent);
    }
}
