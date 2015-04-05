package io.github.mobi_led.client.models;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Game extends Base {
    private Date startedAt;
    private List<User> users = new ArrayList();
    private List<Team> teams = new ArrayList();
    private List<AskedQuestion> previousQuestions = new ArrayList();
    private AskedQuestion question;
    private List<Question> nextQuestions = new ArrayList();
    private boolean finished;

    public Date getStartedAt() {
        return this.startedAt;
    }

    public void setStartedAt(Date startedAt) {
        this.startedAt = startedAt;
    }

    public List<User> getUsers() {
        return this.users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Team> getTeams() {
        return this.teams;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }

    public List<AskedQuestion> getPreviousQuestions() {
        return this.previousQuestions;
    }

    public void setPreviousQuestions(List<AskedQuestion> previousQuestions) {
        this.previousQuestions = previousQuestions;
    }

    public AskedQuestion getQuestion() {
        return this.question;
    }

    public void setQuestion(AskedQuestion question) {
        this.question = question;
    }

    public List<Question> getNextQuestions() {
        return this.nextQuestions;
    }

    public void setNextQuestions(List<Question> nextQuestions) {
        this.nextQuestions = nextQuestions;
    }

    public boolean getFinished() {
        return this.finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    public JSONObject toJSON() throws JSONException {
        JSONArray userList = new JSONArray();
        for (int i = 0; i < this.users.size(); i++) {
            userList.put(this.users.get(i).toJSON(true));
        }

        JSONArray teamList = new JSONArray();
        for (int i = 0; i < this.teams.size(); i++) {
            teamList.put(this.teams.get(i).toJSON());
        }

        JSONArray previousQuestionList = new JSONArray();
        for (int i = 0; i < this.previousQuestions.size(); i++) {
            previousQuestionList.put(this.previousQuestions.get(i).toJSON());
        }

        JSONArray nextQuestionList = new JSONArray();
        for (int i = 0; i < this.nextQuestions.size(); i++) {
            nextQuestionList.put(this.nextQuestions.get(i).toJSON());
        }

        JSONObject out = super.toJSON();
        if (this.startedAt != null)
            out.put("startedAt", Base.printDate(this.startedAt));
        out.put("users", userList);
        out.put("teams", teamList);
        if (this.question != null)
            out.put("question", this.question.toJSON());
        out.put("previousQuestions", previousQuestionList);
        out.put("nextQuestions", nextQuestionList);
        return out;
    }

    public void updateFromJSON(JSONObject object) throws JSONException {
        super.updateFromJSON(object);

        if (object.has("startedAt")) {
            try {
                this.startedAt = Base.parseDate(object.getString("startedAt"));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        if (object.has("users")) {
            JSONArray objectList = object.getJSONArray("users");
            List<User> userList = new ArrayList<User>(objectList.length());
            for (int i = 0; i < objectList.length(); i++) {
                userList.add(User.fromJSON(objectList.getJSONObject(i)));
            }
            this.users = userList;
        }

        if (object.has("teams")) {
            JSONArray objectList = object.getJSONArray("teams");
            List<Team> teamList = new ArrayList<Team>(objectList.length());
            for (int i = 0; i < objectList.length(); i++) {
                teamList.add(Team.fromJSON(objectList.getJSONObject(i)));
            }
            this.teams = teamList;
        }

        if (object.has("question")) {
            this.question = AskedQuestion.fromJSON(object.getJSONObject("question"));
        }

        if (object.has("previousQuestions")) {
            JSONArray objectList = object.getJSONArray("previousQuestions");
            List<AskedQuestion> questionList = new ArrayList<AskedQuestion>(objectList.length());
            for (int i = 0; i < objectList.length(); i++) {
                questionList.add(AskedQuestion.fromJSON(objectList.getJSONObject(i)));
            }
            this.previousQuestions = questionList;
        }

        if (object.has("nextQuestions")) {
            JSONArray objectList = object.getJSONArray("nextQuestions");
            List<Question> questionList = new ArrayList<Question>(objectList.length());
            for (int i = 0; i < objectList.length(); i++) {
                questionList.add(Question.fromJSON(objectList.getJSONObject(i)));
            }
            this.nextQuestions = questionList;
        }

        if (object.has("finished")) {
            this.finished = object.getBoolean("finished");
        }

    }

    public static Game fromJSON(JSONObject object) throws JSONException {
        Game model = new Game();
        model.updateFromJSON(object);
        return model;
    }

    public static Game fromJSON(String id) {
        Game model = new Game();
        model.setId(id);
        return model;
    }

}
