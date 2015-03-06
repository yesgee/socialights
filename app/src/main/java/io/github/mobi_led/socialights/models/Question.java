package io.github.mobi_led.socialights.models;

import java.util.List;

public class Question {

    private String question;
    private List<Answer> answers;

    public Question(String question, List<Answer> answers){
        this.question = question;
        this.answers = answers;
    }

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
}
