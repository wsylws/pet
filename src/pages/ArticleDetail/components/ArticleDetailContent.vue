<template>
	<div class="detail-container">
		<el-breadcrumb class="position" separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/article' }">论坛</el-breadcrumb-item>
		  <el-breadcrumb-item>{{contentList.category}}</el-breadcrumb-item>
	  </el-breadcrumb>
		<div class="title">
			{{contentList.title}}
		</div>
		<el-container class="content" v-if="this.changcontent === 1">
    	<el-aside width="200px" class="left">
    		<div class="avatar">
					<img class="img" :src="contentList.avatar" />
				</div>
				<div class="username">{{contentList.username}}</div>
    	</el-aside>
    	<el-main class="right">
    		<div v-html="contentList.content" class="desc">
					{{contentList.content}}
				</div>
				<div class="info">
					<span>{{contentList.create_time}}</span>
				</div>
    	</el-main>
  	</el-container>
	</div>
</template>

<script>

	export default {
		name: "ArticleDetailContent",
		data() {
			return {
			}
		},
		props: {
			contentList: '',
			changcontent: Number
		},
		mounted: function(){
			
		}
	}
</script>

<style lang="css" scoped>
	.detail-container {
		width: 970px;
		margin: 0 auto;
		padding-top: 20px;
		background-color: #fff;
		height:100%; 
		/*overflow: hidden;*/
		border-bottom: 1px solid #eee;
	}
	.detail-container .position {
		padding-left: 20px;
		padding-bottom: 20px;
		border-bottom: 2px solid #eee;
	}
	.detail-container .title {
		font-size: 17px;
		padding-left: 30px;
		padding-bottom: 20px;
		padding-top: 20px;
		border-bottom: 1px solid #eee;
	}
	.detail-container .content {
		position: relative;
		overflow: hidden;
	}
	.detail-container .content .left {
    text-align: center;
    padding: 15px 0;
    background-color: #f9f9f9;
	}
	.detail-container .content .left .avatar {
		margin: 0 auto;
		height: 80px;
		margin-top: 25px;
    padding: 3px;
    width: 80px;
    border: 1px solid #ccc;
	}
	.detail-container .content .left .avatar .img {
		width: 100%;
		height: 100%;
	}
	.detail-container .content .left .username {
		margin-top: 10px;
		color: #029789;
	}
  .detail-container .content .right .desc {
  	padding: 20px 20px;
  	font-size: 15px;
  	color: #333;
  }
	.detail-container .content .right .desc  >>> img{
  	width: 100%;
  }
  .detail-container .content .right .info {
  	position: absolute;
  	bottom: 20px;
  	right: 40px;
  	font-size: 12px;
  	color: #333;
  }
</style>