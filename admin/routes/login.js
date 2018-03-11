/**
 * Created by tzc on 2018/1/23.
 */
const express=require("express");
const db=require("../moudel/db");
const check=require("../check");
let {checkLogin,checkNoLogin}=check;
let router=express.Router();
//登录
router.post("/admin",function (req,res) {
    let adminInfo=req.body;
    db.Admin.findOne(adminInfo,function (err,doc) {
       if(err){
           res.send(JSON.stringify({status:"0",msg:"没有此账号"}))
       }else {
           if(doc){
               req.session.admin=doc;
               res.send(JSON.stringify({status:"1",msg:"登录成功"}))
           }else{
               res.send(JSON.stringify({status:"0",msg:"没有此账号"}))
           }
       }
   })
});
//根据admin获取用户信息返回
router.get("/admin/info",function (req,res) {
    if(req.session&&req.session.admin){
         res.send(JSON.stringify({admin:req.session.admin.admin}))
     }
});
router.get("/admin/out",function (req,res) {
    req.session.admin=null;
    res.send(JSON.stringify({status:"1",msg:"账号已退出"}))
});
module.exports=router;