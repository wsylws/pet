<template>
	<div class="adopt-container">
		<div class="adopt-item" v-for="item in bbsList" :key="item.id">
			<div class="reply-top">
				<span class="red-cycle" v-if="item.is_read==0"></span>
				<span class="username">{{item.username}}：</span>
				<router-link tag="a" :to="'/article/' + item.article_id" class="content">
					<span class="content" v-html="item.content">{{item.content}}</span>
				</router-link>
			</div>
			<div class="reply-bottom">
				<span class="left">
					<span class="reply">回复我的文章：“</span>
					<router-link tag="a" :to="'/article/' + item.article_id" class="title">{{item.title}}</router-link>
					<span class="reply">”</span>
				</span>
				<span class="right">
					{{item.create_time}}
				</span>
			</div>
		</div>
		<div class="no-date" v-if="bbsList.length == 0">
			暂无数据
		</div>
	</div>
	
</template>

<script>
	export default {
		name: 'bbsArticle',
		props: {
			bbsList: Array
		},
		data() {
			return {
			}
		}
	}
</script>

<style scoped>
	.adopt-container {
		min-height: 500px;
	}
	.adopt-item {
		border-bottom: 1px solid #ddd;
		padding: 20px 30px 20px 30px;
	}
	.reply-top {

		font-size: 16px;
		padding-bottom: 10px;
	}
	.reply-top .username {
		color: #029787;
	}
	.reply-top .content {
		display: inline-block;
	}
	.reply-top .red-cycle {
		display: inline-block;
		width: 4px;
		height: 4px;
		background-color: red;
		border: 1px solid red;
		border-radius: 50%;
		margin-bottom: 10px;
		margin-left: -10px;
	}
	.reply-bottom {
		font-size: 12px;
	}
	.reply-bottom .right {
		float: right;
		color: #aaa;
		font-size: 11px;
	}
	.reply-bottom .reply{
		color: #999;
	}
	.no-date {
		text-align: center;
		color: #666;
		line-height: 500px;
	}
</style>