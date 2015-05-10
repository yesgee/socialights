package io.github.mobi_led.client;

import java.util.HashMap;

import io.github.mobi_led.client.models.Game;
import io.github.mobi_led.client.models.User;
import rx.Observable;

public class Store {

    private Client client;

    public Store(Client client) {
        this.client = client;
    }

    // Instance

    private static Store instance;

    public static Store getInstance(Client client) {
        if (instance == null) {
            instance = new Store(client);
        }
        return instance;
    }

    public static Store getInstance() {
        return Store.getInstance(Client.getInstance());
    }

}
