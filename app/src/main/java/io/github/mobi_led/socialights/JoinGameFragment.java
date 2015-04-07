package io.github.mobi_led.socialights;

import android.app.Fragment;
import android.app.ListFragment;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;

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

         String[] names = new String[] { };

         for(int i=0; i < game.getUsers().size(); i++){
             names[i] = game.getUsers().get(i).getName();
         }

         ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(),
                 android.R.layout.simple_list_item_1, names);
         setListAdapter(adapter);
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

        return view;
    }

    public void joinGame(Game game) {

        client = Client.getInstance();

        client.addUserToGame(game.getId(), currentUser.getId()).subscribe(new Action1<Game>() {
            @Override
            public void call(Game game) {
                // Move to next screen
                Intent intent = new Intent(getActivity(), LobbyActivity.class);
                intent.putExtra("user", currentUser);
                intent.putExtra("game", game);
                startActivity(intent);
            }
        });
    }

}
