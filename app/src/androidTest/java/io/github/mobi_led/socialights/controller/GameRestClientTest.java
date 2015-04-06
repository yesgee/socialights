package io.github.mobi_led.socialights.controller;
import android.test.InstrumentationTestCase;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.List;

import io.github.mobi_led.socialights.controllers.GameRestClient;
import io.github.mobi_led.socialights.helpers.Util;
import io.github.mobi_led.socialights.models.Answer;
import io.github.mobi_led.socialights.models.Game;
import io.github.mobi_led.socialights.models.NextQuestions;
import io.github.mobi_led.socialights.models.PreviousQuestions;
import io.github.mobi_led.socialights.models.Question;
import io.github.mobi_led.socialights.models.Team;
import io.github.mobi_led.socialights.models.User;

public class GameRestClientTest extends InstrumentationTestCase {

   private JSONObject gameJson;

    public GameRestClientTest(){

    }

    @Override
    public void setUp() {

        gameJson = new JSONObject();
        JSONArray nextQuestions = new JSONArray();

        JSONArray teamsArr = new JSONArray();

        try {

            JSONObject answer = new JSONObject();
            answer.put("answer", "tenetur quisquam quae explicabo molestiae et molestiae consequatur.");
            answer.put("correct", "false");
            answer.put("id", "54fed9a559bc53292be92ae7");

            JSONObject correctAnswer = new JSONObject();
            correctAnswer.put("answer", "tenetur quisquam quae explicabo molestiae et molestiae consequatur.");
            correctAnswer.put("correct", "true");
            correctAnswer.put("id", "54fed9a559bc53292be92ae6");

            JSONArray answers = new JSONArray();
            answers.put(answer);
            answers.put(correctAnswer);

            JSONObject question = new JSONObject();
            question.put("question", "vel ratione et animi quidem similique consequatur eos odit voluptate?");
            question.put("answers", answers);
            question.put("id", "54fed9a559bc53292be92ae3");
            question.put("correctAnswer", correctAnswer);
            nextQuestions.put(question);

            JSONObject user = new JSONObject();
            user.put("name", "Adeline Harber");
            user.put("id", "54fed9a559bc53292be92ad4");


            JSONObject team = new JSONObject();
            team.put("name", "Red Team");
            team.put("color", "#ff0000");
            team.put("score", 23);
            team.put("users", new JSONArray().put(user));
            team.put("id", "54fed9a559bc53292be92af3");

            gameJson.put("startedAt", "2015-03-10T11:46:45.527Z");
            gameJson.put("id", "54fed9a559bc53292be92af2");
            gameJson.put("nextQuestions", nextQuestions);
            gameJson.put("previousQuestions", nextQuestions); // Doesnot matter
            gameJson.put("teams", teamsArr.put(team));
            gameJson.put("users", new JSONArray().put(user));
            gameJson.put("question", question);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void tearDown() throws Exception{
        super.tearDown();
    }

    public void test_getGame(){

        Game game = GameRestClient.getGame(gameJson);

        assertNotNull(game);
        assertEquals(game.getId(), "54fed9a559bc53292be92af2");
    }

    public void test_gameStartedAtDate(){

        Game game = GameRestClient.getGame(gameJson);
        assertEquals(game.getStartedAt(), Util.getDateTime("2015-03-10T11:46:45.527Z"));
    }

       public void test_getTeams(){

        Game game = GameRestClient.getGame(gameJson);
        List<Team> teams = game.getTeams();
        assertNotNull(teams);
    }

    public void test_getGameUsers(){
        Game game = GameRestClient.getGame(gameJson);
        List<User> users = game.getUsers();
        assertNotNull(users);
        assertEquals(users.size(), 1);
    }

    public void test_getTeamUsers(){

        Game game = GameRestClient.getGame(gameJson);
        Team team = game.getTeams().get(0);

        assertNotNull(team);
        assertEquals(team.getUsers().size(), 1);
    }

    public void test_getCorrectAnswer(){

        Game game = GameRestClient.getGame(gameJson);
        PreviousQuestions pq = game.getPreviousQuestions();
        assertNotNull(pq);

        Question question = pq.getQuestions().get(0); //.getAnswers();

        assertEquals(question.getCorrectAnswer().getId(), "54fed9a559bc53292be92ae6");
    }

    public void test_getQuestion(){

        Game game = GameRestClient.getGame(gameJson);

        Question currentQuestion = game.getCurrentQuestion();

        assertNotNull(currentQuestion);
    }

}

