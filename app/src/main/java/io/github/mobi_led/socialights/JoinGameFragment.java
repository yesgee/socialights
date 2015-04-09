package io.github.mobi_led.socialights;

import android.app.Fragment;
import android.app.ListFragment;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import io.github.mobi_led.client.Client;
import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.User;
import rx.functions.Action1;

public class JoinGameFragment extends ListFragment {

    Game game;
    User currentUser;
    Client client;

    static JoinGameFragment newInstance(Game game, User user){
        JoinGameFragment ld = new JoinGameFragment();
        Bundle args = new Bundle();
        args.putSerializable("game", game);
        args.putSerializable("user", user);

        ld.setArguments(args);

        return ld;
    }

     public void onActivityCreated(Bundle savedInstanceState) {

        super.onActivityCreated(savedInstanceState);
        game = (Game)getArguments().getSerializable("game");
        currentUser = (User)getArguments().getSerializable("user");

         final ArrayList<String> names = new ArrayList<String> ();

        // We could remove this if the games list returns games with users
         client.listUsers().subscribe(new Action1<List<User>>(){

             @Override
             public void call(List<User> users) {
                 for(int i=0; i < users.size(); i++){
                     names.add(users.get(i).getName());
                 }

                 ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(),
                         android.R.layout.simple_list_item_1, android.R.id.text1, names);
                 setListAdapter(adapter);
             }
         }, new Action1<Throwable>() {

             @Override
             public void call(Throwable throwable) {
                 Log.e("JoinGameFragment", "listUsers() - Could not list Users: " + throwable.getMessage());
                 Toast.makeText(getActivity().getApplicationContext(), "Could list users.", Toast.LENGTH_SHORT).show();
             }
         });

    }

    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_join_game, container, false);
        Button b = (Button) view.findViewById(R.id.btnJoinGame);
        b.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                joinGame(game);
            }
        });

        client = Client.getInstance();
        return view;
    }

    public void joinGame(Game game) {

        client.addUserToGame(game.getId(), currentUser.getId()).subscribe(new Action1<Game>() {
            @Override
            public void call(Game game) {
                // Move to next screen
                Intent intent = new Intent(getActivity(), LobbyActivity.class);
                intent.putExtra("user", currentUser);
                intent.putExtra("game", game);
                startActivity(intent);
            }
        }, new Action1<Throwable>() {

            @Override
            public void call(Throwable throwable) {
                Log.e("JoinGameFragment", "addUserToGame() - Could not add user to Game: " + throwable.getMessage());
                Toast.makeText(getActivity().getApplicationContext(), "Could not add user to Game.", Toast.LENGTH_SHORT).show();
            }
        });
    }

}
