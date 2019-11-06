<template>
	<div class="container">
		<div class="container-color">
			<div class="box">
				<div class="box-header">
					<h1>请输入宠物的信息 信息越完整，送出率越高</h1>
					<h2>我们提倡免费或者小偿领养送养宠物，严禁宠物买卖</h2>
				</div>
				<div class="box-body">
					<el-form :model="form" ref="ruleForm" label-width="100px" hide-required-asterisk :rules="rules" class="form">
						<el-form-item label="标题" prop="title">
							<el-input v-model="form.title"></el-input>
						</el-form-item>
						<el-form-item label="宠物介绍" prop="petdesc">
							<el-input type="textarea" v-model="form.petdesc"></el-input>
						</el-form-item>
						<div class="petsInfo">
							<el-form-item label="宠物信息">
								<div class="desc-box">
									<span class="label">
										品种
										<el-select v-model="form.breed" placeholder="请选择">
										  <el-option
										    v-for="item in breedOptions"
										    :key="item.breed_name"
										    :label="item.breed_name"
										    :value="item.breed_name">
										  </el-option>
										</el-select>
									</span>

									<span class="label">
										性别
										<el-select v-model="form.sex" placeholder="请选择">
										  <el-option
										    v-for="item in sexOptions"
										    :key="item.value"
										    :label="item.label"
										    :value="item.value">
										  </el-option>
										</el-select>
									</span>
								</div>
								<div class="desc-box">
									<span class="label">
										免费
										<el-select v-model="form.free" placeholder="请选择">
										  <el-option
										    v-for="item in freeOptions"
										    :key="item.value"
										    :label="item.label"
										    :value="item.value">
										  </el-option>
										</el-select>
									</span>
									<span class="label">
										价格
										<el-input-number v-model="form.money" controls-position="right" :min="0" :max="10000"></el-input-number>
									</span>
								</div>
								<div class="desc-box">
									<span class="label">
										年龄
										<el-input-number v-model="form.age" controls-position="right" :min="1" :max="100"></el-input-number>
									</span>
								</div>
							</el-form-item>
						</div>
						<el-form-item label="身体状况" prop="bodyInfo">
							<el-checkbox v-model="form.quchong" label="驱虫" border></el-checkbox>
	    				<el-checkbox v-model="form.mianyi" label="免疫" border></el-checkbox>
	    				<el-checkbox v-model="form.jueyu" label="绝育" border></el-checkbox>
						</el-form-item>
						<el-form-item label="所在城市" prop="city">
							<div class="city-select">
								<el-cascader
							      size="large"
							      :options="cityOptions"
							      v-model="city"
							      @change="handleChange"
							      >
							    </el-cascader>
							</div>
						</el-form-item>
						<el-form-item class="contactMode" label="联系人方式" prop="contactMode">
							<div>
								<el-input placeholder="请输入姓名" v-model="form.contactname" >
								  <template slot="prepend">送养人</template>
								</el-input>
							</div>
							<div>
								<el-input placeholder="联系方式三选一" v-model="form.telephone">
								  <template slot="prepend">手机号</template>
								</el-input>
							</div>
							<div>
								<el-input placeholder="联系方式三选一" v-model="form.wechat">
								  <template slot="prepend">微信号</template>
								</el-input>
							</div>
							<div>
								<el-input placeholder="联系方式三选一" v-model="form.qqnumber">
								  <template slot="prepend">QQ号</template>
								</el-input>
							</div>
						</el-form-item>
						<el-form-item label="宠物靓照" prop="petsPhoto">
							<el-upload
							  class="upload-demo"
							  drag
							  :action= domain 
							  :http-request = upqiniu
					      :before-upload="beforeUpload"
							  multiple>
							  <i class="el-icon-upload"></i>
							  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb，可以上传多张图片</div>
							</el-upload>
						</el-form-item>
						<el-row class="button-box">
						  <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
						</el-row>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { regionDataPlus, CodeToText } from 'element-china-area-data'
	import { getToken, uploadQiNiu } from '@/apis/upload'
	import { sendPets, retrieveBreed } from '../../apis/foreground'
	export default {
		name :'SendPets',
		data() {
			const validatePass = (rule, value, callback) => {
        if (this.form.contactname === '') {
        	callback(new Error('请输入送养人姓名'))
        } else {
        	if (this.form.telephone == '' && this.form.wechat == '' && this.form.qqnumber == '') {
        		callback(new Error('联系方式至少写一个'))
        	}
        	callback()
        }
      }

      const validatePass2 = (rule, value, callback) => {
        if (this.form.imageUrl === '') {
        	callback(new Error('请上传图片'))
        } else {
        	callback()
        }
      }

			return {
				token: {},
				// 七牛云的上传地址
				domain: 'https://upload-z2.qiniup.com',
				// 七牛云空间的外链默认域名
				qiniuaddr: 'pet.wangshiyu.online',
				cityOptions: regionDataPlus,
				city: '',
				form: {
					title: '',
					petdesc: '',
					age: 1,
					money: 0,
					quchong: false,
					mianyi: false,
					jueyu: false,
					contactname: '',
					telephone: '',
					wechat: '',
					qqnumber: '',
					sex: 0,
					free: 0,
					breed: '',
					province: '',
					county: '',
					city: '',
					imageUrl: '',
				},
				breedOptions: [],
		    sexOptions: 
		    [{
		    	value: 0,
		    	label: '性别不详',
		    }, {
		    	value: 1,
		    	label: '公'
		    }, {
		    	value: 2,
		    	label: '母'
		    }],
		    freeOptions: 
		    [{
		    	value: 0,
		    	label: '免费'
		    }, {
		    	value: 1,
		    	label: '有偿'
		    }],
		    // 校验规则
        rules: {
            title: [
                { required: true, message: '请输入标题', trigger: 'blur' },
                { max: 20, message: '标题不大于20字', trigger: 'blur' }
            ],
            petdesc: [
                { required: true, message: '请输入宠物介绍', trigger: 'blur' }
            ],
            contactMode: [
                { validator: validatePass, trigger: 'blur' }
            ],
            petsPhoto: [
                { validator: validatePass2, trigger: 'change' }
            ],
            city: [
                { required: true, message: '请选择城市', trigger: 'blur' }
            ],
            // wechat: [
            //     { validator: validatePass, trigger: 'blur' }
            // ],
            // qqnumber: [
            // 		{ validator: validatePass, trigger: 'blur' }
            // ]
        }
			}
		},
		mounted:function() {
			this.retrievePetBreed()
	  },
		methods: {
	    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.sendPets()
          } else {
            this.$message.error('错了哦，您填写的信息有错误，请按照提示修改。')
            return false;
          }
        });

      },
			async sendPets() {
				const { username } = this.$store.getters.getUser
				const { form } = this
				await sendPets({...form,username}).then(res => {
          console.log(res);
          // 后台成功返回数据
          if (res.data.code === 1) {
            // 保存状态
            this.$message.success(res.data.msg)
            return
          }
          // 失败提示
          this.$message.error(res.data.msg)
        })
			},
      handleChange (value) {
      	this.form.province = CodeToText[value[0]]
      	this.form.city = CodeToText[value[1]]
      	this.form.county = CodeToText[value[2]]
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
	            if (this.form.imageUrl == undefined || this.form.imageUrl == '') {
						    this.form.imageUrl = 'http://' + this.qiniuaddr + '/' + res.data.key
						  } else {
						    this.form.imageUrl += ',' + 'http://' + this.qiniuaddr + '/' + res.data.key
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
	    },
	    retrievePetBreed() {
	    	retrieveBreed().then(res => {
	        console.log(res)
	        // 后台成功返回数据
	        if (res.data.code === 1) {
	          console.log(res.data.msg)
	          this.breedOptions = res.data.data
	          return
	        }
	        // 失败提示
	        console.log(res.data.msg)
	      })
	    }
	  }
	}
