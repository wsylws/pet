<template>
	<div class="show-container">
		<el-card class="box-card" shadow="never" v-for="item in showList" :key="item.id" >
			<div class="card-color">
				<p>{{item.content}}</p>
				<div class="img-list">

					<div v-for="imgItem in (item.imgurl || '').split(',')" v-if="item.imgurl !== ''">
						<!-- <el-image 
							v-if="(item.imgurl || '').split(',').length === 1"
			    		style="width: 300px; height: 300px"
			    		:src="imgItem"
			    		:preview-src-list="(item.imgurl || '').split(',')"
			    		fit="contain"></el-image> -->
			    	<el-image 
			    		class="img-model1"
			    		style="width: 250px; height: 250px"
			    		:src="imgItem"
			    		:preview-src-list="(item.imgurl || '').split(',')"
			    		fit="cover"></el-image>
					</div>
				</div>
				<div class="show-bottom">
            <span class="username">{{item.username}}</span>
            <span class="datetime">{{item.create_time}}</span>
            <router-link tag="a" :to="'/show/' + item.id" target="_blank"> 
	          	<i class="el-icon-s-comment" style="font-size: 11px"></i>
	          	<span class="num-SHda6">{{commentNum(item.id)}}</span>
            </router-link>
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
	      :page-size="10"
				layout="prev, pager, next, jumper"
				:total="pageTotal">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import { getShowIndexComment } from '@/apis/foreground'
	export default {
		name: "ShowItem",
		props: {
			showList: Array,
			pageTotal: Number
		},
		data() {
			return {
				currentPage: 1,
				comment: []
		}
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
      this.$parent.getPetShow()
    },
  	getComment() {
        let id = this.$route.params.id
        getShowIndexComment().then(res => {
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
    }
	}
}
</script>

<style lang="css" scoped>
	.show-container {
		width: 970px;
		margin: 0 auto;
		margin-top: 10px;
		padding-bottom: 50px;
	}
	.card-card {
		background-color: #fff;
	}
	.box-card {
		margin-top: 10px;
	}
	.img-list {
		margin-top: 10px;
		overflow: hidden;
	}
	.img-model1 {
		float: left;
		padding: 10px;
    border: 1px solid #eee;
    border-radius: 3px;
    margin-right: 12px;
    margin-bottom: 12px;
	}
	.show-bottom {
		color: #979fa8;
		padding-left: 2px;
		font-size: 12px;
		margin-top: 10px;
		padding-bottom: 20px;
	}
	.show-bottom .username {
		padding-right: 2px;
	}
	.show-bottom .datetime {
		padding-right: 3px;
	}
	.pagination {
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
		padding-top: 20px;
		padding-bottom: 20px;
		padding-left: 350px;
	}
</style>

<style>
	.el-card__body {
		padding-bottom: 0;
	}
</style>