<template>
<div>
    <Feng-Mian v-if="show"></Feng-Mian>
    <div class="wrap" v-show="!show">
        <header>
            <ul class="nav">
                <li class="nav-list"><router-link :to="{path:'/book',query:{type:'all'}}">首页</router-link></li>
                <li class="nav-list"><router-link :to="{path:'/book',query:{type:'wu'}}">武侠</router-link></li>
                <li class="nav-list"><router-link :to="{path:'/book',query:{type:'history'}}">历史</router-link></li>
                <li class="nav-list"><router-link :to="{path:'/book',query:{type:'prose'}}">散文</router-link></li>
                <li class="nav-list"><router-link :to="{path:'/book',query:{type:'youth'}}">青春</router-link></li>
                <li class="nav-list"><router-link :to="{path:'/book',query:{type:'literature'}}">文学</router-link></li>
                <li class="nav-list"><router-link :to="{path:'/book',query:{type:'abroad'}}">国外经典</router-link></li>
            </ul>
        </header>
        <section class="search">
            <div class="search-box">
                <input type="text" name="search" placeholder="笑傲江湖">
                <span class="search-sbm">搜索</span>
            </div>
        </section>
      <section class="book">
        <div class="book-box">
          <div class="no-book" v-if="!bookShow">还没有相关书籍</div>
          <ul class="books" v-else="bookShow">
            <li class="book-list" v-for="book in bookList" ><router-link :to="{path:'/detail',query:{book_id:book.book_id}}">
              <div class="book-img"><img :src="book.book_pic"  alt=""></div>
              <div class="book-name">{{book.book_name}}</div>
            </router-link></li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import FengMian from "../../components/fengmian.vue";
import {getBookList} from "../../service/getData";
export default {
  name: 'class',
  components:{FengMian},
  data(){
     return {
       show:false,
       bookList:[],
       list:[1,2,3,4],
       bookShow:false

     }
  },
  mounted() {
      var that=this;
    setTimeout(function () {
         that.show=false
    },2000)
  },
  created () {
    this.getBookFn();
  },
  methods:{
    async getBookFn(){
      let book_type=this.$route.query?this.$route.query.type:"all";
      await getBookList(book_type).then(res=>{
        if(res.status){
          this.bookList=res.bookList;
          this.bookList.length>0?this.bookShow=true:this.bookShow=false;
        }
      })
    },
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
.no-book{
  text-align: center;
  font-size: 0.3rem;
}
.book .book-box{
    padding: 0.3rem 0;
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
    margin-bottom: 0.2rem   ;
    width: 2rem;
    height:2.8rem;
}
.book .book-img img{
    width: 100%;
    height: 100%;
}
.book .book-list .book-name{
    width: 100%;
    font-size: 0.3rem;
    color: #000;
    text-align: center;
}
</style>
