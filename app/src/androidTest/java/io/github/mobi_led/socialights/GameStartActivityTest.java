package io.github.mobi_led.socialights;

import android.app.Application;
import android.content.Intent;
import android.test.ActivityInstrumentationTestCase2;
import android.test.ActivityUnitTestCase;
import android.test.ApplicationTestCase;
import android.widget.Button;


/**
 * <a href="http://d.android.com/tools/testing/testing_android.html">Testing Fundamentals</a>
 */
public class GameStartActivityTest extends ActivityInstrumentationTestCase2<GameStartActivity> {

    GameStartActivity mainActivity;
     Button testButton;

    public GameStartActivityTest() {
        super(GameStartActivity.class);
    }

    public void setUp() throws Exception{
        super.setUp();

        mainActivity = getActivity();

        testButton = (Button)mainActivity.findViewById(R.id.test_button);
    }

    //Garbage collection
    @Override
    public void tearDown() throws Exception{
       super.tearDown();
    }

    public void testRun(){
        assertEquals(testButton.getText().toString(), "Test ");
    }


}