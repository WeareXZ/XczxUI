<template>
  <div>
    <!--编写页面静态部分，即view部分-->
    <el-form :model="params">
      <el-select v-model="params.siteId"  placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名:
      <el-input v-model="params.pageAliase" placeholder="请输入内容" clearable style="width: 200px"></el-input>
      页面名称:
      <el-input v-model="params.pageName" placeholder="请输入内容" clearable style="width: 200px"></el-input>
      <el-radio-group v-model="params.pageType">
        <el-radio class="radio" label="0">静态</el-radio>
        <el-radio class="radio" label="1">动态</el-radio>
      </el-radio-group>
      <el-button type="primary" size="small" v-on:click="query">查询</el-button>
      <router-link class="mui‐tab‐item" :to="{path:'/cms/page/add/',query:{
        page:this.params.page,
        siteId:this.params.siteId,
        pageAliase:this.params.pageAliase,
        pageName:this.params.pageName
      }}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column prop="dataUrl" label="数据路径" width="250">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button v-on:click="edit(scope.row.pageId)" type="text" size="small" align="left">修改</el-button>
          <el-button v-on:click="del(scope.row.pageId)" type="text" size="small" align="left">删除</el-button>
          <el-button v-on:click="review(scope.row.pageId)" type="text" size="small" align="left">页面预览</el-button>
          <el-button v-on:click="post(scope.row.pageId)" type="text" size="small" align="left">页面发布</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      v-on:current-change="changePage"
      style="float:right">
    </el-pagination>
  </div>
</template>
<script>
  /*编写页面静态部分，即model及vm部分。*/
  import * as cmsApi from '../api/cms'
  export default {
    data() {
      return {
        siteList:[],//站点列表
        list: [],
        total:0,
        params:{
          siteId:'',
          pageAliase:'',
          page:1,
          size:10
        }
      }
    },
    methods:{
      query:function(){
        // alert('查询')
        //调用服务端的接口
        cmsApi.page_list(this.params.page,this.params.size,this.params).then((res)=>{
          //将res结果数据赋值给数据模型对象
          console.log(res)
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })

      },
      changePage:function(page){//形参就是当前页码
        //调用query方法
        // alert(page)
        this.params.page = page;
        this.query()
        ////初始化站点列表
      },
      review:function (pageId) {
          window.open("http://www.xuechengzaixian.com/cms/preview/"+pageId)
      },
      edit:function (pageId) {
        this.$router.push({
          path: '/cms/page/edit/'+pageId,
          query: {
            page: this.params.page,
            siteId:this.params.siteId,
            pageAliase:this.params.pageAliase,
            pageName:this.params.pageName,
          }
        })
      },
      del:function (pageId) {
        this.$confirm('确认删除吗？', '提示', {}).then(() => {
          cmsApi.page_delete(pageId).then(res=>{
            if(res.success){
              this.$message({
                message:'删除成功',
                type:'true'
              })
              this.query()
            }else {
              this.$message({
                message:'删除失败',
                type:'false'
              })
            }
          })
        })
      },
      post:function(pageId){
        this.$confirm('确认发布吗？', '提示', {}).then(() => {
          cmsApi.page_post(pageId).then(res => {
              if(res.success){
                this.$message({
                  message:'发布成功',
                  type:'true'
                })
              }else {
                this.$message({
                  message:'发布失败',
                  type:'true'
                })
              }
          })
        })
      },
      dateFormat: function (row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        var moment = require("moment");
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    //mounted()方法是DOM元素渲染生成完成后调用
    //created()方法是vue实例已创建但是DOM元素还没有渲染生成
    mounted(){
      //当DOM元素渲染完成后调用query
      this.query()
      this.siteList = [
        {
          siteId: '5a751fab6abb5044e0d19ea1',
          siteName: '门户主站'
        },
        {
          siteId: '102',
          siteName: '测试站'
        }
      ]
    },
    //返回回显
    created(){
      //从路由上获取参数
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteId = this.$route.query.siteId || '';
      this.params.pageAliase = this.$route.query.pageAliase || '';
      this.params.pageName = this.$route.query.pageName || '';
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
