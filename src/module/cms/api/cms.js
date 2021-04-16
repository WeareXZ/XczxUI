import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//页面查询
//axios实现了http方法的封装，vue.js官方不再继续维护vue-resource,推荐使用 axios。
export const page_list = (page,size,params) =>{
  //将Json对象转换成key/value
  let query = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size+"/?"+query);
}

export const page_add = (params) =>{
  return http.requestPost(apiUrl+'/cms/page/add/',params);
}

export const page_findByPageId = (pageId) =>{
  return http.requestQuickGet(apiUrl+'/cms/page/findByPageId/'+pageId);
}

export const page_edit = (params,id) =>{
  return http.requestPut(apiUrl+'/cms/page/edit/'+id,params);
}

export const page_delete = (id) =>{
  return http.requestDelete(apiUrl+'/cms/page/delete/'+id);
}


