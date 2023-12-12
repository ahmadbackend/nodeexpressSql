const path = require('path');
const adminControl=require('../controllers/admin')
const isAuth=require('../util/autho');
const express = require('express');
//const adminController = require('../controllers/admin');
/**
 */
const router = express.Router();
const home=require('../controllers/openPage');

//router.get('/home',adminControl.getHome);
router.post('/added-topic',isAuth.isAdmin,adminControl.postTopic);
router.get('/create-new-topic',isAuth.isAdmin,adminControl.getNewTopic)
/**
 * posting comment duplicated method shared with user rout 
*/
//this method to allow admin to reply and interact with users
router.post('/add-comment',isAuth.isAdmin,adminControl.postAddComment);
//to enter census page  and see how many users , comments per topic
router.get('/census',isAuth.isAdmin,adminControl.getCensus)
//to move to home page
router.get('/homepage',isAuth.isAdmin,adminControl.getHome);
//delete topic with its all recorded comments
router.post('/delete',isAuth.isAdmin,adminControl.postDelete);
//to move to specific topic page 
router.post('/topicPage',isAuth.isAdmin,adminControl.postTopicSpecificPage)
//to push his draft to drafts table 
router.post('/saveDraft',isAuth.isAdmin,adminControl.postDraft);
//to accessing draft writing page
router.get('/drafts',adminControl.getDraft);
router.post('/editDraft',isAuth.isAdmin,adminControl.postDraft);
//to enter setting to change blog name and author name 
router.get('/setting',isAuth.isAdmin,adminControl.getSetting);
/** defect 
 * when you kill the server it restart with first inserted title and name
 * i can keep storing every change in blog and author  name and then catch the last one
 * but this will create redundency  that is why i clear the previous table content every time 
 * that details are changed 
 */
router.post('/setting',isAuth.isAdmin,adminControl.postSetting,home.open);
module.exports = router;

