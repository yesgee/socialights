package io.github.mobi_led.socialights.models;

import java.io.Serializable;

public class User implements Serializable{

    private String name;
    private String id;

    public User(){

    }

    public User(String name, String id){
        this.name = name;
        this.id = id;
    }

    public User(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

}
