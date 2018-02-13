/**
 * Created by tzc on 2017/12/26.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Class from '../page/class/class.vue'
import BookDetail from '../page/detail/bookdetail.vue'
import Book from '../page/book/book.vue'
import Admin from '../page/admin/admin.vue'
import AdminClass from '../page/admin/class.vue'
import AdminDetail from '../page/admin/bookdetail.vue'
import AdminBook from "../page/admin/book.vue"


Vue.use(Router);

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      component:Class
    },
    {
      path:"/book",
      component:Class
    },
    {
      path:"/detail",
      component:BookDetail
    },
    {
      path:'/read',
      component:Book
    },
    {
      path:'/admin',
      component:Admin
    },
    {
      path:"/admin/book/list",
      component:AdminClass
    },
    {
      path:"/admin/book/detail",
      component:AdminDetail
    },
    {
      path:"/admin/book/content",
      component:AdminBook
    }

  ]
})
