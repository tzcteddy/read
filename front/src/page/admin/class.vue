<template>
<div>
    <Feng-Mian v-if="show"></Feng-Mian>
    <div class="wrap" v-show="!show">
      <transition name="side"><Side-Bar v-show="side" ></Side-Bar></transition>
        <header>
            <ul class="nav">
                <li class="nav-list"><router-link :to="{path:'/admin/book/list',query:{type:'all'}}">首页</router-link></li>
                <li class="nav-list"><router-link :to="{path:'/admin/book/list',query:{type:'wu'}}">武侠</router-link></li>
                <li class="nav-list"><router-link :to="{path:'/admin/book/list',query:{type:'history'}}">历史</router-link></li>
                <li class="nav-list"><router-link :to="{path:'/admin/book/list',query:{type:'prose'}}">散文</router-link></li>
                <li class="nav-list"><router-link :to="{path:'/admin/book/list',query:{type:'youth'}}">青春</router-link></li>
                <li class="nav-list"><router-link :to="{path:'/admin/book/list',query:{type:'literature'}}">文学</router-link></li>
                <li class="nav-list"><router-link :to="{path:'/admin/book/list',query:{type:'abroad'}}">国外经典</router-link></li>
            </ul>
        </header>
        <section class="search">
            <div class="search-box">
                <input type="text" name="search" placeholder="笑傲江湖">
                <span class="search-sbm" @click="sideFn">搜索</span>
            </div>
        </section>
      <section class="book">
        <div class="book-box">
          <div class="no-book" v-if="!bookShow">还没有相关书籍</div>
          <ul class="books" v-else="bookShow">
            <li class="book-list" v-for="(book,index) in bookList" @click="clickBookFn(index)">
              <div class="book-img">
                <img :src="book.book_pic" alt="">
                <div class="book-opera" v-show="index==i" @click.stop="clickBookFn(-1)">
                  <span class="book-update" :data-id="book.book_id" @click.stop="updateFn(book.book_id)">修改</span>
                  <span class="book-delete" :data-id="book.book_id" @click.stop="deleteFn(book.book_id)">删除</span>
                </div>
              </div>
              <input class="book-name" v-model="book.book_name">
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import FengMian from "../../components/fengmian.vue";
import SideBar from "../../components/sidebar.vue";
import {getBookList,deleteBook} from "../../service/getData";

export default {
  name: 'adminclass',
  components:{FengMian,SideBar},
  data(){
     return {
       bookShow:false,
       show:false,
       side:false,
       bookList:[],
       list:[1,2,3,4],
       i:-1
     }
  },
  mounted() {
      /*var that=this;
    setTimeout(function () {
         that.show=false
    },2000)*/

  },
  created() {
     this.getBookFn();
  },
  methods:{
      async getBookFn(){
          let book_type=this.$route.query?this.$route.query.type:"all";
          await getBookList(book_type).then(res=>{
              if(res.status=="1"){
                  this.bookList=res.bookList;
                 this.bookList.length>0?this.bookShow=true:this.bookShow=false;
              }
          })
      },
      sideFn(){
          this.side=!this.side;
      },
      clickBookFn(index){
        this.i=index;
      },
      updateFn(book_id){
          this.$router.push({path:"/admin/book/detail",query:{book_id:book_id}})
      },
      deleteFn(book_id){
            deleteBook(book_id).then(res=>{
                if(res.status=="1"){//删除成功，刷新重新获取列表
                     window.location.reload();
                }else if(res.status=="000"){
                  this.$router.push({path:"/admin"});
                }
            })
      }
  },
  watch:{
    "$route":"getBookFn"
  }

}
</script>

<style scoped>
ul{
padding:0
}
header,.search,.book{
 padding: 0 0.2rem;
}
header .nav{
    padding:0.2rem 0;
    text-align:left;
    font-size: 0;

}
header .nav .nav-list{
    display: inline-block;
    margin-bottom:0.2rem;
    width:25%;
    text-align: center;
    font-size: 0.36rem;
}
header .nav a{
    color: #428bca;
}
.search .search-box{
    position: relative;
    height:0.66rem;
    line-height: 0.66rem;
    border-radius: 0.33rem ;
    background: #428bca;
    border: 1px solid #428bca;
    overflow: hidden;
}
.search .search-box input[name='search']{
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 0.2rem;
    width: 80%;
    height: 0.66rem;
    border: none;
    color:#000;
    outline: none;
}
.search .search-box .search-sbm{
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    width: 20%;
    height: 0.66rem;
    line-height: 0.66rem;
    text-align: center;
    font-size:0.4rem;
    color: #fff;
}
.book .book-box{
    padding: 0.3rem 0;
}
.no-book{
  text-align: center;
  font-size: 0.3rem;
}
.book .books{
    text-align:left;
    font-size: 0;
}
.book .book-list{
    display: inline-block;
    padding: 0 0.15rem 0.4rem;
    width: 2rem;
}
.book .book-list .book-img{
    position: relative;
    margin-bottom: 0.2rem ;
    width: 2rem;
    height:2.8rem;
}
.book .book-img img{
    width: 100%;
    height: 100%;
}
.book .book-img .book-opera{
  position: absolute;
  top: 0;
  left: 0px;
  width: 2rem;
  height: 2.8rem;
  line-height: 2.8rem;
  background: rgba(255,255,255,.7);
  text-align: center;
}
.book .book-img .book-opera .book-update,.book .book-img .book-opera .book-delete{
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  border-radius: 50%;
  text-align: center;
  font-size: 0.24rem;
  color: #fff;
}
.book .book-img .book-opera .book-update{
  background: #428bca;
}
.book .book-img .book-opera .book-delete{
  margin-left: 0.2rem;
  background: #d43f3a;
}
.book .book-list .book-name{
  display: block;
    width: 100%;
  border: none;
  outline: none;
    font-size: 0.3rem;
    color: #000;
    text-align: center;
}
.side-enter,.side-leave{
  transition: all 3s linear 0s;
  left:-3rem;
}
.side--enter-active,.side-leave-active{
  transition: all 3s linear 0s;
}
</style>
