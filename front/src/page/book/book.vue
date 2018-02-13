<template>
   <div class="container">
      <ul>
         <li class="ctn-list" v-for="">
           <h1 class="title">{{book_list_name}}</h1>
           <div class="ctn" v-html="book_list_content"></div>
         </li>
      </ul>
   </div>
</template>


<script>
  import {getBookSection} from "../../service/getData";
export default {
    name:'book',
    data:function () {
      return {
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
    }
  },
  watch:{

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
</style>
