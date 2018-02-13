/**
 * Created by Administrator on 2017/12/23.
 */
import fetch from '../config/fetch'

/**
 * 获取首页默认地址
 */

export const getBooks = (type) => fetch('../../src/data/list/'+type+'/list.json', {});
export const getContent = (params1,params2) => fetch('../../src/data/content/'+params1+'/'+params2+'/'+params2+'.json', {});
export const getDetail = (params1,params2) => fetch('../../src/data/detail/'+params1+'/'+params2+'/detail.json', {});
export const getBookPart = (type,name,partId) => fetch('/book/part', {
  type:type,
  params:name,
  partId:partId,
});

