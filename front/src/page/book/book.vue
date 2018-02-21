<template>
   <div class="container">
      <ul @click.stop="showPop">
         <li class="ctn-list" v-for="">
           <h1 class="title">{{book_list_name}}</h1>
           <div class="ctn" v-html="book_list_content"></div>
         </li>
      </ul>
     <div class="pop" v-show="popFlag">
       <div class="page-num">
         <span class="up" @click.stop="jumpPageUp">上一章</span>
         <span class="down" @click.stop="jumpPageDown">下一章</span>
       </div>
     </div>
   </div>
</template>


<script>
  import {getBookSection} from "../../service/getData";
export default {
    name:'book',
    data:function () {
      return {
        popFlag:false,
        book_list_name:"",
        book_list_content:""
      }
    },
 created: function () {
   this.getContent();
  },
  methods:{
    async getContent(){
      var book_id=this.$route.query.book_id;
      var book_list_id=this.$route.query.book_list_id;
      await getBookSection(book_id,book_list_id).then(res=>{
        if(res.status=="1"){
          this.book_list_name=res.section.book_list_name;
          this.book_list_content=res.section.book_list_content?res.section.book_list_content:"还没有内容";
        }
      })
    },
    showPop(){this.popFlag=!this.popFlag},
    jumpPageUp(){
      var query=this.$route.query;
      var _list_id=query.book_list_id<=1?1:parseFloat(query.book_list_id)-1;
      this.$router.push({path:'/read',query:{book_list_id:_list_id,book_id:query.book_id}})
    },
    jumpPageDown(){
      var query=this.$route.query;
      var _list_id=parseFloat(query.book_list_id)+1;
      this.$router.push({path:'/read',query:{book_list_id:_list_id,book_id:query.book_id}})
    }
  },
  watch:{
    "$route":"getContent"
  }
}
</script>
<style >

  .ctn-list{
    text-align: left;
  }
  .title{
    height: 0.66rem;
    line-height: 0.66rem;
    background-color: #428bca;
    text-align: center;
    font-size: 0.3rem;
    color: #fff;
  }
  .ctn{
    padding: 0.5rem;
    font-size: 0.3rem;
  }
  .ctn p{
    margin-bottom: 0.2rem;
    line-height: 0.4rem;
    text-indent: 0.6rem;
  }
  .pop{
    position: fixed;
    left: 0;
    bottom:0;
    width: 100%;
    background: #fefefe;
  }
  .pop .page-num{
    padding: 0.06rem;
    width: 100%;
  }
  .pop .up,.pop .down{
    display: inline-block;
    width: 1.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.3rem;
    color: #fff;
    text-align: center;
    border-radius: 0.06rem;
    background: #428bca;
  }
</style>

