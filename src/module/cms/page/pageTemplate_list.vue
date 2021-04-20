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
      模板名称:
      <el-input v-model="params.templateName" placeholder="请输入内容" clearable style="width: 200px"></el-input>
      <el-button type="primary" size="small" v-on:click="query">查询</el-button>
      <router-link class="mui‐tab‐item" :to="{path:'/cms/pageTemplate/add/',query:{
        page:this.params.page,
        siteId:this.params.siteId,
        templateName:this.params.templateName
      }}">
        <el-button type="primary" size="small">新增模板</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="templateName" label="模板名称" width="120">
      </el-table-column>
      <el-table-column prop="templateParameter" label="模板参数" width="120">
      </el-table-column>
      <el-table-column prop="templateFileId" label="模板文件ID" width="120">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button v-on:click="edit(scope.row.templateId)" type="text" size="small">修改</el-button>
          <el-button v-on:click="del(scope.row.templateId)" type="text" size="small">删除</el-button>
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
          templateName:'',
          page:1,
          size:10
        }
      }
    },
    methods:{
      query:function(){
        // alert('查询')
        //调用服务端的接口
        cmsApi.pageTemplate_list(this.params.page,this.params.size,this.params).then((res)=>{
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
      edit:function (templateId) {
        this.$router.push({
          path: '/cms/pageTemplate/edit/'+templateId,
          query: {
            page: this.params.page,
            siteId:this.params.siteId,
            templateName:this.params.templateName
          }
        })
      },
      del:function (templateId) {
        this.$confirm('确认删除吗？', '提示', {}).then(() => {
          cmsApi.pageTemplate_delete(templateId).then(res=>{
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
      this.params.templateName = this.$route.query.templateName || '';
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
