/**
 * Created by tzc on 2018/1/26.
 */
exports.checkLogin=(req,res,next)=>{
    if(req.session.admin){
        next();
    }else {
        res.send({status:"000",msg:"未登录！"})
    }
};
exports.checkNotLogin=(req,res,next)=>{
    if(req.session.admin){
        res.send({status:"111",msg:"已登录"})
    }else {
        next();
    }
};