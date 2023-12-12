const { isUser } = require("../util/autho");

//to get to home page 
exports.getHome=(req,res)=>{
    const responses=[];
    const topics=[];
    const email=req.session.email;
   const admin=req.session.admin;
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
        res.render('../views/admin-views/admin-home',{
          isAdmin:admin,
          isUser:req.session.user,
          userName:email,
          topics:topics,
          responses:responses
   

  })
})
    });
  }
 
// DRAFTS (TITLE TEXT UNIQUE ,INGRE TEXT NOT NULL,PROCEDURES  TEXT, IMAGE TEXT )");
exports.postDraft=(req,res)=>{
  const admin=req.session.admin;
  console.log(req.session);
  const email= req.session.email;
    let sql="INSERT INTO DRAFTS (TITLE ,INGRE,PROCEDURES,IMAGE  ) VALUES(?,?,?,?)";
    global.db.run(sql,
    [req.body.title,req.body.ingre,req.body.content,req.body.image
    ],function(err){
        if(err)console.log(err.message);
        let storage=[];
        let counter=0
    global.db.all("select * from DRAFTS", function(err, rows){
       
            res.render('../views/admin-views/drafts',{
              isAdmin:admin,
              isUser:req.session.user,
              topics:rows,
              userName:email
          })
        });
       

    });
      
        
    };
 //to post a new topic 
exports.postTopic=(req,res)=>{
  const admin=req.session.admin;
    let sql="INSERT INTO TOPICS (TITLE ,INGRE,PROCEDURES,IMAGE  ) VALUES(?,?,?,?)";
    global.db.run(sql,
    [req.body.title,req.body.ingre,req.body.content,req.body.image
    ],function(err){
        if(err)console.log(err.message);
    });
    let storage=[];
    let responses=[];
    global.db.all("select * from TOPICS", function(err, rows){

        if(err) console.log(err.message);
        rows.forEach(row => {
            storage.push(row);
            
        });
        global.db.all("select * from COMMNENT", function(err,rows){

            rows.forEach(row=>{
              responses.push(row);
            });
        console.log(storage);
        res.render('../views/admin-views/admin-home',{
            isAdmin:admin,
            isUser:false,
            topics:storage,
            userName:req.session.email,
            responses:responses
        })
    })

   
});
}
//to access that page to write the topic to be posted 
exports.getNewTopic=(req,res)=>{
  const admin=req.session.admin;
    res.render('../views/admin-views/create-new-topic',{
      isAdmin:admin,
      isUser:req.session.user,
    })
};
//to add comment 
exports.postAddComment=(req,res)=>{
  const admin=req.session.admin;
  console.log(req.session);
    const email=req.session.email.split('@')[0];
    const comment= req.body.comment;
    console.log(email+"email caught");
    const responses=[];
    const topics=[];
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
        res.render('../views/admin-views/admin-home',{
          isAdmin:admin,
          isUser:false,
          userName:req.session.email,
          topics:topics,
          responses:responses
          //topics:global.topics
        })
      });
    });
     
    })
  }
  exports.getCensus=(req,res)=>{
    const admin=req.session.admin;
    let users=0;
    let comments=0;
    let topicComments=[];
    let isDone=false;
    global.db.all("select * from USERS",function(error,rows){
      users=rows.length;
      global.db.all("SELECT * FROM TOPICS",function(error,rowss){
        let counter=0;
        if(rowss.length==0){
           return res.render('../views/admin-views/census',{
            users:users,
            topicComments:0,
            isAdmin:admin,
            isUser:false
          })

        }
        rowss.forEach(row=>{
          
          global.db.all("SELECT * FROM COMMNENT WHERE TOPIC=?",row.TITLE, function(err,rows){
            topicComments.push({row:row.TITLE,length:rows.length});
            /**to overcome call back hell and render only when all comments are loaded */
            counter++;
            if(counter==rowss.length){
            res.render('../views/admin-views/census',{
            users:users,
            topicComments:topicComments,
            isAdmin:admin,
            isUser:false
          })

            };
           
          });
        });
         
      
       
      })
        })
  
      }

  //delete a post with its all related comments 
  exports.postDelete=(req,res)=>{
    const admin=req.session.admin;
    const topics=[];
    const responses=[];
  const postToDelete=req.body.post;
  global.db.run("DELETE FROM TOPICS WHERE TITLE=? ",postToDelete, function(error){
      global.db.all("SELECT * FROM TOPICS",function(error,rows){
  
        rows.forEach(row=>{
          topics.push(row);
        })
        global.db.run("DELETE FROM COMMNENT WHERE TOPIC=?",postToDelete,function(error){
  
          global.db.all("SELECT * FROM COMMNENT", function(error,rows){
            rows.forEach((row)=>{
              responses.push(row);
            })
    
    
            res.render('../views/admin-views/admin-home',{
              topics:topics,
              responses:responses,
              isAdmin:admin,
              isUser:false,
              userName:req.session.email,
    
            })
          })
  
        })
        
      })
  
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
   res.render('../views/admin-views/topicPage',{
     topic:topic,
     responses:responses,
     isAdmin:req.session.admin,
     isUser:req.session.user,
     userName:email
   })
   })
    })
   }
   exports.getDraft=(req,res)=>{
    let drafts=[];
    global.db.all("SELECT * FROM DRAFTS",function(error,rows){
   drafts=rows;
   console.log(drafts+" get drafts method line 25 admin route")
   res.render("../views/admin-views/drafts",{
    topics:drafts,
    isAdmin:true
  
   })
    })
  }
  exports.postDraft=(req,res)=>{
    draft={title:req.body.topicTitle,image:req.body.topicImage,
            ingre:req.body.topicIngre,
            proedures:req.body.topicProcedures
    };
    res.render('../views/admin-views/create-new-topic',{
      draft:draft,
  
      isAdmin:req.session.admin,
  
    })
  };
  exports.getSetting=(req,res)=>{
    res.render("../views/admin-views/setting",{
      isAdmin:req.session.admin,
      isUser:req.session.user
    
     })

  };
  exports.postSetting=(req,res,next)=>{

      global.db.run("INSERT INTO SETTINGS(BLOGTITLE ,AUTHOR, BACKGROUNDIMAGE) VALUES(?,?,?)",
      [req.body.blogTitle,req.body.author,req.body.blogImage],function(error){
        
      })
    
    next()
    };
   