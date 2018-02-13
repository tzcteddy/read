<template>
   <div class="container">

         <div class="ctn-list">
           <h1 class="title">{{book_list_name}}</h1>
           <div class="ctn-box"><div class="ctn-text"><textarea type="text" class="ctn"  id="book_content" v-model="book_list_content"></textarea></div></div>
           <div class="operation"><span class="cancel" @click="cancelBtn">取消</span><span class="save" @click="saveFn">保存</span></div>
         </div>

   </div>
</template>
<script>
  import {addBookContent,getBookSection} from "../../service/getData";
export default {
    name:'modify-book',
    data() {
      return {
          book_list_name:"",
         book_list_content:""
      }
    },
 created() {
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
       saveFn(){
         var book_id=this.$route.query.book_id;
         var book_list_id=this.$route.query.book_list_id;
           addBookContent(book_id,book_list_id,this.book_list_content).then(res=>{
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

  }
}
</script>
<style scoped>

  .ctn-list{
    text-align: left;
  }
  .title{
    margin-bottom: 0.5rem;
    height: 0.66rem;
    line-height: 0.66rem;
    background-color: #428bca;
    text-align: center;
    font-size: 0.3rem;
    color: #fff;
  }
  .ctn-box{
    width: 100%;
    padding: 0.2rem;
    box-sizing: border-box;
  }
  .ctn-text{
    width: 100%;
    box-sizing: border-box;
  }
  .ctn{
    margin: auto;
    display: block;
    width: 100%;
    height: 10rem;
    overflow: hidden;
    border-color:#428bca ;
    outline: none;
    font-size: 0.3rem;
    line-height: 0.38rem;
    box-sizing: border-box;
  }
  .operation{
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
  p{
    margin-bottom: 0.2rem;
    line-height: 0.4rem;
    text-indent: 0.6rem;
  }
</style>
