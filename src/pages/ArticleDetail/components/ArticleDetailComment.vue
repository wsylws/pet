<template>
	<div class="comment-container">
		<el-container v-for="item in commentList" :key="item.id" class="content">
    	<el-aside width="200px" class="left">
    		<div class="avatar">
					<img class="img" :src="item.avatar" />
				</div>
				<div class="username">{{item.username}}</div>
    	</el-aside>
    	<el-main class="right">
    		<div v-html="item.content" class="desc">
					{{item.content}}
				</div>
				<div class="info">
					<span>{{item.create_time}}</span>
				</div>
    	</el-main>
  	</el-container>
  	<div class="pagination">
			<el-pagination
				class="page"
				@size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
				background
				:current-page.sync="currentPage"
	      :page-size="10"
				layout="prev, pager, next, jumper"
				:total="pageTotal">
			</el-pagination>
		</div>
	</div>
</template>

<script>

	export default {
		name: "ArticleDetailComment",
		data() {
			return {
				currentPage: 1
			}
		},
		props: {
			commentList: Array,
			pageTotal: Number
		},
		methods: {
			handleSizeChange(val) {
      	console.log(`每页 ${val} 条`);
	    },
	    handleCurrentChange(val) {
	      console.log(`当前页: ${val}`);
	      this.$emit('currentPage',val)
	      this.$parent.getReply()
	    }
		}
	}
</script>

<style lang="css" scoped>
	.comment-container {
		width: 970px;
		margin: 0 auto;
		background-color: #fff;
		height:100%; 
		/*overflow: hidden;*/
		
	}
	.comment-container .content {
		position: relative;
		border-bottom: 1px solid #eee;
		overflow: hidden;
	}
	.comment-container .content .left {
    text-align: center;
    padding: 15px 0;
    background-color: #f9f9f9;
	}
	.comment-container .content .left .avatar {
		margin: 0 auto;
		height: 80px;
		margin-top: 25px;
    padding: 3px;
    width: 80px;
    border: 1px solid #ccc;
	}
	.comment-container .content .left .avatar .img {
		width: 100%;
		height: 100%;
	}
	.comment-container .content .left .username {
		margin-top: 10px;
		color: #029789;
	}
  .comment-container .content .right .desc {
  	padding: 20px 20px;
  	font-size: 15px;
  	color: #333;
  }
  .comment-container .content .right .desc >>> img{
  	width: 100%;
  }
  .comment-container .content .right .info {
  	position: absolute;
  	bottom: 20px;
  	right: 40px;
  	font-size: 12px;
  	color: #333;
  }
  .pagination {
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		padding-top: 20px;
		padding-bottom: 20px;
		text-align: center;
	}
</style>