<template>

  <div class="side-bar">
    <div class="side-inner">
       <p class="side-list">{{adminName}}</p>
       <p class="side-list" @click="addBook">添加</p>
      <p class="side-list" @click="logOut">退出</p>
    </div>
  </div>

</template>
<script>
  import {adminInfo,adminOut} from "../service/getData";
export default {
  name:'sidebar',
  data(){
        return {
           adminName:""
        }
  },
  created(){
      this.initData();
  },
  methods:{
       async initData(){
           await adminInfo().then(res=>{
              this.adminName=res.admin;
           })
       },
       logOut(){
           adminOut(Date.now()).then((res)=>{
               if(res.status){this.$router.push({path:"/admin"})}
           });
       },
    addBook(){
           this.$router.push({path:"/admin/book/detail"})
    }
  }
}
</script>
<style scoped>
  .side-bar{
    transition:all 0.5s linear 0s;
    position: fixed;
    left:0 ;
    top: 0;
    width:3rem;
    height: 100%;
    background: #204d74;
    z-index: 1000;
  }
  .side-bar .side-inner{
    width: 100%;
    height: 100%;
    padding: 0.4rem;
    box-sizing: border-box;
  }
  .side-bar .side-list{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: left;
    font-size: 0.28rem;
    color: #fff;
  }

</style>
