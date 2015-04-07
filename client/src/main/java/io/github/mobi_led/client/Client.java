package io.github.mobi_led.client;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import io.github.mobi_led.client.models.Base;
import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.Question;
import io.github.mobi_led.client.models.User;
import rx.Observable;
import rx.functions.Func0;
import rx.functions.Func1;

public class Client extends Connection {

    public Client(String host) {
        super(host);
    }

    // Show Actions

    public Observable<Game> showGame(String id) {
        JSONObject params = new JSONObject();
        try {
            params.put("id", id);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<Game> modelMapper = new ModelMapper("game", this.gameGenerator);
        return this.action("showGame", params).map(modelMapper);
    }

    public Observable<Question> showQuestion(String id) {
        JSONObject params = new JSONObject();
        try {
            params.put("id", id);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<Question> modelMapper = new ModelMapper("question", this.questionGenerator);
        return this.action("showQuestion", params).map(modelMapper);
    }

    public Observable<User> showUser(String id) {
        JSONObject params = new JSONObject();
        try {
            params.put("id", id);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<User> modelMapper = new ModelMapper("user", this.userGenerator);
        return this.action("showUser", params).map(modelMapper);
    }

    // List Actions

    public Observable<List<Game>> listGames() {
        ModelMapper<Game> modelMapper = new ModelMapper(this.gameGenerator);
        ModelListMapper<Game> listMapper = new ModelListMapper("games", modelMapper);
        return this.action("listGames").map(listMapper);
    }

    public Observable<List<Question>> listQuestions() {
        ModelMapper<Question> modelMapper = new ModelMapper(this.questionGenerator);
        ModelListMapper<Question> listMapper = new ModelListMapper("questions", modelMapper);
        return this.action("listQuestions").map(listMapper);
    }

    public Observable<List<User>> listUsers() {
        ModelMapper<User> modelMapper = new ModelMapper(this.userGenerator);
        ModelListMapper<User> listMapper = new ModelListMapper("users", modelMapper);
        return this.action("listUsers").map(listMapper);
    }

    // Game Actions

    public Observable<Game> addUserToGame(String gameId, String userId) {
        JSONObject params = new JSONObject();
        try {
            params.put("game", gameId).put("user", userId);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<Game> modelMapper = new ModelMapper("game", this.gameGenerator);
        return this.action("addUserToGame", params).map(modelMapper);
    }

    public Observable<Game> addUserToTeam(String gameId, String userId, int teamIdx) {
        JSONObject params = new JSONObject();
        try {
            params.put("game", gameId).put("user", userId).put("team", teamIdx);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<Game> modelMapper = new ModelMapper("game", this.gameGenerator);
        return this.action("addUserToTeam", params).map(modelMapper);
    }

    public Observable<Game> answerQuestion(String gameId, String userId, String answerId) {
        JSONObject params = new JSONObject();
        try {
            params.put("game", gameId).put("user", userId).put("answer", answerId);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<Game> modelMapper = new ModelMapper("game", this.gameGenerator);
        return this.action("answerQuestion", params).map(modelMapper);
    }

    public Observable<Game> askNextQuestion(String gameId) {
        JSONObject params = new JSONObject();
        try {
            params.put("game", gameId);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<Game> modelMapper = new ModelMapper("game", this.gameGenerator);
        return this.action("askNextQuestion", params).map(modelMapper);
    }

    public Observable<Game> createGame() {
        ModelMapper<Game> modelMapper = new ModelMapper("game", this.gameGenerator);
        return this.action("createGame").map(modelMapper);
    }

    public Observable<Game> createGame(String userId, int nrOfQuestions) {
        JSONObject params = new JSONObject();
        try {
            params.put("user", userId);
            params.put("nrOfQuestions", nrOfQuestions);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<Game> modelMapper = new ModelMapper("game", this.gameGenerator);
        return this.action("createGame", params).map(modelMapper);
    }

    public Observable<Game> removeUserFromGame(String gameId, String userId) {
        JSONObject params = new JSONObject();
        try {
            params.put("game", gameId).put("user", userId);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<Game> modelMapper = new ModelMapper("game", this.gameGenerator);
        return this.action("removeUserFromGame", params).map(modelMapper);
    }

    public Observable<Game> removeUserFromTeam(String gameId, String userId) {
        JSONObject params = new JSONObject();
        try {
            params.put("game", gameId).put("user", userId);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<Game> modelMapper = new ModelMapper("game", this.gameGenerator);
        return this.action("removeUserFromTeam", params).map(modelMapper);
    }

    public Observable<Game> startGame(String gameId) {
        JSONObject params = new JSONObject();
        try {
            params.put("id", gameId);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<Game> modelMapper = new ModelMapper("game", this.gameGenerator);
        return this.action("startGame", params).map(modelMapper);
    }

    public Observable<Game> switchUserBetweenTeams(String gameId, String userId) {
        JSONObject params = new JSONObject();
        try {
            params.put("game", gameId).put("user", userId);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<Game> modelMapper = new ModelMapper("game", this.gameGenerator);
        return this.action("switchUserBetweenTeams", params).map(modelMapper);
    }

    public Observable<Game> updateTeam(String gameId, int teamIdx, String teamName, String teamColor) {
        JSONObject params = new JSONObject();
        try {
            params.put("game", gameId).put("team", teamIdx).put("name", teamName).put("color", teamColor);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<Game> modelMapper = new ModelMapper("game", this.gameGenerator);
        return this.action("updateTeam", params).map(modelMapper);
    }

    // Question Actions
    // None

    // User Actions

    public Observable<User> createUser(String name) {
        JSONObject params = new JSONObject();
        try {
            params.put("name", name);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        ModelMapper<User> modelMapper = new ModelMapper("user", this.userGenerator);
        return this.action("createUser", params).map(modelMapper);
    }

    // Client Instance

    private static Client instance;
    private static Thread clientThread;

    public static Client getInstance(String host) {
        if (instance == null) {
            Log.i("Client", "getInstance() — Creating new Client instance");
            instance = new Client(host);
            instance.roomAdd("updates:models");
        }
        if (clientThread == null || !clientThread.isAlive() || clientThread.isInterrupted()) {
            clientThread = new Thread(instance);
            clientThread.start();
        }
        return instance;
    }

    public static Client getInstance() {
        return Client.getInstance("hylkevisser.nl");
    }

    public static Thread getClientThread() {
        return clientThread;
    }

    // Model Mappers and Generators

    class ModelMapper<T extends Base> implements Func1<JSONObject, T> {
        private String key;
        private Func0<T> generator;

        public ModelMapper(Func0<T> generator) {
            this.generator = generator;
        }

        public ModelMapper(String key, Func0<T> generator) {
            this.key = key;
            this.generator = generator;
        }

        @Override
        public T call(JSONObject object) {
            T model = generator.call();
            try {
                if (this.key != null) {
                    model.updateFromJSON(object.getJSONObject(key));
                } else {
                    model.updateFromJSON(object);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return model;
        }
    }

    private final Func0<Game> gameGenerator = new Func0() {
        public Game call() {
            return new Game();
        }
    };

    private final Func0<Question> questionGenerator = new Func0() {
        public Question call() {
            return new Question();
        }
    };

    private final Func0<User> userGenerator = new Func0() {
        public User call() {
            return new User();
        }
    };

    class ModelListMapper<T extends Base> implements Func1<JSONObject, List<T>> {
        private String key;
        private ModelMapper<T> mapper;

        public ModelListMapper(String key, ModelMapper<T> mapper) {
            this.key = key;
            this.mapper = mapper;
        }

        @Override
        public List<T> call(JSONObject object) {
            List<T> list = new ArrayList();
            try {
                JSONArray items = object.getJSONArray(key);
                for (int i = 0; i < items.length(); i++) {
                    JSONObject item = items.getJSONObject(i);
                    list.add(mapper.call(item));
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return list;
        }
    }

}
