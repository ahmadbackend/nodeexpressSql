
/**
 * These are example routes for user management
 * This shows how to correctly structure your routes for the project
 */
const express = require("express");
const router = express.Router();
const assert = require('assert');
const path = require('path');
const isAuth=require('../util/autho');

const userController=require('../controllers/user');

//
/**
 * @desc retrieves the current users
 */
/**only loged in users can comment during the session  */
router.post('/add-comment',isAuth.isUser,userController.postAddComment);
/**will not require authintecation here so guest can access the topic to read it 
 * 
 */
//any guest can access topic page to read 
router.post('/topicPage',userController.postTopicSpecificPage)
//contact us page  bla text
router.get('/contact',(req,res)=>{
  res.render('../views/regular-user-view/contactUs',{
    isUser:req.session.user,
    isAdmin:req.session.admin
  })
})

 /////////////////// nothing from the following is used // 
router.get("/get-test-users", (req, res, next) => {

  //Use this pattern to retrieve data
  //NB. it's better NOT to use arrow functions for callbacks with this library
  global.db.all("SELECT * FROM testUsers", function (err, rows) {
    if (err) {
      console.log("passed");
      next(err); //send the error on to the error handler
    } else {
     
      res.json(rows);
    }
  });
  
});

/**
 * @desc retrieves the current user records
 */
router.get("/get-user-records", (req, res, next) => {
  //USE this pattern to retrieve data
  //NB. it's better NOT to use arrow functions for callbacks with this library

  global.db.all("SELECT * FROM testUserRecords", function (err, rows) {
    if (err) {
      next(err); //send the error on to the error handler
    } else {
      res.json(rows);
      console.log(rows);
    }
  });
});

/**
 * @desc Renders the page for creating a user record
 */
router.get("/create-user-record", (req, res) => {
  console.log("reached");
  res.render("../views/create-user-record",{
    isAdmin:req.session.admin,
    isUser:req.session.user
  });
});

/**
 * @desc Add a new user record to the database for user id = 1
 */
router.post("/create-user-record", (req, res, next) => {
  //USE this pattern to update and insert data
  //NB. it's better NOT to use arrow functions for callbacks with this library
  res.send('hello world');
  return;
  const data = generateRandomData(10);
  console.log(data);
  global.db.run(
    "INSERT INTO USERS_RECORD ('test_record_value', 'test_user_id') VALUES( ?, ? );",
    [data, 1],
    function (err) {
      if (err) {
        res.send("different error"); //send the error on to the error handler
      } else {
        //res.send(`New data inserted @ id ${this.lastID}!`);
        res.send('hello world');
      }
    }
  );
});

///////////////////////////////////////////// HELPERS ///////////////////////////////////////////

/**
 * @desc A helper function to generate a random string
 * @returns a random lorem ipsum string
 */
function generateRandomData(numWords = 5) {
  const str =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

  const words = str.split(" ");

  let output = "";

  for (let i = 0; i < numWords; i++) {
    output += choose(words);
    if (i < numWords - 1) {
      output += " ";
    }
  }

  return output;
}

/**
 * @desc choose and return an item from an array
 * @returns the item
 */
function choose(array) {
  assert(Array.isArray(array), "Not an array");
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

module.exports = router;
