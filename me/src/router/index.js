import Vue from 'vue'
import Router from 'vue-router'
import Class from '../page/class/class.vue'
import BookDetail from '../page/detail/bookdetail.vue'
import Book from '../page/book/book.vue'
import Admin from '../page/admin/admin.vue'
import ModifyBook from "../page/admin/book.vue"


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component:Class
    },
    {
      path:"/read/:type",
      component:Class
    },
    {
      path:"/detail/:type/:name",
      component:BookDetail
    },
    {
      path:'/book/:type/:name/:partId',
      component:Book
    },
    {
      path:'/admin',
      component:Admin
    },
    {
      path:"/admin/book/:type/:name/:partId",
      component:ModifyBook
    }

  ]
})
