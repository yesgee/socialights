package io.github.mobi_led.socialights;

import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.app.ProgressDialog;
import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import io.github.mobi_led.client.Client;
import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.User;
import rx.functions.Action1;


public class SelectGameActivity extends ActionBarActivity {

    private Client client;
    private User currentUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_select_game);

        currentUser = (User) getIntent().getExtras().get("user");

        client = Client.getInstance();

        final ProgressDialog loadGamesProgress = new ProgressDialog(this);
        loadGamesProgress.setTitle("Loading");
        loadGamesProgress.setMessage("Wait while loading...");
        loadGamesProgress.show();

        client.listGames().subscribe(new Action1<List<Game>>() {

            @Override
            public void call(List<Game> games) {
                FragmentManager fragmentManager = getFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

                if (games.size() == 0 || games.get(games.size() - 1).getFinished()) {

                     NewGameFragment fragment = NewGameFragment.newInstance(currentUser);
                     fragmentTransaction.add(fragment, "NewGameFragment");
                     fragmentTransaction.replace(R.id.frame, fragment);

                } else {

                    JoinGameFragment fragment = JoinGameFragment.newInstance(games.get(games.size() - 1), currentUser);
                    fragmentTransaction.add(fragment, "JoinGameFragment");
                    fragmentTransaction.replace(R.id.frame, fragment);
                }
                fragmentTransaction.commit();
                loadGamesProgress.dismiss();
             }
           }, new Action1<Throwable>() {

            @Override
            public void call(Throwable throwable) {
                Log.e("SelectGameActivity", "onCreate() - Could not list Games: " + throwable.getMessage());
                Toast.makeText(getApplicationContext(), "Could not list Games.", Toast.LENGTH_SHORT).show();
            }
        });

    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        // getMenuInflater().inflate(R.menu.menu_select_game, menu);
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
}
