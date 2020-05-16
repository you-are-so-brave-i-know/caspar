<template>
  <div class="con">
    <p>当前正在进行第 {{ current + 1 }} 步</p>
    <el-steps :active="current">
      <el-step title="注册" content="请填写基本信息"></el-step>
      <!--<el-step title="验证" content="请输入收到的验证码"></el-step>-->
      <el-step title="完成" content="恭喜你，已完成"></el-step>
    </el-steps>
    <div class="form-con">
      <div class="step1" v-show="current == 0">
        <el-form
          ref="form"
          :model="formValidate"
          label-position="left"
          :rules="ruleValidate"
          label-width="100px"
        >
          <el-form-item label="邮箱" prop="mail">
            <el-input style="width: 300px" v-model="formValidate.mail"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="user">
            <el-input style="width: 300px" v-model="formValidate.user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input style="width: 300px" v-model="formValidate.password"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="header">
            <el-input style="width: 300px" v-model="formValidate.header"></el-input>
          </el-form-item>
          <!-- <Upload action="https://juejin.im/entry/599dad0ff265da248b04d7b8">
            <i-button type="ghost" i="ios-cloud-upload-outline" @click="adduser">上传文件</i-button>
          </Upload>-->
        </el-form>
      </div>
      <div class="step2" v-show="current == 1">
        <div class="finsh-el-step">
          <!-- <i type="checkmark" size="large" color="#3399ff"></i> -->
          <span>恭喜你，已全部完成～</span>
        </div>
      </div>
    </div>
    <el-button type="primary" @click="next">下一步</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 0,
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      formValidate: {
        user: '',
        password: '',
        email: '',
        hedaer: ''
      },
      ruleValidate: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        header: [
          { required: true, message: '请填写头像链接地址', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    next() {
      var email = this.formValidate.mail
      var username = this.formValidate.user
      var password = this.formValidate.password
      var header = this.formValidate.hedaer
      var emailtext = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      var check = emailtext.test(email)
      if (this.current === 0) {
        if (username !== '' & password !== '' & check & header) {
          this.current += 1
        } else {
          this.$message.error('完善信息')
        }
      }
      if (this.current === 1) {
        // 注册用户
        this.$http.post('/api/user/addUser', {
          email: email,
          username: username,
          password: password,
          header: header
        }).then(res => {
          // 注册成功后登录该账户
          if (res.status == 200) {
            this.$http.post('/api/user/signin', {
              email: email,
              password: password
            }, {}).then(ress => {
              if (ress.status === 200) {
                this.$message.success(ress.data.msg)
                this.$router.push({ path: '/home' });
              } else {
                this.$message.error(ress.data.msg)
              }
            })
          }
        }).catch(err => {
          this.$message.error(err.data.msg)
        })
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$message.success('提交成功!')
        } else {
          this.$message.error('表单验证失败!')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.con {
  width: 800px;
  height: 600px;
  margin: 100px auto 0;
  border: 1p;
}

.form-con {
  padding: 30px 0;
}

.code-tip {
  margin: 20px 0;
}

.finsh-el-step {
  text-align: center;
}
</style>
