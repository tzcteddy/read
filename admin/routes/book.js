/**
 * Created by HiWin10 on 2018/1/24.
 */
const express=require("express");
const path = require("path");
const db=require("../moudel/db");
const formidable = require("formidable");
const fs = require("fs");
const check=require("../check");
let {checkLogin,checkNoLogin}=check;
function sortBookId(book) {
    book.sort(function (book1,book2) {
        var id1=book1.book_id;
        var id2=book2.book_id;
        return -id1+id2;
    })
}
const filterList=function (bookAry) {
    let bookList=[];
    bookAry.forEach(function (item,index) {
        var book={};
        book.book_id=item.book_id;
        book.book_name=item.book_name;
        book.book_pic=item.book_pic;
        book.book_type=item.book_type;
        bookList.push(book);
    })
    return bookList;
}
//const multer=require("multer");
/*const upload=multer({dest:"./public/uploads"});*/
let router=express.Router();
//获取图书列表
router.get("/list",function (req,res) {
    let bookType=req.query.book_type;
    let bookList=[];
    switch(bookType){
        case "all":
            db.Book.find(function (err,doc) {
                if(err){}
                else {
                   bookList=filterList(doc);
                   res.send({status:"1",bookList:bookList})
                }
            });
            break;
        case  "wu":
            db.Book.find({book_type:"武侠"},function (err,doc) {
                if(err){}
                else {
                    bookList=filterList(doc);
                    res.send({status:"1",bookList:bookList})
                }
            });
            break;
        case "history":
            db.Book.find({book_type:"历史"},function (err,doc) {
                if(err){}
                else {
                    bookList=filterList(doc);
                    res.send({status:"1",bookList:bookList})
                }
            });
            break;
        case "prose":
            db.Book.find({book_type:"散文"},function (err,doc) {
                if(err){}
                else {
                    bookList=filterList(doc);
                    res.send({status:"1",bookList:bookList})
                }
            });
            break;
        case "youth":
            db.Book.find({book_type:"青春"},function (err,doc) {
                if(err){}
                else {
                    bookList=filterList(doc);
                    res.send({status:"1",bookList:bookList})
                }
            });
            break;
        case "literature":
            db.Book.find({book_type:"文学"},function (err,doc) {
                if(err){}
                else {
                    bookList=filterList(doc);
                    res.send({status:"1",bookList:bookList})
                }
            });
            break;
        case "abroad":
            db.Book.find({book_type:"国外经典"},function (err,doc) {
                if(err){}
                else {
                    bookList=filterList(doc);
                    res.send({status:"1",bookList:bookList})
                }
            });
            break;
    }
});
//获取图书详情
router.get("/detail",function (req,res) {
    let bookId=req.query.book_id;
    db.Book.findOne({book_id:bookId},function (err,doc) {
        if(err){}
        else {
            let book=doc;
            let bookList=[];
            doc.book_content.forEach(function (item,index) {
                var listObj={};
                listObj.book_list_id=item.book_list_id;
                listObj.book_list_name=item.book_list_name;
                bookList.push(listObj);
            });
            book.book_content=bookList;
            res.send({status:"1",book:book});
        }
    })
});
//获取章节
router.get("/section",function (req,res) {
        let bookId=req.query.book_id;
        let bookListId=req.query.book_list_id;
        db.Book.findOne({book_id:bookId},function (err,doc) {
            if(err){}
            else {
                let bookContent=doc.book_content;
                let section=bookContent.filter(function (item,index) {
                    return item.book_list_id==bookListId;
                });
                res.send({status:"1",section:section[0]})
            }
        })
});
//添加图书
router.post("/add",checkLogin,function (req,res) {
    let book=req.body;
     let book_pic=book.book_pic;
    let type=/^data:image\/(\w+);base64,/.exec(book_pic)[1];
    let baseImg=book_pic.replace(/^data:image\/\w+;base64,/,"");
    let bufferImg=new Buffer(baseImg,"base64");
    let imgUrl=path.join(__dirname,'../public')+"/uploads/"+Date.now()+"."+type;
    fs.writeFile(imgUrl,bufferImg,function (err,data) {
         if(err){
             res.send({msg:"图片上传失败"})
         }
         else {
             book.book_pic=/\/uploads\/\w+\.{1}\w+/.exec(imgUrl)[0];
             db.Book.find({book_name:book.book_name,book_author:book.book_author},function (err,doc) {
                 if(err){}
                 else {
                     if(doc.length>0){
                         res.send({msg:"此书已存在"})
                     }else {//记得添加book_content=[];
                         db.Book.find(function (err,doc) {
                             if(err){}
                             else {
                                 if(doc.length<=0){
                                     book.book_id=1;
                                 }else {
                                     sortBookId(doc);
                                     book.book_id=doc[0].book_id+1;
                                 }
                                 book.book_content=[];
                                 db.Book.create(book,function (err,doc) {
                                     if(err){}
                                     else {//添加成功
                                         res.send({status:"1",msg:"添加成功"})
                                     }
                                 })
                             }
                         });

                     }
                 }
             })
         }
     });
});
//添加章节
router.post("/add/section",checkLogin,function (req,res) {
     let listObj={};
     let bookId=req.body.book_id;//仅供查询
     listObj.book_list_name=req.body.book_list_name;
     db.Book.findOne({book_id:bookId},function (err,doc) {
       if(err){}
       else {
           let book=doc;
           if(book.book_content.length<=0){//还没有目录
               listObj.book_list_id=1;
               book.book_content.push(listObj);
               db.Book.update({book_id:bookId},book,function (err,doc) {
                   if(err){}
                   else {//添加成功
                      res.send({status:"1",msg:"目录添加成功"})
                   }
               })
           }else {//已有目录
               let id=book.book_content[book.book_content.length-1].book_list_id+1;
               listObj.book_list_id=id;
               book.book_content.push(listObj);
               db.Book.update({book_id:bookId},book,function (err,doc) {
                   if(err){}
                   else {//添加成功
                       res.send({status:"1",msg:"目录添加成功"})
                   }
               })
           }

       }
     })
});
//添加内容
router.post("/add/content",checkLogin,function (req,res) {
       let body=req.body;
       let bookId=body.book_id;
       let bookListId=body.book_list_id;
       db.Book.findOne({book_id:bookId},function (err,doc) {//找到对应书籍
           let book=doc;
           let bookContent=book.book_content;
           let newBookContent=bookContent.filter(function (item,index) {//获取对应章节的content
               return item.book_list_id==bookListId;
           });
           body.book_list_content='<p>'+body.book_list_content.replace(/(\n)/g,"</p><p>")+'</p>';
           newBookContent[0].book_list_content=body.book_list_content.replace(/^\n$/g,"<br>");
           db.Book.update({book_id:bookId},book,function (err,doc) {
               if(err){}
               else {//内容添加成功
                    res.send({status:'1',msg:"内容添加成功"})
               }
           })
       })
});
//修改图书
router.post("/update",checkLogin,function (req,res) {
    let book=req.body;
      db.Book.findOne({book_id:book.book_id},function (err,doc) {
         if(err){}
         else {
             if(/data:image/.test(book.book_pic)){//选择了新的图片
                 var picUrl=doc.book_pic;
                 var localImg="./public"+picUrl;//本地图片路径
                 fs.unlink(localImg,function (err,data) {//删除本地图片
                     let book_pic=book.book_pic;
                     let type=/^data:image\/(\w+);base64,/.exec(book_pic)[1];
                     let baseImg=book_pic.replace(/^data:image\/\w+;base64,/,"");
                     let bufferImg=new Buffer(baseImg,"base64");
                     let imgUrl=path.join(__dirname,'../public')+"/uploads/"+Date.now()+"."+type;
                     fs.writeFile(imgUrl,bufferImg,function (err,data) {
                         if(err){
                             res.send({msg:"图片上传失败"})
                         }
                         else {
                             book.book_pic=/\/uploads\/\w+\.{1}\w+/.exec(imgUrl)[0];

                                  book.book_content=doc.book_content;
                                  db.Book.update({book_id:book.book_id},book,function (err,doc) {
                                      if(err){}
                                      else {//修改成功
                                          res.send({status:"1",msg:"修改成功"})
                                      }
                                  })
                         }
                     });
                 })
             }else {
                 book.book_pic=doc.book_pic;
                 book.book_content=doc.book_content;
                 db.Book.update({book_id:book.book_id},book,function (err,doc) {
                     if(err){}
                     else {//添加成功
                         res.send({status:"1",msg:"修改成功"})
                     }
                 })
             }

         }
      })
});
//修改章节
router.post("/update/list",checkLogin,function (req,res) {
    var book_id=req.body.book_id;
    var book_list_id=req.body.book_list_id;
    var book_list_name=req.body.book_list_name;
    db.Book.findOne({book_id:book_id},function (err,doc) {
        if(err){}
        else {
            var book_content=doc.book_content;
            book_content.forEach(function (item,index) {
                if(item.book_list_id==book_list_id){
                    item.book_list_name=book_list_name;
                }
            });
            doc.book_content=book_content;
            db.Book.update({book_id:book_id},doc,function (err,doc) {
                if(err){}
                else {
                    res.send({status:"1",msg:"修改章节成功"})
                }
            })
        }
    })
});
//删除图书
router.post("/delete",checkLogin,function (req,res) {
      let bookId=req.body.book_id;
      db.Book.findOne({book_id:bookId},function (err,doc) {
          if(err){}
          else {
              var picUrl=doc.book_pic;
              var localImg="./public"+picUrl;//本地图片路径
              fs.unlink(localImg,function (err,data) {//删除本地图片
                  db.Book.remove({book_id:bookId},function (err,doc) {
                      if(err){}
                      else {
                          res.send({status:"1",msg:"删除成功"});
                      }
                  })
              })
          }
      });

});
//删除章节
router.post("/delete/list",checkLogin,function (req,res) {
    var book_id=req.body.book_id;
    var book_list_id=req.body.book_list_id;
    db.Book.findOne({book_id:book_id},function (err,doc) {
        if(err){}
        else {
            var book_content=doc.book_content;
            book_content=book_content.filter(function (item,index) {
                return item.book_list_id!==book_list_id;
            });
            doc.book_content=book_content;
            db.Book.update({book_id:book_id},doc,function (err,doc) {
                if(err){}
                else {
                    res.send({status:"1",msg:"删除章节成功"})
                }
            })
        }
    })
});
module.exports=router;