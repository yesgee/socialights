package io.github.mobi_led.client.models;

import org.json.JSONException;
import org.json.JSONObject;

public class User extends Base {

    private String name;
    private Game game;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Game getGame() {
        return this.game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public JSONObject toJSON() throws JSONException {
        JSONObject out = super.toJSON();
        if (this.name != null)
            out.put("name", this.name);
        if (this.game != null)
            out.put("game", this.game.toJSON(true));
        return out;
    }

    public void updateFromJSON(JSONObject object) throws JSONException {
        super.updateFromJSON(object);

        if (object.has("name")) {
            this.name = object.getString("name");
        }

        if (object.has("game")) {
            this.game = Game.fromJSON(object.getString("game"));
        }
    }

    public static User fromJSON(JSONObject object) throws JSONException {
        User model = new User();
        model.updateFromJSON(object);
        return model;
    }

    public static User fromJSON(String id) {
        User model = new User();
        model.setId(id);
        return model;
    }

}
