package io.github.mobi_led.socialights.models;

import java.io.Serializable;
import java.util.List;

public class Question implements Serializable{

    private String question;
    private List<Answer> answers;
    private Answer correctAnswer;
    private String id;

    public Question(){

    }

    public Question(String question, List<Answer> answers, Answer correctAnswer, String id){
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

    public Answer getCorrectAnswer() {
        return this.correctAnswer;
    }

    public void setCorrectAnswer(Answer correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
