---
layout: page
title: Project Plan
permalink: /project-plan/
---

## Introduction

In large companies and organisations employees often don't know many of their colleagues except for their direct co-workers. During their breaks, they get a cup of coffee and return to their office. This leaves the coffee rooms empty and unattractive and doesn't lead to any social interaction between co-workers. We plan to build an application that makes these coffee rooms more attractive by enabling employees to interact with the room and with each other in a playful way. This will increase social interaction and collaboration between co-workers.

Our App will provide a quiz-based game that can be played with two teams in the same coffee room, but also between two teams in two separate coffee rooms (on different floors or office locations, for example). Participants will have to collaborate with each other to find the answers to the questions and the lights in the coffee room will provide feedback for the game, inviting other people in the room to also participate.

## Team, Partners and other Stakeholders

### Gayathri Srinivaasan

[![Gitter](https://img.shields.io/badge/gitter-@yesgee-green.svg?style=flat-square)](https://gitter.im/yesgee)
[![Email](https://img.shields.io/badge/email-gayathri.srinivaasan@aalto.fi-blue.svg?style=flat-square)](mailto:gayathri.srinivaasan@aalto.fi)

### Harika Satharasi

[![Gitter](https://img.shields.io/badge/gitter-@harikasatharasi-green.svg?style=flat-square)](https://gitter.im/harikasatharasi)
[![Email](https://img.shields.io/badge/email-harika.satharasi@aalto.fi-blue.svg?style=flat-square)](mailto:harika.satharasi@aalto.fi)

* Primary contact for **Testing**

### Hylke Visser

[![Gitter](https://img.shields.io/badge/gitter-@htdvisser-green.svg?style=flat-square)](https://gitter.im/htdvisser)
[![Email](https://img.shields.io/badge/email-hylke.visser@aalto.fi-blue.svg?style=flat-square)](mailto:hylke.visser@aalto.fi)

* Project Manager
* Primary contact for **Development**
* Primary contact for **Q42** and **Philips**

### Jan van de Kerkhof

[![Gitter](https://img.shields.io/badge/gitter-@janvandekerkhof-green.svg?style=flat-square)](https://gitter.im/janvandekerkhof)
[![Email](https://img.shields.io/badge/email-jan.vandekerkhof@aalto.fi-blue.svg?style=flat-square)](mailto:jan.vandekerkhof@aalto.fi)

* Project Manager
* Primary contact for **Reporting**
* Primary contact for **Houm.io**

### Samuel Balcha

[![Gitter](https://img.shields.io/badge/gitter-@samuelbalcha-green.svg?style=flat-square)](https://gitter.im/samuelbalcha)
[![Email](https://img.shields.io/badge/email-samuel.balcha@gmail.com-blue.svg?style=flat-square)](mailto:samuel.balcha@gmail.com)

* Primary contact for **Documentation**

### Sowmya Ravidas

[![Gitter](https://img.shields.io/badge/gitter-@sowmyaravidas-green.svg?style=flat-square)](https://gitter.im/sowmyaravidas)
[![Email](https://img.shields.io/badge/email-sowmya.ravidas@aalto.fi-blue.svg?style=flat-square)](mailto:sowmya.ravidas@aalto.fi)

* Primary contact for **Design**

### Sakari Luukkainen

[![Email](https://img.shields.io/badge/email-sakari.luukkainen@aalto.fi-blue.svg?style=flat-square)](mailto:sakari.luukkainen@aalto.fi)

* Tutor

### Partner: Philips (not confirmed)

* [meethue.com](http://meethue.com/)

### Partner: Q42

* [q42.com](http://q42.com/)
* The company that builds the software for Philips Hue.

## Goals and scope

### Goals

The main goal of this project is to build an application that is able to bring colleagues together within a company and make them get to know and understand each other. With *SociaLights*, we strive to enhance social interaction between people and, by doing so, strengthen the social foundation of the companies that adopt *SociaLights*. We believe that a cooperative and playful game in the coffee room will lead to the development of social ties and cooporative skills that contribute to future (collaborative) problem solving capabilities of the company.
Our secondary goal is to make the game, combined with lights, into a *cool* gadget, such that young and vibrant companies will sooner be tempted to acquire the lights and the application.

### Scope

In the project we will limit ourselves to building the mobile game and making it work for deployment in **one coffee room**, with the possibility to expand to multiple rooms later. We will build the mobile (Android) application and a simple cloud-based game server. We will depend on a third party service (Hue Cloud) to communicate with the Hue Lights. In the project we will only implement the quiz game, but keep the possibility to add more game types later.

## Work practices and tools

### Communication

**Gitter:** We use our [chatroom on Gitter](https://gitter.im/mobi-led/mobi-led) to communicate with the team.

**2-Daily standups:** During weeks when a lot of development is done, we plan to use 2-daily standups (either in a short meeting, on Google Hangouts or on Gitter) to keep the team up to date on every member's individual progress.

**Weekly meetings:** We use weekly meetings (every Tuesday) with the entire team. During these meetings we discuss problems we encounter, brainstorm about the project and define the project planning. Summaries of these meetings are posted on our [webpage](https://mobi-led.github.io/mobi-led/).

**External contacts:** For external communication, we can be contacted on our email addresses (see above). We have a primary contact (or responsible team member) for different subjects, so external parties are in contact with the same person every time.

**Webpage:** Our [webpage](https://mobi-led.github.io/mobi-led/) is used to post updates about the project.

### Development

**Github Issues:** Development tasks and bugs will be created on the [Issues system on Github](https://github.com/mobi-led/mobi-led/issues) and assigned to a team member. This team member is responsible for the completion of the task.

**Git and Github:** We use [Git](http://git-scm.com/) for version control. Our repository is hosted on [Github](https://github.com/mobi-led/mobi-led).

**Branching Model:** The [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/) branching model is used, which means that features are built in *feature-branches*, which are merged in the *develop* branch, which should only contain stable code. The *master* branch contains production code and is managed by the *lead developers* only. Different versions of the software are represented as *tags*.

**Commits:** Commits should always have a commit message describing the changes and preferably also mention the related issues. The first line of the commit message should be max. 50 characters, extra information can be added by inserting an empty line after the first line, and Markdown can be used.

**Synchronisation:** Developers should always try to keep their branches up-to-date with the *develop* branch by *rebase*-ing often. When multiple developers are working on the same branch, they are required to coordinate with each other to avoid conflicting changes.

**Tests:** Every piece of code should be sufficiently tested. It is good practice to include both the functional code and the test cases for that source code in a commit.

**Documentation:** Source should contain a sufficient amount of documentation to help other team members understand the code. For our Android source code, we use [JavaDoc](http://www.oracle.com/technetwork/java/javase/documentation/index-137868.html).

**Code Conventions:** Android Source code should conform to the [Android Code Style](http://source.android.com/source/code-style.html).

**Code Reviews:** After completing a feature-branch, the assignee should create a *Pull Request* to the *develop* branch. Another developer is assigned to review this pull request. This developer has to review the source code, run the tests and then merge the feature into the *develop* branch.

**Continuous Integration:** We use [Travis CI](https://travis-ci.org/) to continuously build and test our software.

### Documentation and Reporting

Next to the documentation of the source code, we often write other documentation and reports like this Project Plan. These documents are written using Markdown and posted on our [webpage](https://mobi-led.github.io/mobi-led/). If the document has to be delivered to some of our stakeholders, the document is converted to PDF and emailed to the stakeholders.

### Design

> * Design (How architectural design and lower level design is done? Modeling tools used? Validation?)

Different for each system part:

* Client (Android Application)
* Server
* Hue Cloud
* Hue Bridge
* Hue Lights

### Tools and Environment

> * Tools (Summary of all tools used. Mention version numbers and availability information, if relevant to the project. Description of all development and test environments that are needed; both software and hardware environments.)

**Development Tools**

* Android Studio (1.0.x)
  * Android API Level 21
  * Android v7 Support Library
* Git (2.2.x)
* Atom (Optional)

**Server**

* Node

**External Tools / Services**

* Hue Cloud

## Schedule

> Design an initial schedule for the project. Consider whether you want to split the project into iterations. Allocate 120 hours per each group member for the project (5 credits * 27 hours / credit - 15 hours for lectures, etc. = 120 hours). In addition, consider any material hardware or software resources used in the project.

* **Week 8 (16 Feb)**
  * Get Hue lights
  * Inform about Hue Cloud (Hylke)
* **Week 9 (23 Feb)** - Development setup
  * Android Application Skeleton
  * Server Skeleton
  * CI / Testing
  * Connect and set up Hue Bridge
  * Connect to Hue Cloud
* **Week 10 (2 Mar)**
* **Week 11 (9 Mar)**
* **Week 12 (16 Mar)**
* **Week 13 (23 Mar)**
* **Week 14 (30 Mar)**
* **Week 15 (6 Apr)**
* **Week 16 (13 Apr)**
* **Week 17 (20 Apr)**
* **Week 18 (27 Apr)**
* **Week 19 (4 May)**
  * Project demonstrations
  * Final report

## Resources

* Hue Lights
* Hue Bridge
* Hue Cloud API access
* Server in the Cloud
* Test device

## System overview

The system consists of 3 major components:

* Hue lights & Hue Cloud
* SociaLights Server (Cloud-based)
* SociaLights Android application

When a user enters a coffee room enabled with SociaLights, he can choose to:

* Start a new game and wait for a competing team member
* Join an existing team

It is necessary to have at least two people in the game before it can start. A set of quiz questions is then fetched from the server and each team gets points based on the number of questions answered in a certain amount of time. Each of the two teams is represented by a color with the Hue lights, while the third light is used as a countdown timer for each question.

## Interaction Details

**Scenario 1:**

1. Bob enters the coffee room.
2. Bob's phone shows a notification: *This room is SociaLights-enabled. Play a game?*
3. Bob dismisses the notification, gets coffee and goes back to work.

**Scenario 2:**

1. Alice enters the coffee room.
2. Alice's phone shows a notification: *This room is SociaLights-enabled. Play a game?*
3. Alice pushes the notification.
4. The App shows the available games.
5. Alice chooses "Pub Quiz".
6. The App tells Alice to wait for another team to play against.

**Scenario 3:**

1. Fred enters the coffee room.
2. Fred's phone shows a notification: *This room is SociaLights-enabled. Play "Pub Quiz" with Alice?*
3. Fred pushes the notification.
4. The App starts the game.

**Scenario 4:**

1. Charlie enters the coffee room.
2. Charlie's phone shows a notification: *This room is SociaLights-enabled. Play "Pub Quiz" with Alice and Fred?*
3. Charlie pushes the notification.
4. The App shows the game lobby.
5. Charlie joins Fred's team.
6. The App shows Charlie the game.

**Scenario 5:**

1. The system shows a question.
2. The timing-light is pulsing green.
3. Alice and Fred try to find the right answer.
4. The timing-light is pulsing faster and becomes orange.
5. The timing-light turns red.
6. Neither team gets points for answering the question.

**Scenario 6:**

1. The system shows a question.
2. The timing-light is pulsing green.
3. Alice and Fred try to find the right answer.
4. Alice selects the correct answer.
5. The lights change to her colour, the App shows that this was the correct answer, Alice has won this round.

**Scenario 7:**

1. The system shows a question.
2. The timing-light is pulsing green.
3. Alice and Fred try to find the right answer.
4. Fred selects the wrong answer.
5. The lights change to [...], the App shows the correct answer, Fred has lost this round.

## Technical Details

**Notification when entering the room:** The App recognises a Bluetooth LE Beacon which is deployed in the room and activates the notification. *not in project scope, could be implemented later.*

**Available games list:** The app fetches the list of available games for this particular room from the server and displays them on the screen. *in our project we will only implement one game, with the possibility to add more game types later.*

**Making teams:** The app fetches the game configuration from the server and displays a *lobby* where players can choose their team. *in our project it is only possible to make teams within one coffee room, in future versions it could be possible to play against a team in another coffee room.* It is possible to change teams by pressing a **switch teams** button. When teams are unbalanced, the app shows a warning about this. Each team should have at least one member. If the last member of the team leaves, all other players see the *lobby* and have to change teams.

**Starting the game:**

**Quiz questions and answers:**

**Timing Light:**

**Team Light:**

**Earning points:** Players earn points when their team correctly answers a question. The score is shown in the App and stored on the server.

**End of the game:**

**User accounts:** Upon installation, the app generates a user account. The access key for this account is stored on the phone, the user's information is stored on the server.

## Requirements

### Functional Requirements

Some of the most important functional requirements are listed below.

* The system should send a notification to the user about the availability of the SociaLight game.
* User should be able to see the list of available games while inside the coffee room.
* User should be able to select and start the quiz game.
* User can join to play the game by pressing a button.
* User can leave the game by pressing a button.
* Mobile app should allow user to chose the led color for his team.
* LED lights should show different colors when a correct or wrong answer is submitted.
* LED lights switch off when there is no user playing the game.

### Non-functional Requirements

**Interoperability**

* The supported OS for the mobile app is android. (minimum sdk version should be added).

**Performance**

* The system should identify that a user has entered the room within 1 minute.
* The system should send notification to the user within 1 minute.
* The quiz game should start within 10 seconds after a user hits the play button.

**Usability**

* The mobile app user interface is easy to understand.
* The LED lights are lit in a manner that does not disturb people in the room.

See [Google Docs](https://docs.google.com/spreadsheets/d/1TlKp4EfiT8U_naFl1jRu_1kfopJC-fWiy7DMPm6gAjc/edit#gid=0).
