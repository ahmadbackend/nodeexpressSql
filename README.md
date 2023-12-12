this is a midterm project to practice [node express, ejs, databases]
I uploaded it after the end of the semester and intend to further improve it  by following:-
1)better usage of promises and callbacks (recommended from the marker)
2)improving authentication and encryption
3) restructure ERD to make it a production-level project
4) replacing sqlite with MySQL
5) improving the horrible styling that i have 
6) adding a subscription list
7)improve the writing area of the blogger to make  rich text (fonts, styling...etc)
8)catching and recording how many visitors
9)adding time stamps for publishing date and last editing
10)enable the owner(me) to block malicious and inappropriate  visitors (their IP address)

#### Help with node SQLite3 ####

A few aspects SQLite3 work a little differently to mySql but all of the key concepts are the same

Find the API documentation at:
https://github.com/TryGhost/node-sqlite3/wiki/API

Find node SQLite tutorials at:
https://www.sqlitetutorial.net/sqlite-nodejs/
This also a good resource to find examples and tutorials around SQLite queries


#### Using this template ####

This template sets you off in the right direction for your coursework. To get started:

Run ```npm run build-db``` to create the database (database.db)
Run ```npm run start``` to start serving the web app (Access via http://localhost:3000)

You can also run: 
```npm run clean-db``` to delete the database before rebuilding it for a fresh start



Make sure that your package.json file includes all of the dependencies for your project NB. you need to use the ```--save``` tag each time you use npm to install a dependency

#### Getting started with my project ####

Edit this section to include any settings that should be adjusted in configuration files and concise instructions for how to access the reader and author pages once the app is running.

NB. we will ONLY run ```npm install```, ```npm run build-db```, and ```npm run start``` . We will NOT install additional packages to run your code and will NOT run additional build scripts. Be careful with any additional node dependencies that you use.
