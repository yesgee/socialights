package io.github.mobi_led.socialights;

import android.app.Activity;
import android.app.ListFragment;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.TextView;

import java.util.ArrayList;

import io.github.mobi_led.client.Client;
import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.Team;
import io.github.mobi_led.client.models.User;
import rx.functions.Action1;

public class TeamFragment extends ListFragment {

    private Team team;
    private OnFragmentInteractionListener mListener;
    TextView teamName;
    private Client client;
    private Game currentGame;
    private User currentUser;

    public static TeamFragment newInstance(Team team, User currentUser) {
        TeamFragment fragment = new TeamFragment();
        Bundle args = new Bundle();
        args.putSerializable("team", team);
        args.putSerializable("user", currentUser);

        fragment.setArguments(args);
        return fragment;
    }

    public TeamFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            team = (Team) getArguments().getSerializable("team");
            currentUser = (User) getArguments().getSerializable("user");
        }

        final ArrayList<String> names = new ArrayList<String> ();

        for(int i=0; i < team.getUsers().size(); i++){
            names.add(team.getUsers().get(i).getName());
        }

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(getActivity(),
                android.R.layout.simple_list_item_1, android.R.id.text1, names);

        setListAdapter(adapter);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_team, container, false);

        Button button = (Button) view.findViewById(R.id.joinTeam);
        teamName = (TextView)view.findViewById(R.id.teamName);
        teamName.setText(team.getName());

        if (team.equals(currentUser.getTeam())) {
            button.setText("Leave");
        }

        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                mListener.onJoinTeam(team);
                //joinTeam(team);
            }
        });

        client = Client.getInstance();
        return view;
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        try {
            mListener = (OnFragmentInteractionListener) activity;
        } catch (ClassCastException e) {
            throw new ClassCastException(activity.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    public interface OnFragmentInteractionListener {
        public void onJoinTeam(Team team);
    }

}
