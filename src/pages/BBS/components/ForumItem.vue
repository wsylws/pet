<template>
	<div class="item-container">
		<el-card class="box-card" shadow="never">
			<div class="item-color">

				<div v-for="item in itemList" :key="item.id" class="text item">
					<p>
						<div class="item-left">
							<span class="set-top" v-if="item.top=='1'">置顶</span>
							<router-link tag="a" :to="'/article/' + item.id"  @click.native="readNum(item.id)" class="forum-title">{{item.title}}</router-link>
						</div>
						<div class="item-right">
							<span class="username">{{item.username}}</span>
							<span class="datetime">{{item.create_time}}</span>
							<div class="comment-border">
								<i class="el-icon-view" style="font-size: 13px"></i>
								<span class="item-scan">{{item.read_num}}</span>
								<i class="el-icon-s-comment" style="font-size: 11px"></i>
								<span class="item-comment">{{commentNum(item.id)}}</span>
							</div>
						</div>
					</p>
				</div>
			</div>
		</el-card>
		<div class="pagination">
			<el-pagination
				class="page"
				@size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
				background
				:current-page.sync="currentPage"
	      :page-size="20"
				layout="prev, pager, next, jumper"
				:total="pageTotal">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import { getArticleIndexComment, articleReadNum } from '@/apis/foreground'
	export default {
		name: "ForumItem",
		data() {
			return {
				currentPage: 1,
				comment: []
			}
		},
		props: {
			itemList: Array,
			pageTotal: Number
		},
		mounted: function() {
			this.getComment()
		},
		methods: {
			handleSizeChange(val) {
      	console.log(`每页 ${val} 条`);
	    },
	    handleCurrentChange(val) {
	      console.log(`当前页: ${val}`);
	      this.$emit('currentPage',val)
	      this.$parent.getItem()
	    },
	    getComment() {
        let id = this.$route.params.id
        getArticleIndexComment().then(res => {
          if (res.data.code === 1) {
            console.log(res.data.msg)
            this.comment = res.data.data
            return 
          }
        // 失败提示
        console.log(res.data.msg)
        })
	    },
	    commentNum(id) {
	    	let item 
	    	for(item of this.comment) {
	    		if (item.id === id) {
	    			return item.count
	    		}
	    	}
	    	return 0
	    },
      readNum(id) {
      	const data = {id: id}
      	articleReadNum(data).then(res => {
      		console.log(res.data.msg)
      		return
      	})
      }
		}
	}
</script>

<style lang="css" scoped>
	.item-container {
		width: 970px;
		margin: 0 auto;
		padding-bottom: 50px;
	}
	.item-color {
		background: #fff;
	}
	.text {
    font-size: 14px;
  }

  .item {
    padding: 15px 0;
    border-bottom: 1px solid #EBEEF5;
    overflow: hidden;
    width: 100%;
  }
  .item-left {
  	float: left;
  }
  .set-top {
  	color: #fff;
  	background-color: #FFB800;
  	font-size: 12px;
  	padding: 0 6px;
  	border-radius: 2px;
  	text-align: center;
  }
  .item-right {
  	float: right;
  	font-size: 12px;
  	color: #979fa8;
  }
  .item-right .comment-border {
  	float: right;
  	padding: 0 5px;
  	background-color: #f0f2f5;
  	color: #979fa8;
  	margin-left: 5px;
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

<style>
	.item-container .el-card__body {
		padding-bottom: 0;
	}
</style>