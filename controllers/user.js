exports.postAddComment=(req,res)=>{
    const email=req.session.email.split("@")[0];
    const comment= req.body.comment;
    console.log(email+"email caught");
    const responses=[];
    const topics=[];
    // COMMNENT (TOPIC TEXT  ,USER_EMAIL TEXT NOT NULL,COMMEN  TEXT )");
    console.log(req.body.topicComment+" target topic is that  ");
  let sql=`INSERT INTO COMMNENT (TOPIC , USER_EMAIL,COMMEN) VALUES(?,?,?)`;
    global.db.run(sql,
    [req.body.topicComment,email,comment],function(error){
      if(error) console.log(error.message);
    global.db.all("SELECT * FROM TOPICS", function(error,rows){
        rows.forEach(row=>{
          topics.push(row);
        });
        //TOPIC TEXT  ,USER_EMAIL TEXT NOT NULL,COMMEN  TEXT )
      global.db.all("SELECT * FROM COMMNENT",function(error,rows){
        if(error){console.log (error.message);}
        rows.forEach((row)=>{
          responses.push(row);
        });
        console.log("responses are "+ responses)
        res.render('../views/regular-user-view/homepage',{
          isAdmin:req.session.admin,
          isUser:req.session.user,
          userName:req.session.email,
          topics:topics,
          responses:responses
          //topics:global.topics
        })
      });
    });
     
    })
};
exports.postTopicSpecificPage=(req,res)=>{
  let title= req.body.topicTitle;
  let topic=[];
  let email=req.session.email;

  responses=[]
  global.db.get("SELECT * FROM TOPICS WHERE TITLE=?",title, function(error,row){
 topic=row;
 global.db.all("SELECT * FROM COMMNENT WHERE TOPIC=?",title,function(error,rows){
 responses=rows;
 res.render('../views/regular-user-view/topicPage',{
   topic:topic,
   responses:responses,
   isAdmin:req.session.admin,
   isUser:req.session.user,
   userName:email
 })
 })
  })
 }
 exports.getContact=(req,res)=>{
  res.render('../views/regular-user-view/contactUs')
};