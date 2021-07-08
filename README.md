# UIC FullStack Academy Final Project

## ------- [REMOVE ALL CAPITALIZED LINES BEFORE LAUNCH ] -------------

## Project Decription
- This is a functional example of an ecomerce website for this example we choice to work with Beanie Babies.
   
- This project was brought to up by the team of:(??ADD GIT PROFILES??)
    - Katherine Baron 
    - Mikaela Farran 
    - Patrick Phillips 
    - Riley Marshall

- A working example of the website is available here : https://clovergraceshopper.herokuapp.com/

- In this project we have included the following featues:
  - JSON WebTokens
  - Bcrypt
  - Login/Register/Logout
  - A database to store user information and production information
  - An API router to connect the front-end and the back-end 
  - An editable shopping cart

## Setup
- The instructions that follow are available if you would like to test this project out in your local environment.

- Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  Github and clone it to your local machine)

- Now you will have to add the fs-app-template as a remote and merge it into your own repository.



```
IF WE ARE KEEPING THIS WE NEED TO EDIT THE WEBSITE AND MAKE THE ORG PUBLIC
git remote add gs-uic-template https://github.com/FullstackAcademy/gs-uic-template.git
git fetch gs-uic-template
git merge gs-uic-template/main
git branch -m master main
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

- Update project name and description in `package.json`
- `npm install`
- Create a postgres databases `grace-shopper`:

```
createdb grace-shopper
```

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:react will start just the react code by itself
- start:server will start your server by itself

Windows users might have to use the solo commands to get it working :/
