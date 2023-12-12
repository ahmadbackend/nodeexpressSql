module.exports=class topic{

   
    //saving new topic
     save(title, ingre,procedures,image){
        global.db.run("INSERT INTO TOPICS (TITLE   ,INGRE  ,PROCEDURES  , IMAGE  ) VALUES(?,?,?,?)",
        [title,ingre,
            procedures,image],function(err){
                if(err){
                    console.log(err.message);
                }
            });

    }
    //deleting topic 
     delete(title){
 global.db.run("DELETE FROM TOPICS WHERE TITLE=?",title, function(error){
    if(error){
        console.log(error.message);
    }
 })
    }
 findOne(title){
    let row=[];
    global.db.get("SELECT* FROM TOPICS WHERE TITLE=?",title, function(err,row){
        if(err){
            console.log(err.message);
        }
        row= row;
    })
    return row;
}
static returnAllTopics(){
 let rows=[];
 global.db.get("SELECT* FROM TOPICS", function(err,row){
    if(err){
        console.log(err.message);
    }
    rows= row;
})
return rows;
    
}
}