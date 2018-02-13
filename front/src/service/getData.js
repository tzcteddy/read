/**
 * Created by tzc on 2017/12/23.
 */
import fetch from '../config/fetch'

/**
 * 获取首页默认地址
 */
//登录
export const adminLogin=(admin_name,password)=>fetch('/login/admin',{
   admin:admin_name,
    password:password
},"POST");
//登录后返回用户信息
export const adminInfo=()=>fetch('/login/admin/info');
//退出登录
export const adminOut=(time)=>fetch("/login/admin/out",{
  time:time
});


//获取图书列表     ok
export const getBookList=(book_type)=>fetch('/book/list',{
  book_type:book_type
});
//获取图书详情
export const getBookDetail=(book_id)=>fetch('/book/detail',{
  book_id:book_id,
});
//获取章节内容
export const getBookSection=(book_id,book_list_id)=>fetch('/book/section',{
   book_id:book_id,
    book_list_id:book_list_id
});

//添加图书    ok
export const addBook=(book_name,book_type,book_pic,book_author,book_score)=>fetch("/book/add",{
  book_name:book_name,
  book_type:book_type,
  book_pic:book_pic,
  book_author:book_author,
  book_score:book_score
},"POST");

//添加章节
export const addBookSection=(book_id,book_list_name)=>fetch('/book/add/section',{
  book_id:book_id,
  book_list_name:book_list_name
},"POST");
//添加内容
export const addBookContent=(book_id,book_list_id,book_list_content)=>fetch('/book/add/content',{
  book_id:book_id,
  book_list_id:book_list_id,
  book_list_content:book_list_content
},"POST");
//修改图书
export const upDateBook=(book_id,book_name,book_type,book_pic,book_author,book_score)=>fetch("/book/update",{
  book_id:book_id,
  book_name:book_name,
  book_type:book_type,
  book_pic:book_pic,
  book_author:book_author,
  book_score:book_score
},"POST");
//修改章节
export const upDateBookList=(book_id,book_list_id,book_list_name)=>fetch("/book/update/list",{
  book_id:book_id,
  book_list_id:book_list_id,
  book_list_name:book_list_name
},"POST");
//删除图书   ok
export const deleteBook=(book_id,book_name)=>fetch("/book/delete",{
    book_id:book_id,
    book_name:book_name
},"POST");
//删除章节
export const deleteBookList=(book_id,book_list_id)=>fetch("/book/delete/list",{
  book_id:book_id,
  book_list_id:book_list_id
},"POST");

