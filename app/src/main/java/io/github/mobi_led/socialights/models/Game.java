package io.github.mobi_led.socialights.models;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class Game implements Serializable {

    private Date startedAt;
    private List<Team> teams;
    private List<User> users; // Users in the Room
    private String name;
    private String id;
    private NextQuestions nextQuestions;
    private PreviousQuestions previousQuestions;
    //  private List<Question> questions;

    public Game(){

    }

    public Game(List<Team> teams, List<User> users, Date startedAt, String id,
                NextQuestions nextQuestions, PreviousQuestions previousQuestions){

        this.teams = teams;
        this.users = users;
        this.startedAt = startedAt;
        this.id = id;
        this.nextQuestions = nextQuestions;
        this.previousQuestions = previousQuestions;
    }

    public Date getStartedAt() {
        return this.startedAt;
    }

    public void setStartedAt(Date startedAt) {
        this.startedAt = startedAt;
    }

    public List<Team> getTeams() {
        return this.teams;
    }

    public List<User> getUsers() {
        return this.users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }


    public String getId() {
        return id;
    }

    public void setId(String id){
        this.id = id;
    }

    public NextQuestions getNextQuestions() {
        return nextQuestions;
    }

    public void setNextQuestions(NextQuestions nextQuestions){
        this.nextQuestions = nextQuestions;
    }

    public PreviousQuestions getPreviousQuestions() {
        return previousQuestions;
    }
    public void setPreviousQuestions(PreviousQuestions previousQuestions){
        this.previousQuestions = previousQuestions;
    }

    /**
    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions){
        this.questions = questions;
    }
     **/
}
