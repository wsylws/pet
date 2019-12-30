<template>
	<div class="send-container">
		<el-card class="box-card" shadow="never">
			<div class="send-color">
			<el-input
			  type="textarea"
			  :rows="6"
			  placeholder="秀出你的宠物，做一个爱分享的铲屎官。"
			  v-model="form.textarea">
			</el-input>
			<div class="send-upload">
				<el-upload
				  class="upload-demo"
				  ref='upload'
					:action= domain 
					:http-request = upqiniu
					:before-upload="beforeUpload"
				  list-type="picture-card"
				  :on-preview="handlePictureCardPreview"
				  :on-remove="handleRemove">
				  <i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>
			<span class="send-tip">亲，最多可以上传9张图片~</span>
			<el-button 
				class="send-search" 
				type="primary" 
				icon="el-icon-upload"
				@click="submit"
			>发布</el-button>
			</div>
		</el-card>
		
	</div>
</template>

<script>
	import { sendPetShow } from '@/apis/foreground'
	import { getToken, uploadQiNiu } from '@/apis/upload'
	export default {
		name: 'Send',
		data() {
		  return {
		  	token: {},
				// 七牛云的上传地址
				domain: 'https://upload-z2.qiniup.com',
				// 七牛云空间的外链默认域名
				qiniuaddr: 'pet.wangshiyu.online',
		    dialogImageUrl: '',
        dialogVisible: false,
        form: {
        	textarea: '',
        	imgUrl: ''
        }		  
      }
		},
		methods: {
			submit() {
        if ( this.form.textarea !== '') {
					// 文本框不为空
          const { form } = this
          const { username } = this.$store.getters.getUser
          sendPetShow({...form, username: username}).then(res => {
            if (res.data.code === 1) {
							// 后台成功返回数据
              this.$message.success(res.data.msg)
              this.$parent.getPetShow()
              this.form.textarea = ''
							this.form.imgUrl = ''
							// 清除所有图片
              this.$refs.upload.clearFiles()
              return
            } else 
            this.$message.error(res.data.msg)
          })
          return 
        }
        this.$message.error("内容不能为空噢")
      },
     	handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
	            if (this.form.imgUrl == undefined || this.form.imgUrl == '') {
						    this.form.imgUrl = 'http://' + this.qiniuaddr + '/' + res.data.key
						  } else {
						    this.form.imgUrl += ',' + 'http://' + this.qiniuaddr + '/' + res.data.key
						  }
	        })
	      })
	    },
	    // 验证文件合法性
	    beforeUpload (file) {
	      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
	      const isLt2M = file.size / 1024 / 1024 < 2
	      if (!isJPG) {
	        this.$message.error('上传头像图片只能是 JPG 格式!')
	      }
	      if (!isLt2M) {
	        this.$message.error('上传头像图片大小不能超过 2MB!')
	      }
	      return isJPG && isLt2M
	    }
    }
	}
</script>

<style lang="css" scoped>
	.send-container {
		width: 970px;
		margin: 0 auto;
		padding-top: 20px;
	}
	.send-color {
		background: #fff;
	}
	.send-upload {
		margin-top: 20px;
		width: 928px;
		height: 107px;
		overflow: hidden;
	}
	.send-tip {
		font-size: 12px;
		padding-left: 2px;
		color: #76808e;
	}
	.send-search {
		float: right;
		margin: 0 0 20px 0px;
		background-color: #029789;
		border-color: #029789;
	}
</style>


<style>
	.el-upload--picture-card {
		width: 100px;
    height: 100px;
    line-height: 106px;
	}
	.el-upload-list--picture-card .el-upload-list__item {
		width: 95px;
    height: 95px;
	}
</style>