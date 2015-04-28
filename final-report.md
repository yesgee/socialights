---
layout: page
title: Final Report
permalink: /final-report/
---

## Introduction

In large companies and organisations employees often don't know many of their colleagues except for their direct co-workers. During their breaks, they get a cup of coffee and return to their office. This leaves the coffee rooms empty and unattractive and doesn't lead to any social interaction between co-workers. We have developed an application that makes these coffee rooms more attractive by enabling employees to interact with the room and with each other in a playful way. This increases social interaction and collaboration between co-workers, which are desirable feats within a company.

Our App provides a quiz-based game that interacts with the lights in the coffee room. Participants have to collaborate with each other to find the answers to the questions and the lights in the coffee room provide feedback for the game. This visual stimulation will tempt other people in the room to also participate.

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

> Evaluating the achievement of the project goals. Discuss reasons if some goals were changed/not achieved.

We developed an application that is able to bring colleagues together within a company and make them get to know and understand each other. With *SociaLights*, we strive to enhance social interaction between people and, by doing so, strengthen the social foundation of the companies that adopt *SociaLights*. We believe that a cooperative and playful game in the coffee room will lead to the development of social ties and cooporative skills that contribute to future (collaborative) problem solving capabilities of the company.
We make the game combined with lights, into a *cool* gadget, such that young and vibrant companies will sooner be tempted to acquire the lights and the application. So far, we have build a quiz game and made it work for deployment in **one coffee room**. We have build the mobile (Android) application and a cloud-based game server. We depend on a third party service (Hue Cloud) to communicate with the Hue Lights.

### Acheived Goals 

* We have build a quiz application on android platform that enables user to join a game and play
* A quiz server that  generates the question and sends to the application
* Hue lights are connected to the server and the feedback of the game is provided by the lights. 

### Scope for improvement 

 In the project, we implemented only the quiz game, but we also keep the possibility to add more game types later.
We also limit ourselves to one coffee room and there is scope to make it work between multiple coffee rooms. 

### Other results 
> Discussion of all other project results, not included in the evaluated goals.

### Evaluation of quality of the system

> Evaluation of the quality of the developed system based on achievement of the quality goals, quality metrics, group's opinion etc.
> Known bugs, unfinished features, prospective development ideas.

####Server

The server is implemented in a way that is very scalable. The complete state is stored the MongoDB database and in the Redis cache. This allows us to scale the server-side of the application by simply starting new processes.

The server-side of the application is thoroughly covered with unit tests, as can be seen from the image below. Using the Travis Continuous Integration system, this test suite is ran after every push to github.

![Coverage Report](/images/coverage.png)

####UI

* The User Interface is easy to use and the application guides the user from the start till the end of the game.
* The user is given the freedom to join any of the teams he likes to play with. 
* The user also has the freedom to quit the game at point of time.

Sowmya and Gayathri can add more points

####Android-Server Connectivity 

Samuel and Harika can look into this.

#### Hue lights 
Hylke or Jan can fill up this

### Challenging Technological and Environment Aspects

####Technological Aspects 

* The application gets the questions from the server. 
* To work with Hue lights and establish the connectivity with the server

Everyone can add

> List of all challenging technological and environment related aspects of the project that you want the tutor to consider when he evaluates the project's difficulty.

####Environment Aspects 
* Identifying Coffee rooms and deploying it
* Blinking lights in a manner that does not have a disturbing effect on the user

## Metrics

> Summary of used resources, quality metrics, software size etc. Some analysis of the figures compared to your previous projects or other similar projects.

### Resources

* Hue Lights
* Hue API
* Test Device: Android Phone
* 

#### Quality metrics

* Number of Users the Game can support: 
* No delay in answering the question and feedback from the light 
 
Everyone must look into this


## Work practices and tools

> Experiences of the used practices and tools. Discussion of their suitability to your project. Which were the Top-3 or Top-X useful and useless ones?

