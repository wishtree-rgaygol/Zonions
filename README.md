# Zonions 
> Server side (Spring boot) fuctionality is explain here!

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Status](#status)
* [Contact](#contact)

## General info
>Short step by infromation about backend functionality

>First checking the server in spring tool suite as this is the entry point to Spring Boot application and runs embedded tomcat.
> Creating the rest API (CREATE, UPDATE, DELETE, DISPLAY, UPLOAD FILE, DISPLAY FILE) in controller with the help of repository and service.

* CREATE API- For storing the restaurant in database.
* UPDATE API- For updating the fields of restaurant class.
* DELETE API- For delete specified restaurant from database.
* DISPLAY API- Showing all the added restaurant and its specific information.
* UPLOAD FILE- For adding the image of menu for that specified restaurant.
* DISPLAY FILE- For showing the added menu.

> Then  registering a CORS bean in controller to allow only the domains which we would like to allow access to our resources, in this case its angular client running at localhost:4200

## Technologies
* Eclipse - version 2020-12 (4.18.0)
* MySQL Workbench - version 8.0.23
* Postman

## Setup
* Install Eclipse IDE for Enterprise Java Developers and MySQL Workbench latest version and check server connection with MySql which is running or not. 
* Install Postman(Latest Version) to check rest api working.
* Run `Server Side Main class` for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change    any of the source files.


## Status
Project is in progress because i try to add some new features and new functionalities.
 
## Contact
Created by [@Ravigaygol](ravigaygol90@gmail.com/) - feel free to contact me!