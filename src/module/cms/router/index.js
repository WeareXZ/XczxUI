import Home from '@/module/home/page/home.vue';
import page_list from '@/module/cms/page/page_list.vue';
import page_add from '@/module/cms/page/page_add.vue';
import page_edit from '@/module/cms/page/page_edit.vue';
import pageTemplate_list from '@/module/cms/page/pageTemplate_list.vue';
import pageTemplate_add from '@/module/cms/page/pageTemplate_add.vue';
import pageTemplate_edit from '@/module/cms/page/pageTemplate_edit.vue';

export default [{
    path: '/',
    component: Home,
    name: 'CMS',//菜单名称
    hidden: false,
    children:[
      {path:'/cms/page/list',name:'页面列表',component: page_list,hidden:false},
      {path:'/cms/page/add',name:'新增页面',component: page_add,hidden:true},
      {path:'/cms/page/edit/:pageId',name:'修改页面',component: page_edit,hidden:true},
      {path:'/cms/pageTemplate/list',name:'模板列表',component: pageTemplate_list,hidden:false},
      {path:'/cms/pageTemplate/add',name:'新增模板',component: pageTemplate_add,hidden:true},
      {path:'/cms/pageTemplate/edit/:templateId',name:'修改模板',component: pageTemplate_edit,hidden:true},
    ]
  }
]
