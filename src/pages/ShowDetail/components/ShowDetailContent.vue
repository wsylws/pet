	<template>
		<div class="detail-container">
		<el-card class="box-card" shadow="never">
			<div class="card-color">
			<div slot="header" class="detail-header clearfix">
		    <div class="header-left">
	         <img class="avatar" :src="contentList.avatar"></img>
	       </div>
	       <div class="header-right">
	         <span class="username">{{contentList.username}}</span>
	         <div class="time">
		         发布于:{{contentList.create_time}}
		         <span class="icon">
		          <i class="el-icon-view" style="font-size: 13px"></i>
		          <span>{{contentList.read_num}}</span>
		          <i class="el-icon-s-comment" style="font-size: 11px"></i>
		          <span>{{commentLength}}</span>
		        </span>
	       	</div>
	       </div>
		  </div>
		  <div class="detail-content">
		  	<p>{{contentList.content}}</p>
		  	<div class="content-img">
		  		<el-image 
		  			v-if="contentList.imgurl !== ''"
	          style="width: 700px; height: 400px"
	          v-for="item in (contentList.imgurl || '').split(',')" 
	          :src="item"
	          :key="item.id"
		        fit="cover"
	          :preview-src-list="(contentList.imgurl || '').split(',')"
	         >
	         </el-image>
		  	</div>
		  </div>
					</div>
		</el-card>
	</div>
	</template>

	<script>
		export default {
			name: 'ShowDetailContent',
			props: {
				contentList: '',
				commentLength: Number
			},
			data() {
			  return {
			  	squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
			  	img: [
						require("@/images/show1.jpg"),
						require("@/images/show2.jpg")
					],
			  }
			}
		}
	</script>

	<style lang="css" scoped>
		.detail-container {
			width: 970px;
			margin: 0 auto;
			padding-top: 30px;
			padding-bottom: 20px;
		}
		.card-card {
			background-color: #fff;
		}
		.detail-header {
			padding-bottom: 15px;
		}
		.header-left {
	    float: left;
	  }
	  .header-right {
	    float: left;
	  }
	  .header-right .username {
	    font-size: 20px;
	    color: #029789;
	    line-height: 14px;
	    margin-left: 6px;
	  }
	  .header-right .time {
	    font-size: 12px;
	    color: #979fa8;
	    margin-left: 6px;
	    margin-top: 7px;
	  }
	  .header-right .time .icon {
	  	padding-left: 5px;
	  }
	  .detail-content {
	  	padding-top: 20px;
	  	padding-bottom: 50px;
	  	border-bottom: 1px solid #f6f6f6;
	  }
	  .detail-content .content-img {
	  	margin-top: 10px;
	  	width: 500px;
	  }
	  .detail-content .img {
	  	width: 100%;

	  }
	  .avatar {
	  	width: 100%;
	  	width: 50px;
	  	height: 50px;
	  }
	</style>
