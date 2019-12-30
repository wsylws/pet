<template>
	<div class="container">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <div class="title">宠物萌语</div>
		    <p class="desc">愿世间动物不再流浪</p>
		  </div>
		  <el-form ref="form" :rules="rules" :model="user" label-width="80px" hide-required-asterisk>
				<el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.pwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="imageCode">
          <el-col :span="13">
            <el-input v-model="user.imageCode" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="11">
            <validate-code class="code" ref="validate-code" @change="code => user.validateCode = code"></validate-code>
          </el-col>
        </el-form-item>
			</el-form>
			<div class="oparator">
        <el-button class="submit" type="primary" @click="submitForm('form')">登陆</el-button>
      </div>
      <router-link to="/forgetpsw" tag="div" class="forget">
        <a>忘记密码？</a>
      </router-link>
		</el-card>

	</div>
</template>


<script>
  import { login } from '@/apis/foreground'
  import ValidateCode from '@/components/ValidateCode'
	export default {
		name: 'Login',
    components: { 
      ValidateCode
    },
		data() {
      const validate = (rule, value, callback) => {
        if (value.toUpperCase() !== this.user.validateCode) {
          callback(new Error('验证码输入错误，请重新输入'))
        }
        callback()
      }

      return {
        labelPosition: 'top',
        user: {
          username: '',
          pwd: '',
          imageCode: '',
          validateCode: '',
        },
        rules: {
          username: [
            { require: true, message: '请输入用户名', trigger: 'blur' }
          ],
          pwd: [
            { require: true, message: '必须填写', trigger: 'blur' }
          ],
          imageCode: [
            { required: true, message: '请输入验证码', trigger: 'blur'},
            { validator: validate, trigger: 'blur' }
          ]
        }
      } 
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login()
          } else {
            this.$message.error('错了哦，您填写的信息有错误，请按照提示修改。')
            return false;
          }
        })
      },
      async login() {
        // 获取表单数据
        const { username, pwd } = this.user
        console.log(this.user)
        // 发送到后台
        await login({username: username, pwd: pwd}).then(res => {
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
      }
    }
	}
</script>
<style lang="css" scoped>
	.container {
		background-image: url(../images/banner-login.jpg);
		height: 588px;
    width: 80%;
    margin: 0 auto;
		background-repeat: no-repeat;
		background-position: top center;
		padding-top: 70px;

	}
	.text {
    font-size: 14px;
  }

	.item {
	  margin-bottom: 18px;
	}
	.title {
		text-align: center;
		font-size: 32px;
	}
	.desc {
		font-weight: 300;
    color: #999;
    text-align: center;
    margin-top: 5px;
	}
	.clearfix:before,
	.clearfix:after {
	  display: table;
	  content: "";
	}
	.clearfix:after {
	  clear: both
	}

	.box-card {
	  margin-left: 60%;
    margin-right: 20px;
    padding-bottom: 20px;
	}
	.oparator {
    margin-top: 30px;
    text-align: center;
  }
  .code{
    /* padding-left: 20px; */
    cursor: pointer;
  }
  .forget a{
    color: rgb(46, 130, 255);
    margin-left: 20px;
    display: inline-block;
    margin-top: 12px;
    font-size: 12px;
  }
  .el-form-item {
    margin-bottom: 10px!important;
    padding-bottom: 10px;
    border-bottom: 0px;
	}
</style>

<style>
  .el-card__body {
    padding-bottom: 0px;
  }

</style>