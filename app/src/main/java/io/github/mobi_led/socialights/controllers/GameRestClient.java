package io.github.mobi_led.socialights.controllers;

import com.loopj.android.http.JsonHttpResponseHandler;

import org.apache.http.Header;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import io.github.mobi_led.socialights.models.Game;
import io.github.mobi_led.socialights.models.Team;
import io.github.mobi_led.socialights.models.User;

public class GameRestClient {


    public static Game getGame(JSONObject response){


        try {

            //  JSONObject gameObj

            String date = (String) response.getString("startedAt");
            String teamString = (String) response.getString("teams");
            String userString = (String) response.getString("users");
            JSONArray teams = new JSONArray(teamString);
            JSONArray usersArr = new JSONArray(userString);

            List<Team> teamsObj = new ArrayList<Team>();

            List<User> users = new ArrayList<User>();

            getTeams(teams, teamsObj, users);
            getUser(usersArr, users);

            return new Game(teamsObj, users, new Date());

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return null;
    }

    private static void getUser(JSONArray usersArr, List<User> users) throws JSONException {
        for (int i = 0; i < usersArr.length(); i++) {
            JSONObject userObj = usersArr.getJSONObject(i);
            String name = userObj.getString("name");
            users.add(new User(name));
        }
    }

    private static void getTeams(JSONArray teams, List<Team> teamsObj, List<User> users) throws JSONException {

        for (int i = 0; i < teams.length(); i++) {
            JSONObject teamObj = teams.getJSONObject(i);

            String name = teamObj.getString("name");
            String color = teamObj.getString("color");
            teamsObj.add(new Team(name, color, users));
        }
    }

}