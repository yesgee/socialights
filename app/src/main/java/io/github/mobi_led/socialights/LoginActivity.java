package io.github.mobi_led.socialights;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.util.List;

import io.github.mobi_led.socialights.models.Game;
import io.github.mobi_led.socialights.models.Question;
import io.github.mobi_led.socialights.models.Team;
import io.github.mobi_led.socialights.models.User;


public class LoginActivity extends ActionBarActivity {

    EditText nickName;
    Intent gameIntent;
    Game game;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.dialog_login);

        nickName = (EditText)findViewById(R.id.txtName);
        gameIntent = getIntent();
        game = (Game)gameIntent.getSerializableExtra("game");

        Button teamA_btn = (Button)findViewById(R.id.btnBlueTeam);
        Button teamB_btn = (Button)findViewById(R.id.btnRedTeam);

       if(game != null && game.getTeams().size() > 1){
           teamA_btn.setText("Join " + game.getTeams().get(0).getName());
           teamB_btn.setText("Join " + game.getTeams().get(1).getName());
       }

    }

    public void teamA_BtnClick(View view){
      createUserAndJoinTeam(0);
    }

    public void teamB_BtnClick(View view){
        createUserAndJoinTeam(1);
    }

    private boolean validNickName(String name){

        if(name.isEmpty() || name == null) {
            showToastMessage("Please enter your name");
            return false;
        }

        return true;
    }

    public void createUserAndJoinTeam(int pos){

        String name = nickName.getText().toString();

        if(!validNickName(name)) return;

        if(game != null && game.getTeams().get(pos) != null){

            Team team = game.getTeams().get(pos);
            User user = new User();

            if(team.containsUserByName(name)){
                showToastMessage("This name already exists in this team!");
                return;
            }

            team.addUser(user);

            Intent quizIntent = new Intent(this, QuizActivity.class);
            Question q = game.getCurrentQuestion();
            quizIntent.putExtra("question",q );
            quizIntent.putExtra("name", name);
            startActivity(quizIntent);
            // send to Quizz Screen
            // send json back to server

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
