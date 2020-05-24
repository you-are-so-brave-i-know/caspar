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
            <!-- <el-input type="textarea" style="width: 300px" v-model="formValidate.header"></el-input> -->
            <el-upload
              ref="upload"
              name="head"
              class="avatar-uploader"
              action="/api/user/uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :auto-upload="true"
              :multiple="false"
              :limit="1"
            >
              <img v-if="formValidate.img" :src="formValidate.img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
      formValidate: {
        user: '',
        password: '',
        email: '',
        header: '',
        img: ''
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.current += 1
        } else {
          this.$message.error('完善信息')
          return false;
        }
      });
      if (this.current === 1) {
        // 注册用户
        this.$http.post('/api/user/addUser', {
          email: this.formValidate.mail,
          username: this.formValidate.user,
          password: this.formValidate.password,
          header: this.formValidate.hedaer
        }).then(res => {
          // 注册成功后登录该账户
          if (res.status == 200) {
            this.$http.post('/api/user/signin', {
              email: this.formValidate.mail,
              password: this.formValidate.password,
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
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$message.success('提交成功!')
        } else {
          this.$message.error('表单验证失败!')
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.$message(res.msg)
      this.formValidate.header = res.data.path
      this.formValidate.img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {

      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 178px;
  height: 178px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: #409eff;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
