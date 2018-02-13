<template>
  <div class="detail-page">
    <header>
      <i class="return" @click="backRouter">back</i>
      <h1>{{book_name}}</h1>
    </header>
    <section class="detail-top">
     <!-- <div>{{csStore}}</div>-->
      <div class="introduction">
        <div class="book-img">
          <img  alt="">
          <div class="file" >
            <input type="file" name="book_pic" id="img-file"  @change="onFileChange">
          </div>
        </div>
        <div class="book-detail">
          <p class="book-t">名称：<input type="text" name="book_name" id="book_name" class="book-name" v-model="book_name" value=""></p>
          <p class="book-t">评分：<input type="text" name="book_score" id="book_score" class="book-score" v-model="book_score"></p>
          <p class="book-t ">作者：<input type="text"name="book_author" class="book-author" id="book_author" v-model="book_author" value=""></p>
          <p class="book-t">分类：<input id="book_type" name="book_type" type="text" v-model="book_type" value=""></p>
        </div>
        <div class="operation">
          <span class="cancel" @click="cancelBtn">取消</span><span class="save" @click="operationBookFn">保存</span>
        </div>
      </div>
    </section>
    <section class="mulu">
      <div class="mulu-box">
        <h2>目录</h2>
        <ul class="mulus">
          <li class="mulu-list" v-if="!list">还没有目录...</li>
          <li class="mulu-list" v-else="list" v-for="list in bookList" >
            <router-link :to="{path:'/admin/book/content',query:{book_list_id:list.book_list_id,book_id:book_id}}">{{list.book_list_name}}</router-link>
            <div class="mulu-oper">
              <span class="mulu-update" @click.stop="muluUpdate(book_id,list.book_list_id,book_list_name)">+</span>
              <span class="mulu-delete" @click.stop="muluDelete(book_id,list.book_list_id)">-</span>
            </div>
          </li>

          <li class="mulu-new" ><p class="label">添加目录：</p><input id="book_list" type="text" v-model="book_list_name" ></li>
          <li class="add-list"><span class="add" :data-id="book_id" @click="addMulu">添加</span></li>
        </ul>

      </div>
    </section>
  </div>
