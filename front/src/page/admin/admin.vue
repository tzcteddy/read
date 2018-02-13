<template>
  <div class="admin-box">
    <div class="admin-content">
      <div class="filer" v-show="isShow">登录失败！</div>
      <div class="admin-title">后台管理</div>
      <form id="form" action="">
        <label for="">用户名称:</label>
        <input type="text" id="username" placeholder="请输入用户名" v-model="admin_name">
        <label for="">密码:</label>
        <input type="password" id="password" placeholder="请输入密码" v-model="password">
        <input class="login-btn" type="button" value="登录" @click="login(admin_name,password)">
      </form>

    </div>
  </div>
</template>
<script>
  import {adminLogin} from "../../service/getData.js";
  export default {
      name:"admin",
    data() {
      return {
          isShow:false,
          admin_name:'',
          password:''
      }
    },
    computed:{

    },
    methods:{
      async login(admin_name,password) {
        await adminLogin(admin_name,password).then(res=>{
            if(res.status){
                this.$router.push({path:"/admin/book/list",query:{type:"all"}})
            }else {
                this.isShow=true;
            }
        })
      }
    }
  }
</script>
<style scoped>
  html, body, .admin-box{
    width: 100%;
    height: 100%;
  }
  .admin-box .admin-content{
    margin: 0 auto;
    padding-top: 100px;
    width: 200px;

  }
  .admin-box .admin-content .admin-title{
    margin-bottom: 0.3rem;
    width: 100%;
    text-align: center;
    font-size: 0.5rem;
    color: #428bca;
  }
  .admin #form{
    width: 100%;
  }
  #form label,#form input{
    display: block;
    margin: 5px 0;
    width: 100%;
    text-align: left;
    font-size: 0.28rem;
  }
  #form input{
    padding-left: 0.05rem;
    height: 0.5rem;
    border-radius: 0.05rem;
    outline: none;
    border: none;
    border: 1px solid #428bca;
    line-height: 0.5rem;
  }
  #form  .login-btn{
    margin-top: 0.3rem;
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    background: #428bca;
    border-radius: 0.05rem;
    overflow: hidden;
    text-align: center;
    font-size: 0.28rem;
    color: #fff;
  }
  .filer{
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    background: #aaa738;
    border-radius: 0.06rem;
    text-align: center;
    border: 0.04rem solid #428bca;
    font-size: 0.28rem;
    color: #fff;
  }
</style>
