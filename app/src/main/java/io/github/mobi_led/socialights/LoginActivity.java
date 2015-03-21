package io.github.mobi_led.socialights;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import java.util.List;

import io.github.mobi_led.socialights.models.Game;
import io.github.mobi_led.socialights.models.Team;
import io.github.mobi_led.socialights.models.User;


public class LoginActivity extends ActionBarActivity {

    EditText nickName;
    Intent gameIntent;
    Game game;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        nickName = (EditText)findViewById(R.id.id_nickname);
        gameIntent = getIntent();
        game = (Game)gameIntent.getSerializableExtra("game");
    }

    public void teamABtnClick(View view){
      createUserAndJoinTeam("A");
    }

    public void teamBBtnClick(View view){
        createUserAndJoinTeam("B");
    }

    private boolean validNickName(String name){

        if(name.isEmpty() || name == null) {
            showToastMessage("Please enter your name");
            return false;
        }

        return true;
    }

    public void createUserAndJoinTeam(String teamName){

        String name = nickName.getText().toString();

        if(!validNickName(name)) return;

        if(game != null){

            for(Team team : game.getTeams() ) {

                if(team != null && team.getName().equals(teamName)){

                    User user = new User();

                    if(team.containsUserByName(name)){
                        showToastMessage("This name already exists in this team!");
                        return;
                    }

                    team.addUser(user);
                    // send to Quizz Screen
                    // send json back to server
                }
            }
        }
    }

    private void showToastMessage(String message){

        Toast.makeText(getApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }

    public void sendMessage_lobby(View view) {

        Intent intent = new Intent(this, LobbyActivity.class);
        EditText avatar = (EditText) findViewById(R.id.id_nickname);
        intent.putExtra("avatar", avatar.getText().toString());
        startActivity(intent);
    }
}
