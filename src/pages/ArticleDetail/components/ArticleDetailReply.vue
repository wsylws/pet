<template>
	<div class="reply-container">
		<div class="reply">
			<i class="el-icon-edit"></i><span class="send">发表回复</span>
		</div>
		<el-container>
		  <el-aside width="200px">
		  	<div class="avatar">
		  		<img class="img" :src="avatar" />
		  		<div class="username">{{username}}</div>
		  	</div>
		  	
		  </el-aside>
		  <el-main>
		  	<editor class="editor" ref="editor" :domain='qiniuForm.domain' v-model="qiniuForm.content" uploadUrl='https://upload-z2.qiniup.com'></editor>
		  </el-main>
		</el-container>
		<el-button class="button" @click="submit" type="primary">发表</el-button>
	</div>
</template>

<script>
	import { sendReply,addNotice } from '@/apis/foreground'
	import Editor from '@/components/editor.vue'
	export default {
		name: 'ArticleDetailReply',
		components: {
			Editor
		},
		props: {
			author: ''
		},
		data() {
			return {
				avatar: '',
				username: '',
				qiniuForm: {
		    	content: '',
		    	token: '',
		    	domain: 'http://pet.wangshiyu.online/'
		    }
			}
		},
		mounted: function() {
			const { avatar } = this.$store.getters.getUser
			const { username } = this.$store.getters.getUser
			this.avatar = avatar
			this.username = username
		},
		methods: {
			submit() {
				const { username } = this.$store.getters.getUser
				if (username) {
					if(this.qiniuForm.content) {
						const articleId = this.$route.params.id
						
						const content = this.qiniuForm.content
						sendReply({content: content, username: username, articleId: articleId}).then(res => {
							if (res.data.code === 1) {
	              this.$message.success(res.data.msg)
	              this.$parent.getReply()
	              this.$refs.editor.content=""
	              return
	            } else 
	            this.$message.error(res.data.msg)
						})
						console.log(username, this.author);
						if (username !== this.author) {
							addNotice({content:this.qiniuForm.content, username: username, comment_id: articleId, category: 'bbs',author: this.author}).then (res => {
                console.log(res.data.msg)
                return
            	})
						}
					} else {
						this.$message.error("回复不能为空")
					}
				} else {
					this.$alert('您还未登录，请登录后评论', '提示', {
            confirmButtonText: '登录',
            callback: action => {
              this.$router.push('/login')
            }
          });
				}
			}
		}
	}
</script>

<style lang="css" scoped>
	.reply-container {
		width: 970px;
		margin: 0 auto;
		padding-top: 20px;
		background-color: #fff;
	}
	.reply-container .editor{
		width: 700px;
		height: 310px;
	}
	.reply-container .avatar {
		height: 80px;
		margin-top: 40px;
		margin-left: 60px;
		padding: 3px;
    width: 80px;
    border: 1px solid #ccc;
    float: left;
	}
	.reply-container .username {
		padding-top: 10px;
		text-align: center;
		color: #029789;
	}
	.reply-container .avatar .img {
		width: 100%;
		height: 100%;
	}
	.reply-container .button {
		margin-left: 220px;
		margin-bottom: 100px;
	}
	.reply-container .reply{
		padding-left: 60px;
		font-size: 16px;
		font-weight: 700;

	}
	.el-icon-edit {
		color: orange;
		padding-right: 1px;
	}
</style>