package io.github.mobi_led.socialights;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;


public class login extends ActionBarActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_login, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void sendMessage_lobby(View view) {

        Intent intent = new Intent(this, lobby.class);
        EditText avatar = (EditText) findViewById(R.id.id_nickname);
        intent.putExtra("avatar", avatar.getText().toString());

        //EditText editText = (EditText) findViewById(R.id.edit_message);


        // intent.putExtra(EXTRA_MESSAGE,finali);
        //intent.putExtra(Intent.EXTRA_SHORTCUT_NAME, (CharSequence) binar);
        startActivity(intent);
    }
}
