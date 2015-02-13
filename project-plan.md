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

> This section describes the goals of the project group and the individual learning goals of the group members. Define the scope of the project. You may also include the business goals of the system, and describe the benefits it provides to different stakeholders, including the users.

<!-- Goals -->

### Goals

The main goal of this project is to build an application that is able to bring colleagues together within a company and make them get to know and understand each other. With *SociaLights*, we strive to enhance social interaction between people and, by doing so, strengthen the social foundation of the companies that adopt *SociaLights*. We believe that a cooperative and playful game in the coffee room will lead to the development of social ties and cooporative skills that contribute to future (collaborative) problem solving capabilities of the company.
Our secondary goal is to make the game, combined with lights, into a *cool* gadget, such that young and vibrant companies will sooner be tempted to acquire the lights and the application.

### Scope
In the project we will limit ourselves to building the mobile game and making it work for deployment in **one coffee room**. We will only build the mobile (Android) application and we will depend on a third party to hook into the cloud software, which we will not be building (or adjusting) ourselves.  

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



## System overview

> This chapter is a high level description of the intended solution (= the system). It typically includes

> * a graph (for example a use case diagram) that defines user groups and the main functions of the system
> * short textual description of the system

## Requirements

> Define the functional and non-functional requirements of the system.
