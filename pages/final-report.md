---
layout: page
title: Final Report
permalink: /final-report/
---

## Introduction

In large companies and organisations employees often don't know many of their colleagues except for their direct co-workers. During their breaks, they get a cup of coffee and return to their office. This leaves the coffee rooms empty and unattractive and doesn't lead to any social interaction between co-workers. We have developed an application that makes these coffee rooms more attractive by enabling employees to interact with the room and with each other in a playful way. This increases social interaction and collaboration between co-workers, which are desirable feats within a company.

Our application provides a quiz-based game that interacts with the lights in the coffee room. Participants have to collaborate with each other to find the answers to the questions and the lights in the coffee room provide feedback for the game. This visual stimulation will tempt other people in the room to also participate.

## Team

### Gayathri Srinivaasan

[![Gitter](https://img.shields.io/badge/gitter-@yesgee-green.svg?style=flat-square)](https://gitter.im/yesgee "Contact on gitter")
[![Email](https://img.shields.io/badge/email-gayathri.srinivaasan@aalto.fi-blue.svg?style=flat-square)](mailto:gayathri.srinivaasan@aalto.fi "email")

### Harika Satharasi

[![Gitter](https://img.shields.io/badge/gitter-@harikasatharasi-green.svg?style=flat-square)](https://gitter.im/harikasatharasi "Contact on gitter")
[![Email](https://img.shields.io/badge/email-harika.satharasi@aalto.fi-blue.svg?style=flat-square)](mailto:harika.satharasi@aalto.fi "email")


### Hylke Visser

[![Gitter](https://img.shields.io/badge/gitter-@htdvisser-green.svg?style=flat-square)](https://gitter.im/htdvisser "Contact on gitter")
[![Email](https://img.shields.io/badge/email-hylke.visser@aalto.fi-blue.svg?style=flat-square)](mailto:hylke.visser@aalto.fi "email")

### Jan van de Kerkhof

[![Gitter](https://img.shields.io/badge/gitter-@janvandekerkhof-green.svg?style=flat-square)](https://gitter.im/janvandekerkhof "Contact on gitter")
[![Email](https://img.shields.io/badge/email-jan.vandekerkhof@aalto.fi-blue.svg?style=flat-square)](mailto:jan.vandekerkhof@aalto.fi "email")

### Samuel Balcha

[![Gitter](https://img.shields.io/badge/gitter-@samuelbalcha-green.svg?style=flat-square)](https://gitter.im/samuelbalcha "Contact on gitter")
[![Email](https://img.shields.io/badge/email-samuel.balcha@gmail.com-blue.svg?style=flat-square)](mailto:samuel.balcha@gmail.com "email")

### Sowmya Ravidas

[![Gitter](https://img.shields.io/badge/gitter-@sowmyaravidas-green.svg?style=flat-square)](https://gitter.im/sowmyaravidas "Contact on gitter")
[![Email](https://img.shields.io/badge/email-sowmya.ravidas@aalto.fi-blue.svg?style=flat-square)](mailto:sowmya.ravidas@aalto.fi "email")

### Tutor: Sakari Luukkainen

[![Email](https://img.shields.io/badge/email-sakari.luukkainen@aalto.fi-blue.svg?style=flat-square)](mailto:sakari.luukkainen@aalto.fi "email")


## Evaluation of the results

We developed an application that is able to bring colleagues together within a company and make them get to know and understand each other. With *SociaLights*, we strive to enhance social interaction between people and, by doing so, strengthen the social foundation of the companies that adopt *SociaLights*. We believe that a cooperative and playful game in the coffee room will lead to the development of social ties and cooporative skills that contribute to future (collaborative) problem solving capabilities of the company.
We make the game combined with lights, into a *cool* gadget, such that young and vibrant companies will sooner be tempted to acquire the lights and the application. So far, we have built a quiz game and made it work for deployment in **one coffee room**. We have build the mobile (Android) application and a cloud-based game server. We do not depend on a third party service (Hue Cloud) to communicate with the Hue Lights.

### Achieved Goals

* We have built a quiz application on android platform that enables user to join a game and play.
* A quiz server that  generates the questions, verifies the answers, keeps score and talks to the application.
* Hue lights are connected to the server and the feedback of the game is provided by the lights.

### Scope for improvement

In the project, we implemented only the quiz game, but we kept the possibility open to add more game types later. We limited outselves to one coffee room, but as the game is very dynamically implemented, it can be easily adjusted to work with multiple coffee rooms.

### Evaluation of quality of the system

####Server

The server is implemented in a way that is very scalable. The complete state is stored the MongoDB database and in the Redis cache. This allows us to scale the server-side of the application by simply starting new processes.

The server-side of the application is thoroughly covered with unit tests, as can be seen from the image below. Using the Travis Continuous Integration system, this test suite is run after every push to github.

![Coverage Report](/images/coverage.png)

####Android UI

* The User Interface is easy to use and the mobile app guides the user from the start till the end of the game.
* The user can start a game when he wants and is free to join any of the teams he likes to play with.
* Each team is assigned a *color*, indicated by a hue light and the third hue light is used as a countdown timer for each question.
* The user is free to quit the game at any point of time.

The SociaLights app is composed of several activities, each providing a simple user interface and an action to be performed. The game uses native UI controls such as list, fragments and other common elements. The game provides the user a feedback on the UI without distracting user’s action. Currently, the game has a UI for registration and login, creating a new game with the desired number of quiz questions, a list of users who are in the game and which team they belong to, a quiz screen where the users can see if their opponents are answering correctly or not and finally the score board. For example, the following image depicts the experience of answering a question, where the yellow progress bar slides from yellow to grey indicating a ticking deadline for an answer.

<div style="text-align: center; margin: 1cm auto;">
<img src="/images/newprogress.png" alt="Progress bar used to give feedback" width="200">
</div>

Other interface aspects include the change of color of the answer button to green or red depending on the correctness of the provided answer. Green is used to show a correct answer while red is used for a wrong answer. Below are two figures that show the concept clearly.

<div style="text-align: center; margin: 1cm auto;">
<img src="/images/correct.png" alt="User interface feedback for correct and incorrect answer" width="200" style="margin-right: 1cm;">
<img src="/images/incorrect.png" alt="User interface feedback for correct and incorrect answer" width="200">
</div>

In the figures, the Red Team is able to see what the other team has answered and whether the answer is correct or not on the same screen. The second figure on the other hand shows enabled button texts, indicating the turn to answer is for the Red Team but also showing the team has answered incorrectly.

####Android-Server Connectivity

The game uses Socket programming in Java with TCP as the communication protocol. This was chosen over HTTP due to the reliability TCP provides. Moreover, the socket model offers pushing state changes from the server. Once the socket client opens a connection, the server is able to serve the game object in JSON format. Moreover, the communication between the client and server is made asynchronously, offering a non blocking user interface. To achieve this, the Rx library is used, which provides subscribing to and publishing events and callbacks. The following code snippet shows the client subscribing for a startGame action.

{% highlight java %}
client.startGame(game.getId()).subscribe(new Action1<Game>(){
      @Override
      public void call(Game game) {
         //Start a new Intent and pass the game object
       }
});
{% endhighlight %}

Excerpt 1. Subscription for a game start action.


#### Hue lights
* The Hue lights controller is able to connect to any SociaLights server and process commands.
* The Hue lights controller is stateless and memoryless and is therefore very easy and versatile in use.
* The Hue lights respond immediately to a command sent by the server.
* The Hue lights can respond to any event in the game flow.
    1. The lights can assign a color to each team.
    * The lights can show the team scores in terms of relative brightness.
    * The lights can count down on an asked question.
    * The two team lights show the color of the team that needs to answer the question on countdown.
    * The middle light will flicker and slowly change color from green to red as the time runs out on countdown.
    * The countdown stops when a question is answered or when the time runs on out.
    * The lights flicker red on a wrongly answered question or when the countdown timer runs out.
    * The lights flicker green on a rightly answered question.
    * The lights show a color loop animation when no game is being played.

We have achieved all the Hue lights functionality that we set out achieve in the initial project plan. Future prospects would be to make the system work for more teams and more lights and to develop some fancier animations to for instance detect when a user enters a room, when users are waiting to play and when a game starts and finishes.

<div style="page-break-after:always"></div>

### Challenging Technological and Environment Aspects

####Technological Aspects

* The app pushes user/team information to the server and fetches game information from it.
* The game state is consistent across the server and the application.
* The game is customizable for any company.
* The game flow can be controlled through the application or the server admin panel.
* The Hue lights are interfaced with the server via the Hue API.
* The Hue lights respond in real time to game events.
* The Hue lights animations are created by individual, timed commands.

####Environment Aspects
* Identifying Coffee rooms and making them Socialights enabled.
* Using the lights in a manner that does not have a disturbing effect on the user.

## Metrics

### Lines of code
The written code for the server consists of 8281 lines of code in total. Out of these 8281 lines of code, 3221 lines are for testing purposes. So, almost 40% of all the code is written to ensure a safe and smooth development. This is also the reason that our code does not contain any known bugs, as the code is thoroughly tested.

### Resources

* Hue Lights
* Hue API
* Test Device: Android Phone

#### Quality metrics

* The game can support a large number of users and is scalable and flexible.
* No delay in answering the question and getting feedback from the lights.
* The entire application along with the hue lights is user-friendly and easy to use.

## Work practices and tools

**Gitter:** Gitter is a great communication tool. Integrations with other tools make it a good place to get an overview of what's going on.

**2-Daily standups:** This did not really work, as we had enough time to spread the work and update each other in our weekly meetings.

**Weekly meetings:** Our weekly meetings were very useful. Sometimes we needed only 15 minutes to bring every team member up to date on the progress, but other times we spent more than an hour to make decisions about the future direction.

**Webpage:** It was nice to have a place where we could upload notes from our meetings, for future reference.

**Taiga:** In a small project like this, using project management tools leads to unnecessary overhead, which is why we abandoned Taiga already in an early stage.

**Git and Github:** Git and Github are extremely powerful tools for team projects.

**Branching Model:** The server-side of the application was developed using the Git-flow branching model. This allowed multiple team members to work separately on different parts of the server, without interfering too much with each other. The development model for the android part is discussed in the Android connectivity section.

The SociaLights android game was developed using Android Studio and Github as the code base. Team members worked on the different parts of the game and pushed code to the repository. The client code has unit tests written for most of it’s business logic. To minimize the learning curve, the android development team opted out from using Git flow and instead published code to the develop branch in most of the cases. This practice did not result in major setback, but it could be improved for future software development processes.


**Code Reviews:** The branching model used in server-side development made it extremely easy to do code reviews. This makes sure that at least one pair of fresh eyes has seen the code, and that at least one other developer knows what's going on in the code.

**Tests:** Test driven development is an approach that proved to be extremely powerful for server-side development. This unfortunately did not work for the Android part.



**Continuous Integration:** By using Continuous Integration we were able to quickly detect and fix issues that were introduced by code rewrites. We think every project should use some form of CI. However, CI is very difficult to do correctly with an Android application.

**Documentation:** It is quite difficult to decide what to document and what not. Large parts of our source code explain themselves, because of the simplicity of the code. However, we think that we should have written more documentation for methods. Also, we found out that it is difficult to write a client for a server when you don't know the architecture of the server. Probably in larger projects, using a tool like [Swagger](http://swagger.io/) could be a good idea.


## Preliminary business model

#### Service Design

SociaLights can be deployed in coffee rooms that makes the room more attractive and playful. The usage of LED lights with this application will be appealing to the users.
This is a user-friendly application that spurs an interaction between  colleagues or co-workers. Our Quiz application requires at least two people to start a game initially.
Hence, it provides a huge opportunity to the users to get to know each other who may not be direct co-workers. In effect, this creates a healthy working environment and makes coffee breaks fun.


#### Technology Design

![Technology Design](/images/MSP.jpg)

Our android client will interface with the nodejs Server via TCP Sockets. The server is used to fetch questions and answers for the quiz game.
Since we use TCP sockets, our service is more efficient in terms of bandwidth.

The feedback of the game is provided by a set of wireless LED Hue light bulbs. Connectivity between the application and the hue light bulbs is provided by the Hue bridge which is an integral part of the Hue system. The bridge also enables remote control of the light bulbs over the Internet. Communication between socialights and the Hue lights is enabled by Hue API.

<div style="page-break-after:always"></div>

#### Organisation Design

![Organisation](/images/organisation.jpg)

The key players are game developers, Hue MNC, Application Users and the Cloud Providers. The game developers create the application and deploy it in the cloud. The Hue MNC provides the necessary API(HUE API) which connects the client application to the Hue LED lights. The Application users can then have an access to the app from the cloud provider. Once the user enters the SociaLights enabled room, he can start playing the quiz game.

#### Finance Design
The game is offered on subscription bases for companies who want to improve communication among their employees. Companies will be charged monthly for each game they subscribe from SociaLight's service. The amount charged varies in the number of employees the company wants to give access, i.e 0-10 employees for the basic subscription and then a bit more fee for more number of employees.


## Grade adjustment

We will not recommend grade adjustments for individual team members.
