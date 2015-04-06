package io.github.mobi_led.socialights;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.apache.http.Header;
import org.json.JSONException;
import org.json.JSONObject;

import io.github.mobi_led.socialights.controllers.GameRestClient;
import io.github.mobi_led.socialights.controllers.RestApi;
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

        buttons = new Button [] {(Button)findViewById(R.id.btnRedTeam), (Button)findViewById(R.id.btnBlueTeam)};

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


        // post to user
        // POST DELETE /api/games/:game/teams/users/:user

        Intent quizIntent = new Intent(this, QuizActivity.class);
        Question q = game.getCurrentQuestion();
        quizIntent.putExtra("game", game);
        quizIntent.putExtra("question", q);
        quizIntent.putExtra("name", name);
        quizIntent.putExtra("team",team.getName());
        startActivity(quizIntent);
    }

    private void showToastMessage(String message){
        Toast.makeText(getApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }

   private void postUser(User user){
       RequestParams params = new RequestParams();
       params.put("name", user.getName());

       RestApi.post("users", params, new JsonHttpResponseHandler(){

           @Override
           public void onSuccess(int statusCode, Header[] headers, JSONObject response) {

               if (statusCode == 200) {

                   try {
                        // Get User id from server
                       JSONObject userJ = response.getJSONObject("user");

                   } catch (JSONException e) {
                       e.printStackTrace();
                   }


               }
           }

       });
   }
}
