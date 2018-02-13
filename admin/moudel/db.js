/**
 * Created by tzc on 2018/1/21.
 */
const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1/book");
let AdminSchema=new mongoose.Schema({
    admin:String,
    password:String
});

let BookSchema=new mongoose.Schema({
    book_id:Number,
    book_name:String,
    book_type:String,
    book_pic:String,
    book_score:Number,
    book_author:String,
    book_content:Array,
});
const Models={
    Admin: mongoose.model('Admin', AdminSchema),
    Book: mongoose.model('Book', BookSchema),
}
module.exports=Models;