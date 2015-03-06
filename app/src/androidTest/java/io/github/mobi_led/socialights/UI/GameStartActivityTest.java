package io.github.mobi_led.socialights.ui;

import android.test.ActivityInstrumentationTestCase2;
import android.widget.Button;

import io.github.mobi_led.socialights.GameStartActivity;
import io.github.mobi_led.socialights.R;


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
        assertEquals(testButton.getText().toString(), "Test");
    }


}