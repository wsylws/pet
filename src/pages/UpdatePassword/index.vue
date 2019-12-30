<template>
	<div class="container">
		<h3 class="title">重设密码</h3>
		<p class="welcome">🔐  重新设置您的密码吧！</p>
		<div class="columns">
			<el-form ref="form" label-position="top" :rules="rules" :model="user">
        <el-form-item prop="pwd">
          <el-input type="password" v-model="user.pwd" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="cpwd">
          <el-input type="password" v-model="user.cpwd" placeholder="确认密码"></el-input>
        </el-form-item>

        <div class="oparator">
          <el-button class="button" @click="submit">提交</el-button>
        </div>
      </el-form>
    </div>
	</div>
</template>

<script>
	import { sendCode, updatePassword } from '@/apis/foreground'
	export default {
		name: "UpdatePassword",
		components: {
		},
		data() {
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

			return {
				user: {
					pwd: '',
					cpwd: ''
				},
        // 校验规则
        rules: {
          pwd: [
              { required: true, message: '必须填写', trigger: 'blur' },
              { validator: validatePass, trigger: 'blur' }
          ],
          cpwd: [
              { required: true, message: '必须填写', trigger: 'blur' },
              { validator: validatePass2, trigger: 'blur' }
          ],
        }
			}
		},
		methods: {
			async submit() {
				const email = this.$route.params.email
				await updatePassword({pwd: this.user.pwd, email: email}).then(res => {
					// 后台成功返回数据
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.$router.push({path: '/login'})
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
		padding-top: 125px;

	}
	.title {
		font-size: 32px;
		margin-bottom: 40px;
	}
	.welcome {
		margin-top: 10px;
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