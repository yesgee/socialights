package io.github.mobi_led.socialights.controllers;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import io.github.mobi_led.socialights.helpers.Util;
import io.github.mobi_led.socialights.models.Answer;
import io.github.mobi_led.socialights.models.Game;
import io.github.mobi_led.socialights.models.NextQuestions;
import io.github.mobi_led.socialights.models.PreviousQuestions;
import io.github.mobi_led.socialights.models.Question;
import io.github.mobi_led.socialights.models.Team;
import io.github.mobi_led.socialights.models.User;

public class GameRestClient {


    public static Game getGame(JSONObject response) {


        try {

          JSONObject gameJson = response.getJSONObject("game");

          String startedAt =  gameJson.getString("startedAt");
          String id = gameJson.getString("id");
         // JSONArray nextQuestions =  gameJson.getJSONArray("nextQuestions");
         // JSONArray previousQuestions =  gameJson.getJSONArray("previousQuestions");
          JSONArray teams =  gameJson.getJSONArray("teams");
          JSONArray users =  gameJson.getJSONArray("users");
          JSONObject currentQuestion = gameJson.getJSONObject("question");
          Question q = getQuestion(currentQuestion.getJSONObject("question"));

         // NextQuestions nq = new NextQuestions(getQuestions(nextQuestions));
         // PreviousQuestions pq = new PreviousQuestions(getQuestions(previousQuestions));

          return new Game(getTeams(teams),
                          getUsers(users),
                          Util.getDateTime(startedAt),
                          id, q);

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return null;
    }

    private static List<Team> getTeams(JSONArray teams) throws JSONException{
        List<Team> teamList = new ArrayList<Team>();

        for (int i = 0; i < teams.length(); i++) {
            JSONObject teamJ = teams.getJSONObject(i);
            Team team = new Team();
            team.setName(teamJ.getString("name"));
            team.setColor(teamJ.getString("color"));
            team.setScore(teamJ.getInt("score"));
            team.setUsers(getUsers(teamJ.getJSONArray("users")));
            team.setId(teamJ.getString("id"));
            teamList.add(team);
        }

        return teamList;
    }

    private static List<User> getUsers(JSONArray users) throws JSONException{

        List<User> usersList = new ArrayList<User>();

        for (int i = 0; i < users.length(); i++) {

            JSONObject teamJ = users.getJSONObject(i);
            User user = new User();
            user.setName(teamJ.getString("name"));

            user.setId(teamJ.getString("id"));
            usersList.add(user);
        }

        return usersList;
    }

    private static List<Question> getQuestions(JSONArray nextQuestions)throws JSONException {

        List<Question> questions = new ArrayList<Question>();

        for (int i=0; i < nextQuestions.length(); i++ ) {

           JSONObject questionJson = nextQuestions.getJSONObject(i);
           Question q = getQuestion(questionJson);
           questions.add(q);
        }

        return questions;
    }

    private static Question getQuestion(JSONObject questionJson) throws JSONException {

        Question question = new Question();
        question.setId(questionJson.getString("id"));
        question.setQuestion(questionJson.getString("question"));
       // String ansStrin = questionJson.getString("answers");
        JSONArray answersArr = questionJson.getJSONArray("answers");
        List<Answer> answerList = getAnswers(answersArr);
        question.setAnswers(answerList);
        question.setCorrectAnswer(getAnswer(questionJson.getJSONObject("correctAnswer")));
        return question;
    }

    private static List<Answer> getAnswers(JSONArray answersJson) throws JSONException{

        List<Answer> answerList = new ArrayList<Answer>();

        for (int i=0; i < answersJson.length(); i++ ) {

            JSONObject aJson = answersJson.getJSONObject(i);
            Answer answer = getAnswer(aJson);
            answerList.add(answer);
        }

        return answerList;
    }

    private static Answer getAnswer(JSONObject aJson) throws JSONException {

        Answer answer = new Answer();
        answer.setId(aJson.getString("id"));
        answer.setAnswerString(aJson.getString("answer"));
        answer.setCorrect(aJson.getBoolean("correct"));

        return answer;
    }
}