package io.github.mobi_led.socialights;

import android.app.Activity;
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


public class LoginActivity extends Activity {

    EditText nickName;
    Intent gameIntent;
    Game game;
    Button [] buttons;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.dialog_login);

        nickName = (EditText)findViewById(R.id.txtName);
        gameIntent = getIntent();
        game = (Game)gameIntent.getSerializableExtra("game");

        buttons = new Button [] {(Button)findViewById(R.id.btnBlueTeam), (Button)findViewById(R.id.btnRedTeam)};

        for (int i = 0; i < game.getTeams().size(); i++) {
            buttons[i].setText(game.getTeams().get(i).getName());
            buttons[i].setTag(game.getTeams().get(i));
        }
    }

    public void btn_Click(View view){

        String name = nickName.getText().toString();

        if(name.isEmpty() || name == null) {
            showToastMessage("Please enter your name");
            return;
        }

        Team team = (Team) view.getTag();
        User user = new User(name);

        if(team.containsUserByName(name)){
            showToastMessage("This name already exists in this team!");
            return;
        }

        team.addUser(user);

        Intent quizIntent = new Intent(this, QuizActivity.class);
        Question q = game.getCurrentQuestion();
        quizIntent.putExtra("game", game);
        quizIntent.putExtra("question", q);
        quizIntent.putExtra("name", name);
        startActivity(quizIntent);
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
