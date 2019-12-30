<template>
	<div class="container">
		<h3 class="title">忘记密码了？</h3>
		<p class="welcome">🔐  那就快速找回吧！</p>
		<div class="columns">
			<el-form ref="form" label-position="top" :rules="rules" :model="user">
        <el-form-item prop="email">
          <el-input v-model="user.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="emailcode" >
          <el-col :span="18">
            <el-input v-model="user.emailcode" placeholder="邮箱验证码"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="info" class="email-code" :disabled="sendDisable" @click="sendEmail()">{{time}}</el-button>
          </el-col>  
        </el-form-item>

        <div class="oparator">
          <el-button class="button" @click="findPassowrd">立即找回</el-button>
        </div>
      </el-form>
    </div>
	</div>
</template>

<script>
	import { sendCode, checkEmailcode, emailIsExist } from '@/apis/foreground'
	export default {
		name: "ForgetPassword",
		components: {
		},
		data() {
      const checkEmail = (rule, value, callback) => {
        console.log(value);
        emailIsExist(value).then(res => {
          const resData = res.data
          console.log(resData)
          if (resData.data !== true) {
            return callback(new Error("邮箱不存在"))
          }
          return callback()
        })
      }

			return {
				time: '点击发送验证码',
        sendDisable: false,
				user: {
					email: '',
					emailcode: ''
				},
        // 校验规则
        rules: {
          email: [
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              { type: 'email', message: '必须是合法的邮箱格式', trigger: 'blur' },
              { validator: checkEmail, trigger: "blur" }
          ],
          emailcode: [
              { required: true, message: '必须填写', trigger: 'blur' }
          ]
        }
			}
		},
		methods: {
			sendEmail() {
        // 当邮箱为空时，错误提醒
				if (this.user.email == '') {
					this.$message.error("请输入邮箱")
				} else {
          this.sendDisable = true
          // 初始时间为60s
          this.time = 60
          this.timer()
          this.emailCode()
				}
      },
      timer() {
        // 定时器每1s，time-1
        let id = setInterval(()=>{
          if (this.time != 0){
            this.time --
            // 将时间存储到localStorage，避免点击其他页面时，计时失效
            localStorage.setItem("time", this.time)
          } else {
            this.time = "发送验证码"
            this.sendDisable = false
            // 计时完成后，localStorage移除time
            localStorage.removeItem("time")
            // 清空定时器
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
      },
      async findPassowrd() {
        const { user } = this
        await checkEmailcode(user).then(res => {
          // 后台成功返回数据
          if (res.data.code === 1) {
            // 保存状态
            this.$router.push({path: `/forgetpsw/${this.user.email}`})
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
	.container {
		width: 100%;
		text-align: center;
		padding-top: 135px;

	}
	.title {
		font-size: 32px;
		margin-bottom: 40px;
	}
	.welcome {
		margin-top: 20px;
		margin-bottom: 35px;
	}
	.button {
		margin-top: 40px;
	}
	.columns {
		width: 600px;
		margin: 0 auto;
		padding-bottom: 150px;
	}
	.email-code {
		margin-left: 10px;
	}
</style>