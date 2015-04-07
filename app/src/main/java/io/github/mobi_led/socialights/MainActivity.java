package io.github.mobi_led.socialights;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import io.github.mobi_led.client.Client;
import io.github.mobi_led.client.models.User;
import rx.functions.Action1;

public class MainActivity extends Activity {

    private EditText userName;
    private Button startPlaying;

    private Client client;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        userName = (EditText) findViewById(R.id.userName);
        startPlaying = (Button) findViewById(R.id.startPlaying);

        client = Client.getInstance();
    }

    public void registerUser(View view) {
        final MainActivity currentActivity = this;

        startPlaying.setEnabled(false);
        startPlaying.setText(R.string.main_startPlaying_loading);

        String username = userName.getText().toString();
        Log.i("GameStartActivity", "Registering User " + username);

        client.createUser(username).subscribe(new Action1<User>() {
            @Override
            public void call(User user) {
                Log.i("GameStartActivity", "Registered User " + user.getId());
                // Reset button
                startPlaying.setEnabled(true);
                startPlaying.setText(R.string.main_startPlaying_text);

                // Move to next screen
                Intent intent = new Intent(currentActivity, SelectGameActivity.class);
                intent.putExtra("user", user);
                startActivity(intent);
            }
        }, new Action1<Throwable>() {
            @Override
            public void call(Throwable throwable) {
                Log.e("GameStartActivity", "registerUser() - Could not register User: " + throwable.getMessage());
                startPlaying.setText(R.string.main_startPlaying_error);
                Toast.makeText(getApplicationContext(), "Could not register.", Toast.LENGTH_SHORT).show();
            }
        });
    }

}
