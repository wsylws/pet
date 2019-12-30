<template>
	<div class="basicinfo">
		<div class="info-header">
			<el-avatar shape="square" :size="110" :src="avatar"></el-avatar>
			<div class="username">{{username}}</div>
		</div>
		<div class="info-footer">
			<div class="username">昵称：{{username}}</div>
			<div class="email">邮箱：{{email}}</div>
			<div class="telephone">手机：{{telephone}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "BasicInfo",
		data() {
			return {
				avatar: '',
				username: '',
				email: '',
				telephone: ''
			}
		},
		mounted: function() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				const { username, avatar, email, phone } = this.$store.getters.getUser
				this.avatar = avatar
				this.username = username
				this.email = email
				this.telephone = phone
			}
		}

	}
</script>

<style lang="css" scoped>
	.basicinfo {
		font-size: 14px;
		color: #666;
    line-height: 30px;
	}
	.info-header {
		text-align: center;
		padding-top: 40px;
		padding-bottom: 40px;
		border-bottom: 1px solid #eee;
	}
	.info-footer {
		margin-bottom: 12px;
    padding-top: 40px;
    padding-left: 40px;
    padding-bottom: 40px;
	}
	.el-avatar>img {
    width: 100%;
  }
</style>