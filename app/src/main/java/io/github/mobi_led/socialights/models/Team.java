package io.github.mobi_led.socialights.models;

import java.util.List;

public class Team {

    private String name;
    private String color;
    private List<User> users; //Users playing the game
    private int score;

    public Team(String name, String color, List<User> users){
        this.name = name;
        this.color = color;
        this.users = users;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

}
