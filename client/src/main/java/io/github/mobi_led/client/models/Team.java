package io.github.mobi_led.client.models;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class Team extends Base {
    private String name;
    private String color;
    private List<User> users = new ArrayList();
    private Integer score;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return this.color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<User> getUsers() {
        return this.users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public Integer getScore() {
        return this.score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public JSONObject toJSON() throws JSONException {
        JSONArray userList = new JSONArray();
        for (int i = 0; i < this.users.size(); i++) {
            userList.put(this.users.get(i).toJSON(true));
        }

        JSONObject out = super.toJSON();
        if (this.name != null)
            out.put("name", this.name);
        if (this.color != null)
            out.put("color", this.color);
        out.put("users", userList);
        if (this.score != null)
            out.put("score", this.score);
        return out;
    }

    public void updateFromJSON(JSONObject object) throws JSONException {
        super.updateFromJSON(object);

        if (object.has("name")) {
            this.name = object.getString("name");
        }

        if (object.has("color")) {
            this.color = object.getString("color");
        }

        if (object.has("users")) {
            JSONArray objectList = object.getJSONArray("users");
            List<User> userList = new ArrayList<User>(objectList.length());
            for (int i = 0; i < objectList.length(); i++) {
                userList.add(User.fromJSON(objectList.getJSONObject(i)));
            }
            this.users = userList;
        }

        if (object.has("score")) {
            this.score = object.getInt("score");
        }

    }

    public static Team fromJSON(JSONObject object) throws JSONException {
        Team model = new Team();
        model.updateFromJSON(object);
        return model;
    }

    public static Team fromJSON(String id) {
        Team model = new Team();
        model.setId(id);
        return model;
    }

}
