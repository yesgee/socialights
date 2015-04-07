package io.github.mobi_led.socialights;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.io.IOException;

import io.github.mobi_led.client.Client;

import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.User;
import io.github.mobi_led.client.models.Team;
import rx.functions.Action1;

public class LoginActivity extends Activity {

    EditText nickName;
    Intent gameIntent;
    Game mGame;
    User mUser;
    Button [] buttons;
    Client client;
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.dialog_login);
        client = Client.getInstance();

        nickName = (EditText)findViewById(R.id.txtName);
        gameIntent = getIntent();

        buttons = new Button [] {(Button)findViewById(R.id.btnRedTeam), (Button)findViewById(R.id.btnBlueTeam)};

        client = Client.getInstance();
        client.startGame("55117b6ef461f4df34290a26").subscribe(new Action1<Game>() {
            @Override
            public void call(Game game) {
                Log.i("LoginActivity", "Started Game.");

                mGame = game;
                if(game != null){
                    Toast.makeText(getApplicationContext(),"Game start Success!", Toast.LENGTH_LONG).show();
                }

                for (int i = 0; i < game.getTeams().size(); i++) {
                    buttons[i].setText(game.getTeams().get(i).getName());
                    buttons[i].setTag(game.getTeams().get(i));
                }
            }
        });

    }

    public void btn_Click(View view){

        final String name = nickName.getText().toString().trim();
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
        addUser(name);
        addUserToTeam(idx);
    }

    private void showToastMessage(String message){
        Toast.makeText(getApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }

    private void addUser(String name){

        Log.i("LoginActivity", "Creating new User " + name);

        client.createUser(name).subscribe(new Action1<User>() {
            @Override
            public void call(User user) {
                Log.i("LoginActivity", "onCreate() - User created: " + user.getId());
                mUser = user;
            }
        });
    }

    private void addUserToTeam(int teamIdx){

        client.addUserToTeam(mGame.getId(), mUser.getId(), teamIdx).subscribe(new Action1<Game>() {

            @Override
            public void call(Game game) {
                mGame = game;
            }
        });
    }


}
