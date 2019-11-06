<template>
	<div class="container">
		<el-form ref="form" hide-required-asterisk :model="form" :rules="rules" label-width="80px" label-position="top">
      <el-form-item label="主题分类" prop="category">
        <el-select v-model="form.category" placeholder="请选择主题分类">
          <el-option v-for="cate in categorys" :key="cate.value" :label="cate.label" :value="cate.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>

      <div class="el-form-item is-required" :class="{ 'is-error': validate.error }">
        <label class="article-title">文章内容</label>
        <div class="el-form-item__content">
        	<editor :domain='qiniuForm.domain' v-model="qiniuForm.content" uploadUrl='https://upload-z2.qiniup.com'></editor>
          <div v-if="validate.error" class="el-form-item__error">正文怎能没有内容呢？</div>
        </div>
      </div>

      <div class="oprator right">
        <el-button class="submit" type="primary" @click="submit('form')" @keyup.enter="submit">发布文章</el-button>
      </div>

    </el-form>
	</div>
</template>

<script>
	import Editor from '@/components/editor.vue'
	import { sendArticle } from '../../apis/foreground'
	export default {
		name: "SendArticle",
		components: {
			Editor
		},
		data () {
	    return {
	    	qiniuForm: {
	    		content: '',
	    		token: '',
	    		domain: 'http://pet.wangshiyu.online/'
	    	},
	      categorys: [{
          value: '育宠交流',
          label: '育宠交流'
        }, {
          value: '宠物救济',
          label: '宠物救济'
        }, {
          value: '寻宠启示',
          label: '寻宠启示'
        }, {
          value: '问答中心',
          label: '问答中心'
        }, {
          value: '资源下载',
          label: '资源下载'
        }],
	      form: {
	        category: null,
	        title: '',
	      },
	      rules: {
	        title: [
	          { required: true, message: "必须填写标题哦!", trigger: 'blur' },
	        ]

	      },

	      validate: {
	        error: false
	      }
	    }
	  },
	 	methods: {
	 		submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.send()
          } else {
            this.$message.error('错了哦，您填写的信息有错误，请按照提示修改。') 
            return false;
          }
        });

      },
	 		async send() {
	 			const { username } = this.$store.getters.getUser
	 			const content = this.qiniuForm.content
	 			const { form } = this
	 			await sendArticle({...form, content, username}).then(res => {
          this.$router.push({path:`/article/${res.data.data.insertId}`})
          // 后台成功返回数据
          if (res.data.code === 1) {
            // 保存状态
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
	.container {
		width: 970px;
		margin: 0 auto;
		padding-top: 30px;
		padding-bottom: 30px;
	}
	.article-title {
		font-size: 14px;
    color: #606266;
    line-height: 40px;
	}
</style>