package io.github.mobi_led.client.models;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.util.Date;

public class AskedQuestion extends Base {
    private Question question;
    private Integer team;
    private Date askedAt;
    private Date deadlineAt;
    private Date answeredAt;
    private User answeredBy;
    private Answer answer;
    private Boolean answeredCorrectly;

    public Question getQuestion() {
        return this.question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Integer getTeam() {
        return this.team;
    }

    public void setTeam(Integer team) {
        this.team = team;
    }

    public Date getAskedAt() {
        return this.askedAt;
    }

    public void setAskedAt(Date askedAt) {
        this.askedAt = askedAt;
    }

    public Date getDeadlineAt() {
        return this.deadlineAt;
    }

    public void setDeadlineAt(Date deadlineAt) {
        this.deadlineAt = deadlineAt;
    }

    public Date getAnsweredAt() {
        return this.answeredAt;
    }

    public void setAnsweredAt(Date answeredAt) {
        this.answeredAt = answeredAt;
    }

    public User getAnsweredBy() {
        return this.answeredBy;
    }

    public void setAnsweredBy(User answeredBy) {
        this.answeredBy = answeredBy;
    }

    public Answer getAnswer() {
        return this.answer;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }

    public Boolean getAnsweredCorrectly() {
        return this.answeredCorrectly;
    }

    public void setAnsweredCorrectly(Boolean answeredCorrectly) {
        this.answeredCorrectly = answeredCorrectly;
    }

    public JSONObject toJSON() throws JSONException {
        JSONObject out = super.toJSON();
        if (this.question != null)
            out.put("question", this.question.toJSON(true));
        if (this.team != null)
            out.put("team", this.team);
        if (this.askedAt != null)
            out.put("askedAt", Base.printDate(this.askedAt));
        if (this.deadlineAt != null)
            out.put("deadlineAt", Base.printDate(this.deadlineAt));
        if (this.answeredAt != null)
            out.put("answeredAt", Base.printDate(this.answeredAt));
        if (this.answeredBy != null)
            out.put("answeredBy", this.answeredBy.toJSON(true));
        if (this.answer != null)
            out.put("answer", this.answer.toJSON(true));
        if (this.answeredCorrectly != null)
            out.put("answeredCorrectly", this.answeredCorrectly);
        return out;
    }

    public void updateFromJSON(JSONObject object) throws JSONException {
        super.updateFromJSON(object);

        if (object.has("question")) {
            this.question = Question.fromJSON(object.getJSONObject("question"));
        }

        if (object.has("team")) {
            this.team = object.getInt("team");
        }

        if (object.has("askedAt")) {
            try {
                this.askedAt = Base.parseDate(object.getString("askedAt"));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        if (object.has("deadlineAt")) {
            try {
                this.deadlineAt = Base.parseDate(object.getString("deadlineAt"));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        if (object.has("answeredAt")) {
            try {
                this.answeredAt = Base.parseDate(object.getString("answeredAt"));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        if (object.has("answeredBy")) {
            this.answeredBy = User.fromJSON(object.getString("answeredBy"));
        }

        if (object.has("answer")) {
            this.answer = Answer.fromJSON(object.getString("answer"));
        }

        if (object.has("answeredCorrectly")) {
            this.answeredCorrectly = object.getBoolean("answeredCorrectly");
        }

    }

    public static AskedQuestion fromJSON(JSONObject object) throws JSONException {
        AskedQuestion model = new AskedQuestion();
        model.updateFromJSON(object);
        return model;
    }

    public static AskedQuestion fromJSON(String id) {
        AskedQuestion model = new AskedQuestion();
        model.setId(id);
        return model;
    }

}
