package io.github.mobi_led.socialights.models;

import java.util.Date;
import java.util.List;

public class Game {

    private Date startedAt;
    private List<Team> teams;
    private List<User> users; // Users in the Room

    public Game(List<Team> teams, List<User>users, Date startedAt){

        this.teams = teams;
        this.users = users;
        this.startedAt = startedAt;

    }

    public Date getStartedAt() {
        return this.startedAt;
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
}
