<template>
  <div class="admin-box">
    <div class="admin-content">
      <div class="admin-title">后台管理</div>
      <form id="form" action="">
        <label for="">用户名称:</label>
        <input type="text" id="username" placeholder="请输入用户名">
        <label for="">密码:</label>
        <input type="password" id="password" placeholder="请输入密码">
        <input class="login-btn" type="button" value="登录">
      </form>
    </div>
  </div>
</template>
<script>
  export default {
      name:"admin",
    data:function () {
      return {

      }
    },
    computed:{

    },
    methods:{

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
</style>
