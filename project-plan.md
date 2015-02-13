---
layout: page
title: Project Plan
permalink: /project-plan/
---

# Introduction

<!-- Give a brief overview of the system to be developed, motivation for its development, the environment where it will be used, and possibly the types of users for the system. -->

In large companies and organisations employees often don't know many of their colleagues except for their direct co-workers. During their breaks, they get a cup of coffee and return to their office. This leaves the coffee rooms empty and unattractive and doesn't lead to any social interaction between co-workers. We plan to build an application that makes these coffee rooms more attractive by enabling employees to interact with the room and with each other in a playful way. This will increase social interaction and collaboration between co-workers.

Our App will provide a quiz-based game that can be played with two teams in the same coffee room, but also between two teams in two separate coffee rooms (on different floors or office locations, for example). Participants will have to collaborate with each other to find the answers to the questions and the lights in the coffee room will provide feedback for the game, inviting other people in the room to also participate.

<!--

Present the stakeholders of the project and list all group members along with their contact information. You may assign roles (such as project manager) to the group members and/or list the relevant interests or skills of the group members.

* Companies / Organisations (Customers)
* Employees (Users)

-->

# Team, Partners and other Stakeholders

### Gayathri Srinivaasan

* [@yesgee](https://github.com/yesgee)
* [gayathri.srinivaasan@aalto.fi](gayathri.srinivaasan@aalto.fi)

### Harika Satharasi

* Primary contact for **Testing**
* [@harikasatharasi](https://github.com/harikasatharasi)
* [harika.satharasi@aalto.fi](harika.satharasi@aalto.fi)

### Hylke Visser

* Project Manager
* Primary contact for **Development**
* [@htdvisser](https://github.com/htdvisser)
* [hylke.visser@aalto.fi](hylke.visser@aalto.fi)

### Jan van de Kerkhof

* Project Manager
* Primary contact for **Reporting**
* [@janvandekerkhof](https://github.com/janvandekerkhof)
* [jan.vandekerkhof@aalto.fi](jan.vandekerkhof@aalto.fi)

### Samuel Balcha

* Primary contact for **Documentation**
* [@samuelbalcha](https://github.com/samuelbalcha)
* [samuel.balcha@gmail.com](samuel.balcha@gmail.com)

### Sowmya Ravidas

* Primary contact for **Design**
* [@sowmyaravidas](https://github.com/sowmyaravidas)
* [sowmya.ravidas@aalto.fi](sowmya.ravidas@aalto.fi)

### Sakari Luukkainen

* Tutor
* [sakari.luukkainen@aalto.fi](sakari.luukkainen@aalto.fi)

### Partner: Philips (not confirmed)

* [meethue.com](http://meethue.com/)

### Partner: Q42

* [q42.com](http://q42.com/)
* The company that builds the software for Philips Hue.

# Goals and scope

> This section describes the goals of the project group and the individual learning goals of the group members. Define the scope of the project. You may also include the business goals of the system, and describe the benefits it provides to different stakeholders, including the users.

## Goals

* Getting people together, getting to know new people
* Encourage social interaction
* Strengthen social foundation of a company
* Collaborative problem solving
* Cool gadget

## Scope

We are going to:

* Build the Mobile App
* Hook into Hue Cloud

# Work practices and tools

> Describe all planned work practices in a concrete but concise way. How the practice is used, what tasks/meetings/materials etc. are needed, who is responsible of what etc. In addition, list all the tools you plan to use, and describe the required development and test environments.



> Possible sub-topics (ask the tutor what are relevant for your project):

> * Time tracking (is some tool used, how often reported, who creates tasks, ...)

* Issue tracker on Github

> * Documenting (documentation tools, document storage and delivery to stakeholders, document authors, document review, ...)

* Inline documentation for code
* Github Pages for meetings, general documentation and reporting

> * Communication (How do you arrange optimal amount of communication and knowledge transfer between all stakeholders?)

* Gitter for team communication (2-daily standups)
* Weekly team meetings
* Email for external communication
* Github Pages for external communication

> * Version control (which version management tool is used, what conventions to follow (check-out/check-in frequency, change log, tagging), which files to manage, ...)

* Git
* Github
* Git Flow

> * Design (How architectural design and lower level design is done? Modeling tools used? Validation?)

Different for each system part:

* Client (Android Application)
* Server
* Hue Cloud
* Hue Bridge
* Hue Lights

> * Quality assurance (quality goals, QA practices, ...)

* Code Reviews
* Continuous Integration and Testing (Travis)

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

# Schedule and resources

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

# System overview

> This chapter is a high level description of the intended solution (= the system). It typically includes

> * a graph (for example a use case diagram) that defines user groups and the main functions of the system
> * short textual description of the system

# Requirements

> Define the functional and non-functional requirements of the system.
