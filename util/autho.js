exports.isAdmin=(req,res,next)=>{
    if(!req.session.admin){
        return res.redirect('/');
    }
    next();
};
exports.isUser=(req,res,next)=>{
    if(!req.session.user){
        return res.redirect('/');
    }
    next();
}