<template>
<div>
    <Feng-Mian v-if="show"></Feng-Mian>
    <div class="wrap" v-show="!show">
        <header>
            <ul class="nav">
                <li class="nav-list"><router-link to="/read/index">首页</router-link></li>
                <li class="nav-list"><router-link to="/read/wu">武侠</router-link></li>
                <li class="nav-list"><router-link to="/read/history">历史</router-link></li>
                <li class="nav-list"><router-link to="/read/prose">散文</router-link></li>
                <li class="nav-list"><router-link to="/read/youth">青春</router-link></li>
                <li class="nav-list"><router-link to="/read/literature">文学</router-link></li>
                <li class="nav-list"><router-link to="/read/abroad">国外经典</router-link></li>
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
          <ul class="books">
            <li class="book-list" v-for="(book,index) in books" ><router-link :to="{path:book.detailUrl}">
              <div class="book-img"><img :src="book.picUrl" alt=""></div>
              <div class="book-name">{{book.name}}</div>
            </router-link></li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import FengMian from "../../components/fengmian.vue";
import {getBooks} from "../../service/getData.js";
import {mapMutations} from "vuex";
export default {
  name: 'class',
  components:{FengMian},
  data:function(){
     return {
       show:true,
       books:null,
       type:null

     }
  },
  mounted:function () {
      var that=this;
    setTimeout(function () {
         that.show=false
    },2000)
  },
  created:function () {
    this.booksData();
    this.testStore();

  },
  methods:{
    ...mapMutations(["GET_BOOK_INFO"]),
    async booksData (){
      var type=this.$route.params.type?this.$route.params.type:"index";
      this.books= await  getBooks(type);
    },
    async testStore(){
      var type=this.$route.params.type?this.$route.params.type:"index";
      var refa= await getBooks(type);
      this.GET_BOOK_INFO(refa[0])
    }
  },
  watch:{
      "$route":"booksData"
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
