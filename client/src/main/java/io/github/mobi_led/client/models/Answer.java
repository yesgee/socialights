package io.github.mobi_led.client.models;

import org.json.JSONException;
import org.json.JSONObject;

public class Answer extends Base {

    private String answer;
    private Boolean correct;
    private String feedback;

    public String getAnswer() {
        return this.answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Boolean getCorrect() {
        return this.correct;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public String getFeedback() {
        return this.feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public JSONObject toJSON() throws JSONException {
        JSONObject out = super.toJSON();
        if (this.answer != null)
            out.put("answer", this.answer);
        if (this.correct != null)
            out.put("correct", this.correct);
        if (this.feedback != null)
            out.put("feedback", this.feedback);
        return out;
    }

    public void updateFromJSON(JSONObject object) throws JSONException {
        super.updateFromJSON(object);

        if (object.has("answer")) {
            this.answer = object.getString("answer");
        }

        if (object.has("correct")) {
            this.correct = object.getBoolean("correct");
        }

        if (object.has("feedback")) {
            this.feedback = object.getString("feedback");
        }
    }

    public static Answer fromJSON(JSONObject object) throws JSONException {
        Answer model = new Answer();
        model.updateFromJSON(object);
        return model;
    }

    public static Answer fromJSON(String id) {
        Answer model = new Answer();
        model.setId(id);
        return model;
    }

}
