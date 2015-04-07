package io.github.mobi_led.socialights;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.Toast;

import io.github.mobi_led.client.Client;

import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.User;
import io.github.mobi_led.client.models.Team;
import rx.functions.Action1;

public class LoginActivity extends Activity {


    Intent gameIntent;
    Game mGame;
    Button button;
    Client client;
    ListView mListView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.dialog_login);
        client = Client.getInstance();

        mListView = (ListView)findViewById(R.id.userlistView);
       // mAdapter
        gameIntent = getIntent();
        button = (Button)findViewById(R.id.btnBlueTeam);

        client = Client.getInstance();

        final String [] names = new String[]{};

        client.startGame("55117b6ef461f4df34290a26").subscribe(new Action1<Game>() {
            @Override
            public void call(Game game) {
                Log.i("LoginActivity", "Started Game.");

                mGame = game;
                if(game != null){

                  for(int i=0; i < game.getUsers().size(); i++){
                     names[i] = game.getUsers().get(i).getName();
                  }

                 ArrayAdapter<String> adapter = new ArrayAdapter<String>(LoginActivity.this, android.R.layout.simple_list_item_1, android.R.id.text1, names);
                 mListView.setAdapter(adapter);

                }

            }
        });

    }

    public void btn_Click(View view){

        final String name =  "" ; //nickName.getText().toString().trim();
        Team team = (Team) view.getTag();

        Log.i("LoginActivity", "Clicked button for team " + team.getName());

        if(name.isEmpty() || name == null) {
            showToastMessage("Please enter your name");
            return;
        }

        for(int i=0; i < team.getUsers().size(); i++){
            if(team.getUsers().get(i).getName().equals(name)) {
                showToastMessage("This name already exists in this team!");
                return;
            }
        }

        int idx = mGame.getTeams().indexOf(team);
        addUser(name, idx);
    }

    private void showToastMessage(String message){
        Toast.makeText(getApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }

    private void addUser(String name, final int teamIdx){

        Log.i("LoginActivity", "Creating new User " + name);

        client.createUser(name).subscribe(new Action1<User>() {
            @Override
            public void call(User user) {
                Log.i("LoginActivity", "onCreate() - User created: " + user.getId());
                addUserToTeam(teamIdx, user.getId());
            }
        });
    }

    private void addUserToTeam(int teamIdx, String userId){

        Log.i("LoginActivity", "Adding User to team " + teamIdx);

        client.addUserToTeam(mGame.getId(), userId, teamIdx).subscribe(new Action1<Game>() {

            @Override
            public void call(Game game) {
                Log.i("LoginActivity", "onAddUserToTeam() - User created: " + game.getId());
                mGame = game;
            }
        });
    }


}