**Gitter:** Gitter is a great communication tool. Integrations with other tools make it a good place to get an overview of what's going on.

**2-Daily standups:** This did not really work, as we had enough time to spread the work and update each other in our weekly meetings.

**Weekly meetings:** Our weekly meetings were very useful. Sometimes we needed only 15 minutes to bring every team member up to date on the progress, but other times we spent more than an hour to make decisions about the future direction.

**Webpage:** It was nice to have a place where we could upload notes from our meetings, for future reference.

**Taiga:** In a small project like this, using project management tools leads to unnecessary overhead, which is why we abandoned Taiga already in an early stage.

**Git and Github:** Git and Github are extremely powerful tools for team projects.

**Branching Model:** The server-side of the application was developed using the Git-flow branching model. This allowed multiple team members to work separately on different parts of the server, without interfering too much with each other. This model unfortunately did not work for the Android part.

> Android team should talk about this.

**Code Reviews:** The branching model used in server-side development made it extremely easy to do code reviews. This makes sure that at least one pair of fresh eyes has seen the code, and that at least one other developer knows what's going on in the code.

**Tests:** Test driven development is an approach that proved to be extremely powerful for server-side development. This unfortunately did not work for the Android part.

> Android team should talk about this.

**Continuous Integration:** By using Continuous Integration we were able to quickly detect and fix issues that were introduced by code rewrites. We think every project should use some form of CI. However, CI is very difficult to do correctly with an Android application.

**Documentation:** It is quite difficult to decide what to document and what not. Large parts of our source code explain themselves, because of the simplicity of the code. However, we think that we should have written more documentation for methods. Also, we found out that it is difficult to write a client for a server when you don't know the architecture of the server. Probably in larger projects, using a tool like [Swagger](http://swagger.io/) could be a good idea.


## Preliminary business model

> A short (1-2 pages) business model design based on the STOF framework. A description of STOF can be found from here: https://noppa.aalto.fi/noppa/kurssi/t-109.4300/luennot/T-109_4300_slides_3.pdf. Include a hypothetical deployment plan as well into this section (i.e., how you would launch your application).

#### Service Design

SociaLights can be deployed in coffee rooms that makes the room more attractive and playful. The usage of led lights with this application will be appealing to the users. 
This is an user-friendly application that spur an interaction between the colleagues or co-workers. Our Quiz application requires atleast two people to start a game initially. 
 Hence, it provides a huge oppurtunity to the users to know each other who may not be direct co-workers. Inturn, this creates a healthy working environment and relieves the work stress. 


#### Technology Design

![Technology Design](/images/MSP.jpg)

Our android client will interface with the nodejs Server via TCP Sockets. The server is used to fetch questions and answers for the quiz game. 
Since we use TCP sockets, our service is more efficient in terms of bandwidth. 

The feedback of the game is provided by a set of wireless LED Hue light bulbs. Connectivity between the application and the hue light bulbs is provided by the Hue bridge which is an integral part of the Hue system. The bridge also enables remote control of the light bulbs over the Internet. Communication between socialights and the Hue lights is enabled by Hue API. 


#### Organisation Design

![Organisation](/images/organisation.jpg)

#### Finance Design

Sowmya and Harika will work on this. 


## Grade adjustment

> At the end of the project each group member can evaluate each other's contribution, and propose personal increases and decreases of one grade (the sum of these must be zero). We recommend the group to have an open discussion within the group about the evaluations and make a combined proposal of changes either in this section or separately to the tutor. If this is not possible, each member can confidentially send their proposal to the tutor. Based on the proposal the course personnel may tune the personal grades by one. If all group members would get grade 5 without raises, proposed deductions are neglected. In addition, proposed grade changes won’t cause anyone to fail the course if the group’s grade was 1 or pass the course if the group’s grade was 0. Even if the group does not want to tune the grades, it is recommended that the group members internally give feedback to the other members of their success in their role: what was good, what good have been done better.
