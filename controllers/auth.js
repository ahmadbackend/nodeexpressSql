exports.postLogIn=(req,res)=>{

    const email=req.body.email;
    const pass=req.body.password;
    let storage=[];
    let responses=[];
    ////
    let sql2="SELECT * FROM USERS WHERE USER_EMAIL=?";
    //USER_EMAIL TEXT NOT NULL,USER_PASSWORD  TEXT NOT NULL)");
    //admin user 
    global.db.get(sql2,[email], function (err, row) {
        if (err|| typeof (row)=='undefined') { // no user with matched id so we can insert safely            

            res.send("<h1> hi,either you test wrong password or wrong email try again </h1>");
           //send the error on to the error handler
        }
       
       
         else if(row.USER_EMAIL==email&&row.USER_PASSWORD==pass){
          console.log(row.USER_EMAIL+" "+row.USER_PASSWORD);
                if(row.USER_EMAIL==="ADMIN@ADMIN.COM"){
                  req.session.admin=true;
                  req.session.user=false;

                }
                else {
                req.session.admin=false;
                req.session.user = true;
                
                }
                req.session.email=row.USER_EMAIL;
                console.log(req.session.admin+" why");
          global.db.all("select * from TOPICS", function(err, rows){
      
              rows.forEach(row => {
                  storage.push(row);
              });
              global.db.all("select * from COMMNENT", function(err, coms){
                if(typeof(coms)!='undefined')
               { coms.forEach((row) => {
                    responses.push(row);
                });
              }
              if(req.session.admin==true){
                res.render("../views/admin-views/admin-home",{
                  isAdmin:req.session.admin,
                  isUser:req.session.user,
                  userName:req.session.email,
                  topics:storage,
                  responses:responses
                })
            }
            else{
              res.render("../views/regular-user-view/homepage",{
                isAdmin:req.session.admin,
                isUser:req.session.user,
                userName:req.session.email,
                topics:storage,
                responses:responses
              })}
            });
            ////end of data retrieving 
               
              
            })
         
      
            }
            else{
              res.send("<h1> hi,either you test wrong password or wrong email try again </h1>");

            }
                })
              };
exports.getLogIn=(req,res)=>{
    res.render('../views/auth/login',{
      isAdmin:false,
      isUser:false
    })
};
exports.postReg=(req,res)=>{
    const email=req.body.email;
    //password is treated as object and hash needs a string so i did this +""
    const password=req.body.password;
    
    let sw=`SELECT * FROM USERS WHERE USER_EMAIL=?`;
    global.db.get(sw,[email],function(error,rows){
     
        
        if (typeof(rows)==='undefined') { // no user with matched id so we can insert safely 
          let sq="INSERT INTO USERS (USER_EMAIL,USER_PASSWORD) VALUES(?,?)";
            global.db.run(sq,[email,password],function(err){
              if(err){
                return console.log(err.message);
              }
              /**rendering after ensuring t hat user is added  */
              res.render("../views/auth/login",{
                isAdmin:false,
                isUser:false
              });

            });
            

            }

        else {
            console.log("user already here");
            res.send("<h1>You are already registered with us </h1>");
                }
              });
            };

exports.postLogOut=(req,res)=>{
    let storage= [];
    let responses=[];
    global.db.all("select * from TOPICS", function(err,rows){

      rows.forEach(row=>{
        storage.push(row);
      })
        global.db.all("select * from COMMNENT", function(err,rows){

          rows.forEach(row=>{
            responses.push(row);
          })

              req.session.destroy(err => {
                console.log(err);
                res.render('../views/regular-user-view/homepage',{
                  isAdmin:false,
                  isUser:false,
                topics:storage,
                userName:"",
                  responses:responses
                });
              });
    })
   
    
  })
};
exports.getRigster=(req,res)=>{
    /**if data is in data base error else render login page  */
    res.render('../views/auth/register',{
      isAdmin:false,
      isUser:false
    })
};