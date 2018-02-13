<template>
  <div class="detail-page">
    <header>
      <i class="return" @click="backRouter">back</i>
      <h1>{{book_name}}</h1>
    </header>
    <section class="detail-top">
     <!-- <div>{{csStore}}</div>-->
      <div class="introduction">
        <div class="book-img"><img :src="book_pic" alt=""></div>
        <div class="book-detail">
          <p class="book-name">{{book_name}}</p>
          <Star-Score :score="book_score"></Star-Score>
          <p class="book-t book-author">作者：{{book_author}}</p>
          <p class="book-t">字数：23.8万</p>
        </div>
      </div>
    </section>
    <section class="mulu">
      <div class="mulu-box">
        <h2>目录</h2>
        <ul class="mulus">
          <li class="mulu-list" v-if="!list">还没有目录...</li>
          <li class="mulu-list"  v-else="list" v-for="list in bookList" ><router-link :to="{path:'/read',query:{book_list_id:list.book_list_id,book_id:book_id}}">{{list.book_list_name}}</router-link></li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
  import StarScore from "../../components/starscore.vue";
  import {getBookDetail} from "../../service/getData";
  export default {
    name:"bookdetail",
    components:{StarScore},
    data() {
      return {
        list:false,
        book_id:'',
        book_score:"",
        book_name:"",
        book_author:"",
        book_type:"",
        book_pic:"",
        bookList:[],
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
      async getDetailData(){//修改需获取数据回填
        if(this.$route.query){//如果路径存在参数才能获取
          var book_id=this.$route.query.book_id;
          await getBookDetail(book_id).then(res=>{
            if(res.status){
              this.book_id=res.book.book_id;
              this.book_name=res.book.book_name;
              this.book_type=res.book.book_type;
              this.book_pic=res.book.book_pic;
              this.book_author=res.book.book_author;
              this.book_score=res.book.book_score;
              this.bookList=res.book.book_content;
              this.bookList.length>0?this.list=true:this.list=false;
            }
          })
        }
      },
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
    display: inline-block;
    width: 2rem;
    height: 2.8rem;
    vertical-align: top;
  }
  .detail-top .book-img img {
    width: 100%;
    height: 100%;
  }
  .detail-top .introduction .book-detail{
    display: inline-block;
    padding-left: 0.4rem;
    vertical-align: top;
  }
  .detail-top  .book-detail .book-name{
    margin-bottom: 0.2rem;
    font-size: 0.3rem;
  }
  .detail-top  .book-detail .book-t{
    font-size: 0.24rem;
    color: #737373;
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
  .mulu .mulu-list a{display:block;color: #737373}
  .mulu .reading{
    border-color: #428bca;
  }
</style>
