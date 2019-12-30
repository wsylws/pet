<template>
  <div class="container">
        <div class="form-panel">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <div class="title">欢迎加入宠物萌语</div>
            </div>
            <el-form ref="form" label-position="top" :rules="rules" :model="user">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="邮箱验证码" prop="emailCode" >
                  <el-col :span="17">
                    <el-input v-model="user.emailCode" placeholder="请输入验证码"></el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="info" class="email-code" :disabled="sendDisable" @click="sendEmail()">{{time}}</el-button>
                  </el-col>
                    
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="user.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                  <el-input type="password" v-model="user.pwd" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="cpwd">
                  <el-input type="password" v-model="user.cpwd" placeholder="请输入确认密码"></el-input>
                </el-form-item>
                <div class="oparator">
                  <el-button class="submit" type="primary" @click="submitForm('form')">提交</el-button>
                </div>
            </el-form>
          </el-card>
        </div>
  </div>
</template>

<script>
  import { register,sendCode, userIsExist, emailIsExist } from '@/apis/foreground'
  export default {
      name: 'Register',
      data() {
          const checkUsername = (rule, value, callback) => {
            userIsExist(value).then(res => {
              const resData = res.data
              console.log(resData)
              if (resData.data === true) {
                return callback(new Error("用户名已存在"))
              }
              return callback()
            })
          }

          const checkEmail = (rule, value, callback) => {
            console.log(value);
            emailIsExist(value).then(res => {
              const resData = res.data
              console.log(resData)
              if (resData.data === true) {
                return callback(new Error("邮箱已存在"))
              }
              return callback()
            })
          }

          const validatePass = (rule, value, callback) => {
              if (value === '') {
                  callback(new Error('请输入密码'))
              } else {
                  if (this.user.cpwd !== '' ) {
                      this.$refs.form.validateField('cpwd')
                  }
                  callback()
              }
          }

          const validatePass2 = (rule, value, callback) => {
              if ( value === '' ) {
                  callback(new Error('请再次输入密码'))
              }  else if (value !== this.user.pwd) {
                  callback(new Error('两次输入密码不一致'))
              } else {
                  callback()
              }
          }

          const validatePhone = (rule, value, callback) => {
            if(!(/^1[34578]\d{9}$/.test(value))){ 
              callback(new Error("手机号码有误，请重填"))
              return 
            } 
            callback()
          }

          return {
              labelPosition: 'top',
              time: '点击发送验证码',
              sendDisable: false,
              user: {
                  username: '',
                  email: '',
                  emailCode: '',
                  phone: '',
                  pwd: '',
                  cpwd: '',
              },
              // 校验规则
              rules: {
                  username: [
                      { required: true, message: '请输入用户名', trigger: 'blur' },
                      { validator: checkUsername, trigger: "blur" }
                  ],
                  email: [
                      { required: true, message: '请输入邮箱', trigger: 'blur' },
                      { type: 'email', message: '必须是合法的邮箱格式', trigger: 'blur' },
                      { validator: checkEmail, trigger: "blur" }
                  ],
                  phone: [
                      { required: true, message: '请输入手机号', trigger: 'blur' },
                      { validator: validatePhone, trigger: 'blur' }
                  ],
                  pwd: [
                      { required: true, message: '必须填写', trigger: 'blur' },
                      { validator: validatePass, trigger: 'blur' }
                  ],
                  cpwd: [
                      { required: true, message: '必须填写', trigger: 'blur' },
                      { validator: validatePass2, trigger: 'blur' }
                  ],
                  emailCode: [
                      { required: true, message: '必须填写', trigger: 'blur' }
                  ]
              }
          }
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.register()
            } else {
              this.$message.error('错了哦，您填写的信息有错误，请按照提示修改。')
              return false;
            }
          });
        },
        async register() {
          // 获取表单数据
          const { user } = this
          // 发送到后台
          await register(user).then(res => {
            console.log(res);
            // 后台成功返回数据
            if (res.data.code === 1) {
              // 保存状态
              this.$store.dispatch('saveUser', res.data.data)
              this.$message.success(res.data.msg)
              this.$router.push({path: '/'})
              this.$router.go(0)
              return
            }
            // 失败提示
            this.$message.error(res.data.msg)
          })
        },
        sendEmail() {
          if (this.user.email == '') {
            this.$message.error("请输入邮箱")
          } else {
            this.sendDisable = true
            this.time = 60
            this.timer()
            this.emailCode()
          }
        },
        timer() {
          let id = setInterval(()=>{
            if (this.time != 0){
              this.time --
              localStorage.setItem("time", this.time)
            } else {
              this.time = "发送验证码"
              this.sendDisable = false
              localStorage.removeItem("time")
              clearInterval(id)
            }
          },1000)
        },
        async emailCode() {
          // 发送到后台
          await sendCode({email: this.user.email}).then(res => {
            if (res.data.code === 1) {
              this.$message.success(res.data.msg)
              return
            }
            // 失败提示
            this.$message.error(res.data.msg)
          })
        }
      }
  }
</script>

<style lang="css" scoped>
.container{
  background: #fafafa;
  width: 100%;
  margin: 0 auto;
}
.form-panel {
  padding-top: 40px;
  padding-bottom: 40px;
}
.box-card {
  padding: 20px;
  margin: 0 auto;
  width: 80%;
}
.title {
    text-align: center;
    font-size: 32px;
  }

.form-panel{
  width: 50%;
  margin: 0 auto;
}

.oparator{
  margin-top: 30px;
  text-align: center;
}
.email-code {
  margin-left: 20px;
}
.el-card__body {
  padding: 0px;
}

</style>