<template>
	<div class="container">
		<el-card class="box-card">
			  <div slot="header" class="clearfix">
			    <span class="AdoptTitle1">领养</span>
					<span class="AdoptTitle2">信息</span>
			  </div>
			  <div class="card-body">
				  <div v-for="item in AdoptList" :key="item.id" class="text item">
				    <router-link tag="a" :to="'/adopt/' + item.id" @click.native="readNum(item.id)" class="adopt-left">
				    	<el-image style="width: 350px; height: 200px" :src="item.imgurl.split(',', 1).toString()" fit="cover"/>
				    </router-link>
				    <div class="adopt-right">
				    	<h2 class="title">
				    		<router-link tag="a" :to="'/adopt/' + item.id" @click.native="readNum(item.id)" >
				    			{{item.title}}
				    		</router-link>
				    	</h2>
				    	<el-avatar size="small">
				    		<img class="avatar" :src="item.avatar">
				    	</el-avatar>
				    	<span class="username">{{item.username}}</span>
				    	<span class="time"><i class="el-icon-time"></i> {{item.create_time}}</span>

				    	<span class="see"><i class="el-icon-view" style="font-size: 13px"></i> {{item.read_num}}</span>
				    	<span class="AdoptDesc">{{item.pet_desc}}</span>
				    </div>
				  </div>
					<div v-if="AdoptList.length === 0" class="nothing-info">暂无数据</div>
			  </div>
			  <el-pagination
			  	class="pagination"
			  	@size-change="handleSizeChange"
      		@current-change="handleCurrentChange"
				  background
				  :current-page.sync="currentPage"
      		:page-size="10"
				  layout="prev, pager, next, jumper"
				  :total="pageTotal">
				</el-pagination>
		</el-card>
	</div>
</template>

<script>
	import { petReadNum } from '@/apis/foreground'
	export default {
		name: 'AdoptArticle',
		props: {
			AdoptList: Array,
			pageTotal: Number
		},
		data() {
			return {
				currentPage: 1,
				// AdoptList: [{
				// 	id: "0001",
				// 	imgUrl: require("@/images/adopt1.jpg"),
				// 	title: "坐标苏州，银点无偿领养",
				// 	avatar: require("@/images/adopt1.jpg"),
				// 	username: "wsy",
				// 	time: "30分钟前",
				// 	see: "465人围观",
				// 	AdoptDesc: "朋友的猫，两岁半了，驱虫疫苗8月19都以做过，英短银渐层重点色，和银渐层区别是背毛黑色很短，看起来更加白，蓝色大眼睛，朋友要出国照看不了，真正爱猫的铲屎官可以联系"
				// }, {
				// 	id: "0002",
				// 	imgUrl: require("@/images/adopt1.jpg"),
				// 	title: "坐标苏州，银点无偿领养",
				// 	avatar: require("@/images/adopt1.jpg"),
				// 	username: "wsy",
				// 	time: "30分钟前",
				// 	see: "465人围观",
				// 	AdoptDesc: "朋友的猫，两岁半了，驱虫疫苗8月19都以做过，英短银渐层重点色，和银渐层区别是背毛黑色很短，看起来更加白，蓝色大眼睛，朋友要出国照看不了，真正爱猫的铲屎官可以联系"
				// }, {
				// 	id: "0003",
				// 	imgUrl: require("@/images/adopt1.jpg"),
				// 	title: "坐标苏州，银点无偿领养",
				// 	avatar: require("@/images/adopt1.jpg"),
				// 	username: "wsy",
				// 	time: "30分钟前",
				// 	see: "465人围观",
				// 	AdoptDesc: "朋友的猫，两岁半了，驱虫疫苗8月19都以做过，英短银渐层重点色，和银渐层区别是背毛黑色很短，看起来更加白，蓝色大眼睛，朋友要出国照看不了，真正爱猫的铲屎官可以联系"
				// }]
			}
		},
		methods: {
			handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.$emit('currentPage',val)
        this.$parent.retrievePetArticleInfo()
      },
      readNum(id) {
      	const data = {id: id}
      	console.log(data)
      	petReadNum(data).then(res => {
      		console.log(res.data.msg)
      		return
      	})
      }
		}
	}
</script>

<style lang="css" scoped>
	.container {
		margin-top: 10px;
	}
	.AdoptTitle1 {
  	font-size: 28px;
  	color: rgb(255, 208, 75);
  	font-weight: 700;
  }
  .AdoptTitle2 {
  	font-size: 28px;
  	color: #545c64;
  	font-weight: 700;
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

	.adopt-left {
  	float: left;
  	width: 350px;
  	height: 190px;
  	overflow: hidden;
  }
  .adopt-left img {
  	width: 100%;
  }
  .adopt-right {
  	float: left;
  	padding-left: 20px;
  	color: #b8b8b8;
  }
  .adopt-right .title {
  	padding: 0px 10px 10px 0px;
    line-height: 37px;
    font-size: 20px;
  }
  .adopt-right .username {
  	padding-bottom: 3px;
  	line-height: 30px;
  	vertical-align: top;
    display:inline-block;
  }
  .adopt-right .time {
  	padding-left: 20px;
  	line-height: 30px;
  	vertical-align: top;
    display:inline-block;
  }
  .adopt-right .see {
  	padding-left: 20px;
  	line-height: 30px;
  	vertical-align: top;
    display:inline-block;
  }
  .adopt-right .AdoptDesc {
  	font-size: 14px;
    line-height: 1.6;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    width: 520px;
  }
  .pagination {
  	padding: 30px 0;
  	text-align: center;
  }
  .avatar {
  	width: 100%;
  }
	.nothing-info {
		text-align: center;
		padding: 20px 0;
		color: #545c64;
	}
</style>