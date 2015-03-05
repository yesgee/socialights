package io.github.mobi_led.socialights.models;

import java.util.Date;
import java.util.List;

public class Game {


    private Date StartedAt;
    private List<Team> Teams;
    private List<User> Users; // Users in the Room

    public Date getStartedAt() {
        return StartedAt;
    }

    public void setStartedAt(Date startedAt) {
        StartedAt = startedAt;
    }

    public List<Team> getTeams() {
        return Teams;
    }

    public void setTeams(List<Team> teams) {
        Teams = teams;
    }

    public List<User> getUsers() {
        return Users;
    }

    public void setUsers(List<User> users) {
        Users = users;
    }
}
