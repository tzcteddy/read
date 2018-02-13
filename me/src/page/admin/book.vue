<template>
   <div class="container">
      <ul>
         <li class="ctn-list" v-for="ctn in content">
           <h1 class="title">{{ctn.name}}</h1>
           <input type="textarea"  id="ctn" v-model="ctn.content">
         </li>
      </ul>
   </div>
</template>


<script>
  import { getBookPart } from "../../service/getData";
  import { getContent } from "../../service/getData";
export default {
    name:'modify-book',
    data:function () {
      return {
          content:null,
        show :true
      }
    },
 created: function () {
    this.initData()
  },
  methods:{
      async initData(){
        var type=this.$route.params.type;
        var params=this.$route.params.name;
          this.content=await getContent(type,params)
        },
      modify(){
          this.show=false;
      }
  },
  watch:{
    "$route":"initData"
  }
}
</script>
<style scoped>

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
  #ctn{
    display: block;
    width: 100%;
    border: none;
    outline: none;
    overflow: hidden;
    box-sizing: border-box;
  }
  #ctn{
    padding: 0.5rem;
    font-size: 0.3rem;
  }
  #ctn{
    display: inline-block;
    height: 6rem;
    line-height: 0.2rem;
  }
  p{
    margin-bottom: 0.2rem;
    line-height: 0.4rem;
    text-indent: 0.6rem;
  }
</style>
