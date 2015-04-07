package io.github.mobi_led.socialights;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import io.github.mobi_led.client.models.Team;

public class TeamFragment extends Fragment {

    private Team team;

    private OnFragmentInteractionListener mListener;

    public static TeamFragment newInstance(Team team) {
        TeamFragment fragment = new TeamFragment();
        Bundle args = new Bundle();
        args.putSerializable("team", team);
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
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_team, container, false);

        Button button = (Button) view.findViewById(R.id.joinTeam);
        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                mListener.onJoinTeam(team);
            }
        });

        return view;
    }

    public void joinTeam(View view) {
        if (mListener != null) {
            mListener.onJoinTeam(this.team);
        }
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
