package io.github.mobi_led.socialights;

import android.app.Fragment;
import android.app.ListFragment;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import io.github.mobi_led.client.Client;
import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.User;
import rx.functions.Action1;


public class NewGameFragment extends Fragment {

    private User currentUser;
    private Client client;
    private EditText editText;

    static NewGameFragment newInstance(User user){
        NewGameFragment ld = new NewGameFragment();
        Bundle args = new Bundle();

        args.putSerializable("user", user);
        ld.setArguments(args);
        return ld;
    }

    public void onActivityCreated(Bundle savedInstanceState) {

        super.onActivityCreated(savedInstanceState);
        currentUser = (User)getArguments().getSerializable("user");
    }

    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_new_game, container, false);
        Button b = (Button) view.findViewById(R.id.btnStart);
        editText = (EditText)view.findViewById(R.id.txtNumberOfQuestions);

        b.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                String numStr = editText.getText().toString();
                int num = Integer.parseInt(numStr);
                createAndJoinNewGame(num);
            }
        });

        client = Client.getInstance();
        return view;
    }

    public void createAndJoinNewGame(int nrOfQuestions) {


        client.createGame(currentUser.getId(), nrOfQuestions).subscribe(new Action1<Game>() {

            @Override
            public void call(Game game) {
                // Move to next screen
                client.startGame(game.getId()).subscribe(new Action1<Game>() {
                    @Override
                    public void call(Game game) {
                        Intent intent = new Intent(getActivity(), LobbyActivity.class);
                        intent.putExtra("user", currentUser);
                        intent.putExtra("game", game);
                        startActivity(intent);
                    }
                }, new Action1<Throwable>() {
                    @Override
                    public void call(Throwable throwable) {
                        Toast.makeText(getActivity().getApplicationContext(), "Could not start game.", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        }, new Action1<Throwable>() {

            @Override
            public void call(Throwable throwable) {
                Log.e("SelectGameActivity", "createAndJoinNewGame() - Could not create Game: " + throwable.getMessage());
                Toast.makeText(getActivity().getApplicationContext(), "Could not create game.", Toast.LENGTH_SHORT).show();
            }
        });


    }

}

