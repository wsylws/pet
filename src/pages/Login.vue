<template>
	<div class="container">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <div class="title">宠物萌语</div>
		    <p class="desc">愿世间动物不再流浪</p>
		  </div>
		  <el-form ref="form" :rules="rules" :model="user">
				<el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
	      <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="user.pwd"></el-input>
        </el-form-item>
			</el-form>
			<div class="oparator">
          <el-button class="submit" type="primary" @click="submitForm('form')">登陆</el-button>
        </div>
		</el-card>

	</div>
</template>


<script>
  import { login } from '@/apis/foreground'
	export default {
		name: 'Login',
		data() {
      return {
        labelPosition: 'top',
        user: {
          username: '',
          pwd: ''
        },
        rules: {
          username: [
            { require: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 7, message: '长度在3到7个字符之间', trigger: 'blur' }
          ],
          pwd: [
            { require: true, message: '必须填写', trigger: 'blur' }
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
        const { user } = this
        // 发送到后台
        await login(user).then(res => {
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
	  margin-left: 66.66666667%;
	  width: 25%;
	}
	.oparator {
    margin-top: 30px;
    text-align: center;
  }
</style>