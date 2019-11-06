<template>
	<div class="header-container">
		<div class="header-left">
			<el-button type="text" :class="{headerActive: isActive}"  @click="getTopic('lastest')">最新主题</el-button>
			<el-button type="text" :class="{headerActive: !isActive}" @click="getTopic('hot')">热门主题</el-button>
		</div>
		<div class="header-right">
			<el-button type="primary" class="send-button">
				<router-link tag="a" to="/article/sendArticle/" class="send-a" target="_blank">发表文章</router-link>
			</el-button>
		</div>
	</div>
</template>

<script>
	import { getHotTopic } from '@/apis/foreground'
	export default {
		name: "ForumHeader",
		data() {
			return {
				isActive: false
			}
		},
		methods: {
			getTopic(val) {
				console.log(val)
				if (val == "hot") {
					this.isActive = true
				} else {
					this.isActive = false
				}
				this.$emit('topic',val)
				this.$parent.getItem()
			}
		}
	}
</script>

<style lang="css" scoped>
	.header-container {
		width: 970px;
		margin: 0 auto;
		background: #f0f2f5;
		overflow: hidden;
		padding-top: 20px;
		padding-bottom: 20px;
	}
	.header-left {
		float: left;
		padding-left: 20px;
	}
	.header-right {
		float: right;
		padding-right: 20px;
	}
	.headerActive {
		color: #333;
	}
	.send-button {
		font-size: 14px;
		padding: 10px;

	}
	.send-a {
		color: #fff;
	}
</style>