package io.github.mobi_led.socialights.models;


import java.util.List;

public class NextQuestions {

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    private List<Question> questions;

    public NextQuestions(List<Question> questions){
       this.questions = questions;
    }

    public NextQuestions(){

    }
}


