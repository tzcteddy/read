/**
 * Created by dell on 2017/12/29.
 */
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./action";
Vue.use(Vuex);
const state={
  pictureAddress:"",//书封面的地址
  readName:""//所读图书的名字
}

export default  new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
