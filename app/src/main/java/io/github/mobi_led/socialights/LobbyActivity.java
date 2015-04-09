package io.github.mobi_led.socialights;

import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import io.github.mobi_led.client.Client;
import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.Team;
import io.github.mobi_led.client.models.User;
import rx.functions.Action1;


public class LobbyActivity extends ActionBarActivity implements TeamFragment.OnFragmentInteractionListener {

    private Client client;
    private User currentUser;
    private Game currentGame;
    private TeamFragment team1;
    private TeamFragment team2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lobby);

        currentUser = (User) getIntent().getExtras().get("user");
        currentGame = (Game) getIntent().getExtras().get("game");
        client = Client.getInstance();

        team1 = TeamFragment.newInstance(currentGame.getTeams().get(0));
        team2 = TeamFragment.newInstance(currentGame.getTeams().get(1));

        FragmentManager fragmentManager = getFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

        fragmentTransaction.replace(R.id.team1, team1);
        fragmentTransaction.replace(R.id.team2, team2);
        fragmentTransaction.commit();
    }

    @Override
    public void onJoinTeam(Team team) {
        if (team != null) {

           final int teamIndex = this.currentGame.getTeams().indexOf(team);

            client.addUserToTeam(currentGame.getId(), currentUser.getId(), teamIndex).subscribe(new Action1<Game>() {
                @Override
                public void call(Game game) {
                    Log.i("LobbyActivity", "onJoinTeam() - User joined team.");

                    Intent intent = new Intent(getBaseContext(), QuizActivity.class);
                    intent.putExtra("user", currentUser);
                    intent.putExtra("game", game);
                    intent.putExtra("teamIndex", teamIndex);
                    startActivity(intent);
                }
            }, new Action1<Throwable>() {
                @Override
                public void call(Throwable throwable) {
                    Log.e("LobbyActivity", "addUserToTeam() - Could not add user to Team: " + throwable.getMessage());
                    Toast.makeText(getApplicationContext(), "Could not add user to Team.", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }
}
