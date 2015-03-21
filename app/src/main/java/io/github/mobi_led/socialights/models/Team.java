package io.github.mobi_led.socialights.models;

import java.util.List;

public class Team {

    private String name;
    private String color;
    private List<User> users; //Users playing the game
    private int score;
    private String id;

    public Team(){

    }

    public Team(String name, String color, List<User> users, String id){
        this.name = name;
        this.color = color;
        this.users = users;
        this.id = id;
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

    public User getUser(String name){

        for(User user : this.users)
            if(user.getName().equals(name))
                return user;

        return null;
    }

    public int addUser(User newUser){

        User checkUser = getUser(newUser.getName());

        if(checkUser != null)
            return 0;

        this.users.add(newUser);
        return 1;
    }

    public boolean containsUserByName(String name){

        return getUser(name) != null ? true : false;
    }

    public String getId(){
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
}
