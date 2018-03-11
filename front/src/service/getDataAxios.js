/**
 * Created by Administrator on 2018/3/10.
 */
import axios from 'axios';
/**
 * 获取首页默认地址
 */
//登录
export const adminLogin=(admin_name,password)=>axios({
  method:"post",
  url:"/login/admin",
  data:{
    admin:admin_name,
    password:password
  }
});
//登录后返回用户信息
export const adminInfo=()=>axios('/login/admin/info');
//退出登录
export const adminOut=(time)=>axios.get("/login/admin/out",{
 params:{
   time:time
 }
});


//获取图书列表     ok
export const getBookList=(book_type)=>axios('/book/list',{
  params:{
    book_type:book_type
  }
});
//获取图书详情
export const getBookDetail=(book_id)=>axios('/book/detail',{
  params:{
    book_id:book_id
  }
});
//获取章节内容
export const getBookSection=(book_id,book_list_id)=>axios('/book/section',{
  params:{
    book_id:book_id,
    book_list_id:book_list_id
  }
});

//添加图书    ok
export const addBook=(book_name,book_type,book_pic,book_author,book_score)=>axios({
  method:"post",
  url:"/book/add",
  data:{
    book_name:book_name,
    book_type:book_type,
    book_pic:book_pic,
    book_author:book_author,
    book_score:book_score
  }
});

//添加章节
export const addBookSection=(book_id,book_list_name)=>axios({
  method:"post",
  url:"/book/add/section",
  data:{
    book_id:book_id,
    book_list_name:book_list_name
  }
});
//添加内容
export const addBookContent=(book_id,book_list_id,book_list_content)=>axios({
  method:"post",
  url:"/book/add/content",
  data:{
    book_id:book_id,
    book_list_id:book_list_id,
    book_list_content:book_list_content
  }
});
//修改图书
export const upDateBook=(book_id,book_name,book_type,book_pic,book_author,book_score)=>axios({
  method:"post",
  url:"/book/update",
  data:{
    book_id:book_id,
    book_name:book_name,
    book_type:book_type,
    book_pic:book_pic,
    book_author:book_author,
    book_score:book_score
  }
});
//修改章节
export const upDateBookList=(book_id,book_list_id,book_list_name)=>axios({
  method:"post",
  url:"/book/update/list",
  data:{
     book_id:book_id,
     book_list_id:book_list_id,
     book_list_name:book_list_name
  }
});
//删除图书   ok
export const deleteBook=(book_id,book_name)=>axios({
  method:"post",
  url:"/book/delete",
  data:{
    book_id:book_id,
    book_name:book_name
  }
});
//删除章节
export const deleteBookList=(book_id,book_list_id)=>axios({
  method:"post",
  url:"/book/delete/list",
  data:{
    book_id:book_id,
    book_list_id:book_list_id
  }
});

