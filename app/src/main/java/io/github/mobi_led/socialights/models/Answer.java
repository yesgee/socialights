package io.github.mobi_led.socialights.models;


public class Answer {


    private String answerString;
    private boolean isCorrect;
    private String feedback;

    public Answer(String answerString, boolean isCorrect){
        this.answerString = answerString;
        this.isCorrect = isCorrect;
    }
    public String getAnswerString() {
        return answerString;
    }

    public void setAnswerString(String answerString) {
        this.answerString = answerString;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }



}
