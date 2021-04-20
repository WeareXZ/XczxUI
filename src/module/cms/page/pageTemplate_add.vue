<template>
  <div>
    <!--编写页面静态部分，即view部分-->
    <el-form :model="pageForm" label-width="80px" :rules="pageFormRules" ref="pageForm">
      <el-form-item prop="siteId" label="所属站点">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="templateName" label="模板名称">
        <el-input v-model="pageForm.templateName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="模板参数" prop="templateParameter">
        <el-input v-model="pageForm.templateParameter" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="模板文件ID" prop="templateFileId">
        <el-input v-model="pageForm.templateFileId" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog‐footer">
      <el-button type="plain" @click="go_back" class="">返回</el-button>
      <el-button type="primary" @click="addSubmit">提交</el-button>
    </div>
  </div>
</template>
<script>
  /*编写页面静态部分，即model及vm部分。*/
  import * as cmsApi from '../api/cms'

  export default {
    data() {
      return {
        siteList: [],//站点列表
        templateList: [],//模板列表
        pageForm: {
          siteId: '',
          templateFileId: '',
          templateParameter: '',
          templateName: ''
        },
        pageFormRules: {
          siteId: [
            {
              required: true,
              message: '请选择站点',
              trigger: 'blur'
            }
          ],
          templateName: [
            {
              required: true,
              message: '请输入模板名称',
              trigger: 'blur'
            }
          ],
          templateFileId: [
            {
              required: true,
              message: '请输入模板文件ID',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      addSubmit: function () {
        this.$refs['pageForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              cmsApi.pageTemplate_add(this.pageForm).then((res) => {
                if (res.success) {
                  this.$message({
                      message: '提交成功',
                      type: 'success'
                    }
                  )
                  //清空表单
                  this.$refs['pageForm'].resetFields();
                } else if(res.message){
                  this.$message.error(res.message);
                }else {
                  this.$message({
                    message: '提交失败',
                    type: 'false'
                  })
                }
              })
            })
          } else {
            this.$message({
                message: '校验失败',
                type: 'false'
              }
            )
            return false;
          }
        })
      },
      go_back: function () {
        this.$router.push({
          path: '/cms/pageTemplate/list',
          query: {
            page: this.$route.query.page,
            siteId: this.$route.query.siteId,
            pageName:this.$route.query.templateName
          }
        })
      }
    },
    //mounted()方法是DOM元素渲染生成完成后调用
    //created()方法是vue实例已创建但是DOM元素还没有渲染生成
    mounted() {
      //站点列表
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
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
