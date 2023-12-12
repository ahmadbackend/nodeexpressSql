exports.open=(req, res) => {
    let storage=[];
    //to get the last modification 
    //   SETTINGS (BLOGTITLE TEXT  ,AUTHOR TEXT NOT NULL, BACKGROUNDIMAGE TEXT )");
    global.db.all("SELECT * FROM  SETTINGS",function(error,rows){
      global.package=rows[rows.length-1];
      /*{BLOGTITLE:rows[rows.length].BLOGTITLE,
        AUTHOR:rows[rows.length-1].AUTHOR
       };*/
       global.db.all("SELECT * FROM TOPICS",function(error,rows){

        rows.forEach(row => {
          storage.push(row);            
      });
      /**bring comments when topics are ready  */
      global.db.all("SELECT * FROM COMMNENT",function(error,coms){
        if(error)console.log(error.message);
        coms.forEach((com)=>{
          responses.push(com);
        })
  
     
     /**render after topics and comments are ready  */
      res.render('../views/regular-user-view/homepage',{
        path:'../views/regular-user-view/homepage',
        isAdmin:req.session.admin,
        isUser:req.session.user,
        userName:"",
        package:global.package,
        topics:storage,
        responses:responses
      });
    });


       })
  });
    };
     
  