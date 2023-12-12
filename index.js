const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const adminRoot=require('./routes/admin');
const authRoot=require('./routes/auth');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const session=require('express-session');
const home=require('./controllers/openPage')
/** using it as global responses to save myself from 
 * creating a night mare data base hahahah 
 */
global.responses=[];

//to store all users comments on our posts  so it is a global element 






//items in the global namespace are accessible throught out the node application
global.db = new sqlite3.Database('./database.db',function(err){
  if(err){
    console.error(err+"exit here");
    process.exit(1); //Bail out we can't connect to the DB
  }else{
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
    global.db.run("CREATE TABLE IF NOT EXISTS USERS (USER_ID INTEGER PRIMARY KEY AUTOINCREMENT,USER_EMAIL TEXT NOT NULL,USER_PASSWORD  TEXT NOT NULL)");
    //admin user 
    /**create a table to store comments to be displayed */
    global.db.run("CREATE TABLE IF NOT EXISTS DRAFTS (TITLE TEXT UNIQUE ,INGRE TEXT  NULL,PROCEDURES  TEXT, IMAGE TEXT )");
    global.db.run("CREATE TABLE IF NOT EXISTS SETTINGS (BLOGTITLE TEXT  ,AUTHOR TEXT NOT NULL, BACKGROUNDIMAGE TEXT )");
    global.db.run("INSERT INTO  SETTINGS (BLOGTITLE ,AUTHOR, BACKGROUNDIMAGE  ) VALUES('COOKING RECIPE','MIDTERM STUDENT',NULL)");

    global.db.run("CREATE TABLE IF NOT EXISTS TOPICS (TITLE TEXT UNIQUE ,INGRE TEXT NOT NULL,PROCEDURES  TEXT, IMAGE TEXT )");
    console.log("error here 37");
    global.db.run("CREATE TABLE IF NOT EXISTS COMMNENT (TOPIC TEXT  ,USER_EMAIL TEXT NOT NULL,COMMEN  TEXT )");

    console.log("error here 41");

    global.db.run("INSERT INTO USERS(USER_EMAIL,USER_PASSWORD) VALUES('ADMIN@ADMIN.COM','admin')");

    global.db.all("SELECT * FROM USERS",function(error,rows){

      if(error){
        console.log("failed insert");
      }
     else {
        rows.forEach(function(row) {
          if(row.USER_EMAIL!="ADMIN@ADMIN.COM")
          {console.log(row.USER_PASSWORD+" "+row.USER_EMAIL);}
        });
      }
    })
  };
});
//global.db.run("INSERT  INTO COMMENT (TOPIC  ,USER_EMAIL  , COMMEN ) VALUES('test','wh','f')");

global.db.serialize(function () {
   db.all("select name from sqlite_master where type='table'", function (err, table) {
     table.forEach(tab=>{
       console.log(tab);

     })
      
   });
 });

//set the app to use ejs for rendering
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
/**to store session acitvity  like */
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false
})
);


app.use('/admin',adminRoot);
app.use('/auth',authRoot);
app.use('/user',userRoutes);
/*
app.get("/prp",(req,res)=>{
  res.render("../views/create-user-record");
});*/
app.get('/', home.open);

//this adds all the userRoutes to the app under the path /user
//app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
