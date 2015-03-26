package io.github.mobi_led.socialights.models;

import java.io.Serializable;
import java.util.List;

public class PreviousQuestions implements Serializable {

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    private List<Question> questions;

    public PreviousQuestions(List<Question> questions){
        this.questions = questions;
    }

    public PreviousQuestions(){

    }
}