</script>

<style lang="css" scoped>
	.container {
		width: 100%;
		background-color: #eee;
		padding-top: 40px;
		padding-bottom: 50px;
	}
	.container-color {
		background-color: #fff;
		width: 900px;
		margin: 0 auto;
		padding-bottom: 100px;
	}
	.box-header {
		padding: 30px 20px 20px 20px;
	    height: auto;
	    text-align: center;
	    border-bottom: 1px solid #eee;
	    color: #333;
	}
	.box-header h1 {
		font-size: 24px;
	}
	.box-header h2 {
		font-size: 14px;
		line-height: 44px;
	}
	.box-body {
		padding-top: 50px;
		width: 80%;
		margin: 0 auto;
	}
	.label {
		margin-left: 75px;
		width: 300px;
		color: #909399;
	    padding: 9px 0px 9.5px 10px;
	    line-height: 20px;
	    border-left: 1px solid #e6e6e6;
	    border-top: 1px solid #e6e6e6;
	    border-bottom: 1px solid #e6e6e6;
/*	    border-width: 1px;
	    border-style: solid;
	    border-color: #e6e6e6;*/
	    border-radius: 2px 0 0 2px;
	    text-align: center;
	    background-color: #FBFBFB;
	    overflow: hidden;
	    box-sizing: border-box;
	}
	.desc-box {
		margin-bottom: 10px;
	}
	.contactMode div {
		margin-bottom: 5px;
	}
	.button-box {
		float: right;
		padding: 0 20px 20px 20px;
	}
</style>

<style lang="css">
	.el-textarea__inner {
		line-height: 2.5 !important;
	}
	.el-form-item {
		margin-bottom: 35px !important;
		padding-bottom: 35px;
		border-bottom: 1px solid #eee;
	}
	.petsInfo .el-form-item__content div span:first-child {
		margin-left: 0 !important;
	}
	.el-input-number {
		width: 204px;
	}
</style>