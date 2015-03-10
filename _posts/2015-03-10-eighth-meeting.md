---
layout: post
title: "Eighth Meeting"
date: "2015-03-10 13:00:00 +0200"
author: Hylke Visser
categories: meetings
---

## Server Development

Current roadmap:

* Model methods (done)
* HTTP API (in review)
* Admin pages (started)
* Hue mock webpage (started)
* Realtime API (todo, will start later)

## HTTP API

Every object that has IDs contains:

{% highlight js %}
id: String (ObjectId),
_id: String (ObjectId)
{% endhighlight %}

**Actions for Questions:**

* createQuestion
* deleteQuestion
* listQuestions (returns ``questions`` array)
* showQuestion
* updateQuestion

These actions return a ``question``:

{% highlight js %}
// See IDs
question: String,
answers: [
  {
    // See IDs
    answer: String,
    correct: Boolean,
    feedback: String
  },
  {
    // See IDs
    answer: String,
    correct: Boolean,
    feedback: String
  },
  ...
]
{% endhighlight %}

**Actions for Users:**

* createUser
* deleteUser
* listUsers (returns ``users`` array)
* showUser
* updateUser

These actions return a ``user``:

{% highlight js %}
// See IDs
name: String,
game: // See Game
{% endhighlight %}

**Actions for Games:**

* addUserToGame
* addUserToTeam
* answerQuestion
* createGame
* createTeam
* deleteGame
* listGames (returns ``games`` array)
* removeUserFromGame
* removeUserFromTeam
* showGame
* startGame
* switchUserBetweenTeams
* updateTeam

These actions return a ``game``:

{% highlight js %}
// See IDs
startedAt: Date,
users: [
  // See User
],
teams: [
  {
    // See IDs
    name: String
    color: String
    users: [
      // See User
    ]
    score: Number
  },
  {
    // See IDs
    name: String
    color: String
    users: [
      // See User
    ]
    score: Number
  }
],
question: {
  // See IDs
  question: // See Question
  team: Number // The index of the team in the teams array.
  // teams attribute will likely change to String (ObjectId) later
  askedAt: Date
  deadlineAt: Date
  answeredAt: Date
  answeredBy: // See User
  answer: String (ObjectId)
  answeredCorrectly: Boolean
},
previousQuestions: [
  // See game.question
],
nextQuestions: [
  // See Question
]
{% endhighlight %}

# Android Development

* Skeleton (done)
* Testing setup (done)
* DTO's (in progress)
* Mocking API (done)
* HTTP Client (in progress)
* UI (in progress)
* Communication with Server (todo)

## Notable changes

* Server model: ``game.question`` and the elements in ``game.previousQuestions`` now have an ``answeredCorrectly`` attribute.

## Timeline

* **Week 12 (16 Mar)**
  * **Team:** Ninth meeting (17 Mar, 13:00) *Unavailable: Hylke*
  * **Course:** Mobile ecosystems lecture
* **Week 13 (23 Mar)**
  * **Course:** Startup information lecture
* **Week 19 (4 May)**
  * **Course:** Project demonstrations
  * **Deadline:** Final report (6 May)
