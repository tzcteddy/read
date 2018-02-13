/**
 * Created by dell on 2017/12/29.
 */
import { GTE_BOOK_INFO } from "./mutations-type"
export  default {
  [ GTE_BOOK_INFO ](state,{name,picUrl}){
      state.readName=name;
      state.pictureAddress=picUrl;
  },
}
