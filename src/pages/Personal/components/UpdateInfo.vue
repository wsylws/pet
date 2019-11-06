<template>
	<div>
		<el-divider class="divider" content-position="left">个人信息修改</el-divider>
		<div>
			<el-container>
		    <el-aside class="aside-left" width="100px">头像</el-aside>
		    <el-main>
		    	<el-upload
					  class="avatar-uploader"
					  ref='upload'
					  :action= domain 
					  :http-request = upqiniu
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="info.avatar" :src="info.avatar" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-main>
		  </el-container>
		  <el-container>
		    <el-aside class="aside-left" width="100px">用户名</el-aside>
		    <el-main>
		    	<el-input
					  placeholder="请输入内容"
					  v-model="info.username"
					  :disabled="true">
					</el-input>
				</el-main>
		  </el-container>
		  <el-container>
		    <el-aside class="aside-left" width="100px">邮箱</el-aside>
		    <el-main>
		    	<el-input v-model="info.email" placeholder="请输入更改的邮箱"></el-input>
				</el-main>
		  </el-container>
			<el-container>
		    <el-aside class="aside-left" width="100px">手机</el-aside>
		    <el-main>
		    	<el-input v-model="info.phone" placeholder="请输入更改的手机号"></el-input>
				</el-main>
		  </el-container>
		  <el-button class="button" type="primary" @click="Update">修改</el-button>
		</div>
	</div>
</template>

<script>
	import { updatePersonal } from '@/apis/foreground'
	import { getToken, uploadQiNiu } from '@/apis/upload'
	export default {
		name: "UpateInfo",
		data() {
      return {
      	token: {},
				// 七牛云的上传地址
				domain: 'https://upload-z2.qiniup.com',
				// 七牛云空间的外链默认域名
				qiniuaddr: 'pet.wangshiyu.online',
				info: {
					avatar: '',
	        username: "",
	        email: "",
	        phone: ""
				}
      }
    },
		mounted: function() {
			this.getInfo()
		},
    methods: {
    	Update() {
    		const { info } = this
    		updatePersonal(info).then(res => {
    			if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.$store.dispatch('saveUser', info)
            this.$router.go(0)
            return
          } else 
          this.$message.error(res.data.msg)
    		})
    	},
      handleAvatarSuccess(res, file) {
        this.info.avatar = URL.createObjectURL(file.raw);
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

      },
      // 上传文件到七牛云
	    upqiniu (req) {
	      console.log(req)
	      const config = {
	        headers: {'Content-Type': 'multipart/form-data'}
	      }
	      let filetype = ''
	      if (req.file.type === 'image/png') {
	        filetype = 'png'
	      } else {
	        filetype = 'jpg'
	      }
	      // 重命名要上传的文件
	      const keyname = 'petadopt-wsy' + new Date() + Math.floor(Math.random() * 100) + '.' + filetype
	      // 从后端获取上传凭证token
	      getToken().then(res => {
	        console.log(res)
	        const formdata = new FormData()
	        formdata.append('file', req.file)
	        formdata.append('token', res.data)
	        formdata.append('key', keyname)
	        // 获取到凭证之后再将文件上传到七牛云空间
	        uploadQiNiu(formdata).then(res => {
						this.info.avatar = 'http://' + this.qiniuaddr + '/' + res.data.key
	        })
	      })
	    },
      getInfo() {
				const { username, avatar, email, phone } = this.$store.getters.getUser
				this.info.avatar = avatar
				this.info.username = username
				this.info.email = email
				this.info.phone = phone
			}
    }
	}
</script>

<style lang="css" scoped>
	.aside-left {
		padding-top: 30px;
		padding-left: 20px;
		color: #666;
		font-size: 14px;
	}
	.avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .button {
  	float: right;
  	margin-right: 20px;
  	margin-top: 20px;
  }
</style>

<style>
	.el-divider__text {
		font-size: 18px;
	}
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    padding: 4px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  
</style>