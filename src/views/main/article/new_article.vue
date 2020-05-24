<template>
  <div class="main">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="120px"
      class="demo-form"
      v-loading="loading"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="封面链接地址" prop="imageUrl">
        <el-input v-model="form.imageUrl"></el-input>
      </el-form-item>
      <el-form-item label="文章类型" prop="content">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">摄影</el-radio>
          <el-radio :label="2">话题</el-radio>
          <el-radio :label="3">资讯</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div id="editorElem"></div>
      </el-form-item>

      <el-button @click="getContent">get</el-button>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import E from 'wangeditor';  //引入刚npm安装的wangeditor插件
export default {
  name: "newarticle",
  data() {
    return {
      form: {
        userId: window.localStorage.getItem('userId'),
        userName: window.localStorage.getItem('userName'),
        imageUrl: '',
        title: '',
        content: '',
        type: 1
      },
      editorContent: "",
      userId: window.localStorage.getItem('userId'),
      loading: false,
      rules: {
        title: [
          { required: true, message: '请填写文章标题', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '请填写封面链接', trigger: 'blur' },
          { pattern: '[a-zA-z]+://[^\s]*', message: '请填写正确的url', trigger: 'blur' }
        ]
      }
    }
  },

  mounted() {
    var editor = new E('#editorElem')
    editor.customConfig.onchange = (html) => {
      this.form.content = html
    }
    editor.customConfig.height = '500px'
    editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
    editor.create()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add()
        } else {
          return false;
        }
      });
    },
    getContent() {
      console.log(this.form.content)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    add() {
      const url = '/api/part/add_article'
      const params = {
        title: this.form.title,
        content: this.form.content,
        authorId: this.userId,
        type: this.form.type,
        url: this.form.imageUrl
      }
      this.loading = true
      console.log(params)
      this.$axios.post(url, params, {}).then(res => {
        this.$message.success(res.data.msg)
      }).finally(() => {
        this.loading = false
      })
    },

  }
}
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
  position: relative;
  padding-top: 100px;
  .demo-form {
    width: 1000px;
    border: 1px solid black;
    margin: 0 auto;
    padding: 30px 40px 10px 20px;
    background: #ededef;
    border-radius: 5px;
  }
}
#editorElem {
  background: #fff;
  .w-e-text-container {
    height: 500px;
  }
}
</style>