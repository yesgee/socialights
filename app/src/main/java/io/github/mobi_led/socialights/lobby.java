package io.github.mobi_led.socialights;

import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.SimpleAdapter;

import java.util.ArrayList;


public class lobby extends ActionBarActivity {

    /** Items entered by the user is stored in this ArrayList variable */
    ArrayList<String> listA = new ArrayList<String>();
    ArrayList<String> listB = new ArrayList<String>();
    ListView listViewA,listViewB;
    /** Declaring an ArrayAdapter to set items to ListView */
    ArrayAdapter<String> adapter;
    private static final String TAG_AVATAR = "Avatar";
    ArrayAdapter<String> itemsAdapterA;
    ArrayAdapter<String> itemsAdapterB;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        /** Reference to the button of the layout main.xml */
        Button btnA = (Button) findViewById(R.id.btn_teamA);

        setContentView(R.layout.activity_lobby);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_lobby, menu);
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

    public void join_lobbyA (View view) {

        String avatar = (String) getIntent().getStringExtra("avatar").toString();
        Log.d(avatar,"Avatar");
        listViewA = (ListView) findViewById(R.id.listView1);
        listA = new ArrayList<String>();
        listA.add(avatar);
        itemsAdapterA = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, listA);

        listViewA.setAdapter(itemsAdapterA);

        //itemsAdapterB.remove(avatar);
        Button disbtn = (Button)findViewById(R.id.btn_teamA);
        disbtn.setEnabled(false);
    }

    public void join_lobbyB (View view) {

        String avatar = (String) getIntent().getStringExtra("avatar").toString();
        Log.d(avatar,"Avatar");
        listViewB = (ListView) findViewById(R.id.listView2);
        listB = new ArrayList<String>();
        listB.add(avatar);
        itemsAdapterB = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, listB);
        listViewB.setAdapter(itemsAdapterB);
      //  itemsAdapterA.remove(avatar);
        Button disbtnB = (Button)findViewById(R.id.btn_teamB);
        disbtnB.setEnabled(false);
    }


}
