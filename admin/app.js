/**
 * Created by tzc on 2017/12/26.
 */

const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const session = require('express-session');
const flash=require("connect-flash");//把信息写在session中的中间件
const MongoStore = require('connect-mongo')(session);
const app=express();
const routes=require("./routes/index");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//中间件自动判断请求体类型，如果是JSON就自己处理，不是就走next
//app.use(bodyParser.json());
//请求体过大
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
//app.use(bodyParser.urlencoded({ extended: false }));
//写：req.flash(type,msg); 读：req.flash(type);
app.use(flash());
// session
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'book',
    key:"admin",
    resave: false,
    saveUninitialized: true,
    cookie: {
        //secure: true,
        maxAge: 2592000000
    },
    store: new MongoStore({
        url: 'mongodb://localhost:27017/book'
    })
}));
app.use("/login",routes.login);
app.use("/book",routes.book);
app.get("*",function (req,res) {
    res. render("index");
});



app.listen(8081,function () {
    console.log("success:8081")
});