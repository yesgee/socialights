package io.github.mobi_led.socialights;

import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import io.github.mobi_led.client.Client;
import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.Team;
import io.github.mobi_led.client.models.User;
import rx.Observable;
import rx.Subscription;
import rx.functions.Action1;


public class LobbyActivity extends ActionBarActivity implements TeamFragment.OnFragmentInteractionListener {

    private Client client;
    private User currentUser;
    private Game currentGame;
    private TeamFragment team1;
    private TeamFragment team2;

    private Button startGameButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lobby);

        startGameButton = (Button) findViewById(R.id.startGameButton);

        currentUser = (User) getIntent().getExtras().get("user");
        currentGame = (Game) getIntent().getExtras().get("game");
        client = Client.getInstance();

    }

    private Subscription gameSubscription;

    @Override
    protected void onResume() {
        super.onResume();
        gameSubscription = client.watch(currentGame).subscribe(new Action1<Game>() {
            @Override
            public void call(Game game) {
                onGameUpdate();
            }
        });
        onGameUpdate();
    }

    @Override
    protected void onPause() {
        super.onPause();
        gameSubscription.unsubscribe();
    }

    protected void onGameUpdate() {
        currentUser.setTeam(null);
        for (Team team : currentGame.getTeams()) {
            for (User user : team.getUsers()) {
                if (user.getId().equals(currentUser.getId())) {
                    currentUser.setTeam(team);
                }
            }
        }

        team1 = TeamFragment.newInstance(currentGame.getTeams().get(0), currentUser);
        team2 = TeamFragment.newInstance(currentGame.getTeams().get(1), currentUser);

        startGameButton.setEnabled(
                currentGame.getTeams().get(0).getUsers().size() > 0 &&
                        currentGame.getTeams().get(1).getUsers().size() > 0 &&
                        currentUser.getTeam() != null
        );

        FragmentManager fragmentManager = getFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

        fragmentTransaction.replace(R.id.team1, team1);
        fragmentTransaction.replace(R.id.team2, team2);
        fragmentTransaction.commit();
    }

    private Observable<Game> doJoin(Team team) {
        int teamIndex = currentGame.getTeams().indexOf(team);
        if (currentUser.getTeam() == null) {
            return client.addUserToTeam(currentGame.getId(), currentUser.getId(), teamIndex);
        } else if (currentUser.getTeam().equals(team)) {
            return client.removeUserFromTeam(currentGame.getId(), currentUser.getId());
        } else {
            // TODO: This is only for 2 teams!!
            return client.switchUserBetweenTeams(currentGame.getId(), currentUser.getId());
        }
    }

    @Override
    public void onJoinTeam(Team team) {
        if (team != null) {
            doJoin(team).subscribe(new Action1<Game>() {
                @Override
                public void call(Game game) {

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

    public void startGame(View view) {
        if (currentGame.getTeams().get(0).getUsers().size() > 0 &&
                currentGame.getTeams().get(1).getUsers().size() > 0 &&
                currentUser.getTeam() != null) {
            int teamIndex = currentGame.getTeams().indexOf(currentUser.getTeam());

            Intent intent = new Intent(getBaseContext(), QuizActivity.class);
            intent.putExtra("user", currentUser);
            intent.putExtra("game", currentGame);
            intent.putExtra("teamIndex", teamIndex);
            startActivity(intent);
        }

    }
}