</template>
<script>
  import StarScore from "../../components/starscore.vue";
  import {getBookDetail,addBook,addBookSection,upDateBook,upDateBookList,deleteBookList} from "../../service/getData";
  export default {
    name:"bookdetail",
    components:{StarScore},
    data:function () {
      return {
          list:false,
         book_id:'',
         book_score:0,
         book_name:"",
         book_author:"",
         book_type:"",
         book_pic:"",
         bookList:[1,2],
         book_list_name:"",
      }
    },
    created(){
      this.getDetailData();
    },
    methods:{
        backRouter(){
            this.$router.go(-1);
        },
      //获取详情
       async getDetailData(){//修改需获取数据回填
         if(this.$route.query){//如果路径存在参数才能获取
           var book_id=this.$route.query.book_id;
           await getBookDetail(book_id).then(res=>{
             if(res.status=="1"){
               this.book_id=res.book.book_id;
               this.book_name=res.book.book_name;
               this.book_type=res.book.book_type;
               this.book_pic=res.book.book_pic;
               this.book_author=res.book.book_author;
               this.bookList=res.book.book_content;
               this.book_score=res.book.book_score;
               this.bookList.length>0?this.list=true:this.list=false;
             }
           })
         }
       },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;
        reader.onload = (e) => {
          vm.book_pic = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      //添加或修改图书
        operationBookFn(){
           if(this.$route.query.book_id){//存在id就是修改
               upDateBook(this.$route.query.book_id,this.book_name,this.book_type,this.book_pic,this.book_author,this.book_score).then(res=>{
                 if(res.status=="1"){
                   this.$router.push({path:"/admin/book/list",query:{type:"all"}})
                 }else if(res.status=="000"){
                   this.$router.push({path:"/admin"});
                 }
               })
           }else {//添加
             addBook(this.book_name,this.book_type,this.book_pic,this.book_author,this.book_score).then(res=>{
                 if(res.status=="1"){
                     this.$router.push({path:"/admin/book/list",query:{type:"all"}})
                 }else if(res.status=="000"){
                     this.$router.push({path:"/admin"});
                 }
             })
           }
       },
      //添加目录
      addMulu(){
               if(this.$route.query&&this.$route.query.book_id){//有book_id添加
                 var book_id=this.$route.query.book_id;
                 var book_list_name=this.book_list_name;
                 if(book_list_name!==""){
                   addBookSection(book_id,book_list_name).then(res=>{
                       if(res.status=="1"){
                           window.location.reload();
                       }else if(res.status=="000"){
                         this.$router.push({path:"/admin"});
                       }
                   })
                 }
               }else {//提醒先添加图书，再添加其目录

               }

      },
      //修改目录
      muluUpdate(book_id,book_list_id,book_list_name){
          if(book_list_name.length>0){
            upDateBookList(book_id,book_list_id,book_list_name).then(res=>{
              if(res.status=="1"){
                window.location.reload();
              }else if(res.status=="000"){
                this.$router.push({path:"/admin"});
              }
            })
          }
      },
      //删除目录
      muluDelete(book_id,book_list_id){
          deleteBookList(book_id,book_list_id).then(res=>{
              if(res.status=="1"){
                  window.location.reload();
              }else if(res.status=="000"){
                this.$router.push({path:"/admin"});
              }
          })
      },
      cancelBtn(){
           this.$router.go(-1)
      }
    },
    watch:{
      "$route":"getDetailData"
    }
  }
</script>
<style scoped>
  h1{
    font-size: 0.3rem;
  }
  h2{
    margin-bottom: 0.2rem;
    padding-left: 0.2rem;
    border-left: 0.1rem solid #428bca;
    text-align: left;
    font-size: 0.2rem;
  }
  .detail-page{

  }
  .detail-page header{
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
    position: relative;
    height:0.88rem;
    border-bottom: 1px solid #ccc;
    line-height: 0.88rem;
    text-align: center;
    background: #f4f4f4;
    font-size: 0.22rem;
  }
  .detail-page header .return{
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    padding: 0 0.2rem;
    height: 0.88rem;
    line-height: 0.88rem;
    font-style: normal;

  }
  .detail-top{
    padding: 0 0.3rem;
    text-align: left;
  }
  .detail-top .introduction{
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #428bca;
    font-size: 0;
  }
  .detail-top .introduction .book-img{
    position: relative;
    display: inline-block;
    width: 2rem;
    height: 2.8rem;
    vertical-align: top;
  }
  .detail-top .book-img img {
    width: 100%;
    height: 100%;
  }
  .detail-top .book-img .file{
    position: absolute;
    top: 0;
    left: 0;
    width: 2rem;
    height: 2.8rem;
  }
  .detail-top .book-img .file:after{
    position: absolute;
    top: 50%;
    left: 50%;
    display: inline-block;
    content: '';
    margin: -1px 0 0 -0.4rem;
    width: 0.8rem;
    height: 2px;
    background: #ccc;
  }
  .detail-top .book-img .file:before{
    position: absolute;
    top: 50%;
    left: 50%;
    display: inline-block;
    content: '';
    margin: -0.4rem 0 0 -1px;
    width:2px ;
    height: 0.8rem;
    background: #ccc;
  }
  .detail-top .book-img .file input[type=file]{
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .detail-top .introduction .book-detail{
    display: inline-block;
    padding-left: 0.4rem;
    width: 4.5rem;
    vertical-align: top;
  }
  .detail-top  .book-detail .book-name{
    margin-bottom: 0.2rem;
    font-size: 0.3rem;
  }
  .star{
    margin-bottom: 0.3rem;
  }
  .detail-top  .book-detail .book-t{
    margin-top: 0.2rem;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.24rem;
    color: #737373;
  }
  .detail-top  .book-detail .book-t input[type=text]{
    display: inline-block;
    height: 0.5rem;
  }
  .mulu{
    padding: 0.3rem 0.3rem;
  }
  .mulu .mulu-box{

  }
  .mulu .mulus{
    height: 6rem;
    overflow: auto;
    font-size: 0;
    text-align: center;
  }
  .mulu .mulu-list{
    position: relative;
    display: inline-block;
    width: 80%;
    height: 0.66rem;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
    line-height: 0.66rem;
    text-align: left;
    background: #f4f4f4;
    border: 1px solid #ccc;
    font-size: 0.22rem;
  }
  .mulu .mulu-oper{
    position: absolute;
    top: 0;
    right: 0;
    width: 1.2rem;
    height: 0.66rem;
  }
  .mulu .mulu-oper .mulu-update,  .mulu .mulu-oper .mulu-delete{
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    border-radius: 50%;
    font-size: 0.5rem;
    color: #fff;
    vertical-align: middle;
  }
  .mulu .mulu-oper .mulu-update{
    background: #428bca;
  }
  .mulu .mulu-oper .mulu-delete{
    background: #d43f3a;
  }
  .mulu .mulu-list a{display:block;color: #737373}
  .mulu .reading{
    border-color: #428bca;
  }

  .mulu .mulu-new{
    display: inline-block;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
    width: 80%;
    text-align: left;
  }
  .mulu .mulu-new .label{
    font-size: 0.18rem;
  }
  .mulu .mulu-new input[type=text]{
    display: inline-block;
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    border: 1px solid #ccc;
    outline: none;
    font-size: 0.22rem;
  }
  .mulu .add-list .add{
    display: inline-block;
    width: 1.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    background: #428bca;
    border-radius: 0.06rem;
    font-size: 0.4rem;
    color: #fff;
  }
  .operation{
    margin-top: 0.6rem;
    width:100%;
    height: 0.8rem;
    text-align: center;
  }
  .operation .cancel,.operation .save{
    display: inline-block;
    width: 1.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 0.06rem;
    font-size: 0.4rem;
    color: #fff;
  }
  .operation .cancel{
    margin-right: 0.6rem;
    background: #5e5e5e;
  }
  .operation .save{
    background: #428bca;
  }
</style>
