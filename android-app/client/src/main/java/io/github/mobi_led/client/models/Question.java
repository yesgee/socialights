package io.github.mobi_led.client.models;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class Question extends Base {
    private String question;
    private List<Answer> answers = new ArrayList();
    private Answer correctAnswer;

    public String getQuestion() {
        return this.question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<Answer> getAnswers() {
        return this.answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public Answer getCorrectAnswer() {
        return this.correctAnswer;
    }

    public void setCorrectAnswer(Answer answer) {
        this.correctAnswer = correctAnswer;
    }

    public JSONObject toJSON() throws JSONException {
        JSONArray answerList = new JSONArray();
        for (int i = 0; i < this.answers.size(); i++) {
            answerList.put(this.answers.get(i).toJSON());
        }

        JSONObject out = super.toJSON();
        if (this.question != null)
            out.put("question", this.question);
        out.put("answers", answerList);
        if (this.correctAnswer != null)
            out.put("correctAnswer", correctAnswer.toJSON(true));
        return out;
    }

    public void updateFromJSON(JSONObject object) throws JSONException {
        super.updateFromJSON(object);

        if (object.has("question")) {
            this.question = object.getString("question");
        }

        if (object.has("answers")) {
            JSONArray objectList = object.getJSONArray("answers");
            List<Answer> answerList = new ArrayList<Answer>(objectList.length());
            for (int i = 0; i < objectList.length(); i++) {
                answerList.add(Answer.fromJSON(objectList.getJSONObject(i)));
            }
            this.answers = answerList;
        }

        if (object.has("correctAnswer")) {
            this.correctAnswer = Answer.fromJSON(object.getJSONObject("correctAnswer"));
        }
    }

    public static Question fromJSON(JSONObject object) throws JSONException {
        Question model = new Question();
        model.updateFromJSON(object);
        return model;
    }

    public static Question fromJSON(String id) {
        Question model = new Question();
        model.setId(id);
        return model;
    }
}
