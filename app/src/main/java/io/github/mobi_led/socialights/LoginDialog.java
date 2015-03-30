package io.github.mobi_led.socialights;

import android.app.DialogFragment;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import io.github.mobi_led.socialights.models.Game;
import io.github.mobi_led.socialights.models.Question;
import io.github.mobi_led.socialights.models.Team;
import io.github.mobi_led.socialights.models.User;


public class LoginDialog extends DialogFragment {

    Game game;
    EditText nameTxt;
    Button btnBlue, btnRed;

   static LoginDialog newInstance(Game game){
       LoginDialog ld = new LoginDialog();
       Bundle args = new Bundle();
       args.putSerializable("game", game);
       ld.setArguments(args);

       return ld;
   }

    @Override
    public void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        game = (Game)getArguments().getSerializable("game");
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup viewGroup, Bundle savedInstance){

        View view = inflater.inflate(R.layout.dialog_login, viewGroup, false);

        nameTxt = (EditText)view.findViewById(R.id.txtName);
        btnBlue = (Button)view.findViewById(R.id.btnBlueTeam);
        btnRed = (Button)view.findViewById(R.id.btnRedTeam);

        btnBlue.setClickable(false);
        btnRed.setClickable(false);

        nameTxt.addTextChangedListener(new TextWatcher() {

            @Override
            public void afterTextChanged(Editable s) {

                if(s.length() > 2) {
                    setBtnActivation(true);
                    btnBlue.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            createUserAndJoinTeam(0);
                        }
                    });

                    btnRed.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            createUserAndJoinTeam(1);
                        }
                    });
                }
                else {
                    setBtnActivation(false);
                    btnBlue.setOnClickListener(null);
                    btnRed.setOnClickListener(null);
                }
            }

            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

        });

        return view;
    }

    @Override
    public void onActivityCreated(Bundle savedInstance){
        super.onActivityCreated(savedInstance);
        getDialog().getWindow().getAttributes().windowAnimations = R.style.dialog_animation;
    }

    public void createUserAndJoinTeam(int pos){

        String name = nameTxt.getText().toString();

        if(game != null && game.getTeams().get(pos) != null){

            Team team = game.getTeams().get(pos);
            User user = new User();

            if(team.containsUserByName(name)){
                showToastMessage("This name already exists in this team!");
                return;
            }

            team.addUser(user);

            Intent quizIntent = new Intent((getActivity()), QuizActivity.class);
            Question q = game.getCurrentQuestion();
            quizIntent.putExtra("question",q );
            startActivity(quizIntent);
            getDialog().dismiss();
            // send to Quizz Screen
            // send json back to server

        }
    }

    private void setBtnActivation(boolean active){
        btnBlue.setClickable(active);
        btnRed.setClickable(active);
    }

    private void showToastMessage(String message){
        Toast.makeText(getActivity().getApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }

}
