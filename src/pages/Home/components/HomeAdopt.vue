<template>
	<div class="container">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span class="AdoptTitle1">最新</span>
				<span class="AdoptTitle2">领养</span>
			</div>
			<div class="card-body">
			  <router-link tag="div" :to="'/adopt/' + item.id" v-for="item in AdoptList" :key="item.id" class="text item">
			    <div class="adopt-left">
			    	<img :src="(item.imgurl || '').split(',', 1)">
			    </div>
			    <div class="adopt-right">
			    	<h2 class="title">
			    		<a>
			    			{{item.title}}
			    		</a>
			    	</h2>
			    	<el-avatar class="avatar" size="small">
			    		<img :src="item.avatar">
			    	</el-avatar>
			    	<span class="username">{{item.username}}</span>
			    	<span class="time">
              <i class="el-icon-time"></i>
              {{item.create_time}}
            </span>
			    	<span class="see">
              <i class="el-icon-view"></i>
              {{item.read_num}}
            </span>
			    	<span class="AdoptDesc">{{item.pet_desc}}</span>
			    </div>
			  </router-link>
		  </div>
      <button class="read-more">
        <router-link tag="a" to="/adopt/" target="_blank">阅读更多</router-link>
      </button>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'HomeAdopt',
    props: {
      AdoptList: Array
    },
		data() {
			return {
				// AdoptList: [{
				// 	id: "0001",
				// 	imgUrl: require("@/images/adopt1.jpg"),
				// 	title: "坐标苏州，银点无偿领养",
				// 	avatar: require("@/images/adopt1.jpg"),
				// 	username: "wsy",
				// 	time: "2019-08-04",
				// 	see: "465人围观",
				// 	AdoptDesc: "朋友的猫，两岁半了，驱虫疫苗8月19都以做过，英短银渐层重点色，和银渐层区别是背毛黑色很短，看起来更加白，蓝色大眼睛，朋友要出国照看不了，真正爱猫的铲屎官可以联系"
				// }, {
				// 	id: "0002",
				// 	imgUrl: require("@/images/adopt1.jpg"),
				// 	title: "坐标苏州，银点无偿领养",
				// 	avatar: require("@/images/adopt1.jpg"),
				// 	username: "wsy",
				// 	time: "2019-08-04",
				// 	see: "465人围观",
				// 	AdoptDesc: "朋友的猫，两岁半了，驱虫疫苗8月19都以做过，英短银渐层重点色，和银渐层区别是背毛黑色很短，看起来更加白，蓝色大眼睛，朋友要出国照看不了，真正爱猫的铲屎官可以联系"
				// }, {
				// 	id: "0003",
				// 	imgUrl: require("@/images/adopt1.jpg"),
				// 	title: "坐标苏州，银点无偿领养",
				// 	avatar: require("@/images/adopt1.jpg"),
				// 	username: "wsy",
				// 	time: "2019-08-04",
				// 	see: "465人围观",
				// 	AdoptDesc: "朋友的猫，两岁半了，驱虫疫苗8月19都以做过，英短银渐层重点色，和银渐层区别是背毛黑色很短，看起来更加白，蓝色大眼睛，朋友要出国照看不了，真正爱猫的铲屎官可以联系"
				// }]
			}
		}
	}
</script>

<style lang="css" scoped>
   .container {
    width: 600px;
    float: left;

   }
	 .text {
    font-size: 14px;
  }

  .item {
    padding: 10px 0;
    border-bottom: 1px solid #EBEEF5;
    overflow: hidden;
    width: 100%;
  }

  .box-card {
    width: 600px;
    box-sizing: border-box;
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
  .adopt-left {
  	float: left;
    padding-right: 20px;
  	width: 200px;
  	height: 150px;
  	overflow: hidden;
  }
  .adopt-left img {
  	width: 100%;

  }
  .adopt-right {
  	color: #b8b8b8;
  }
  .adopt-right .title {
    font-size: 20px;
    line-height: 1.6;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .adopt-right .avatar img {
    width: 100%;
  }
  .adopt-right .username {
  	padding-bottom: 3px;
  	line-height: 30px;
  	vertical-align: top;
    display:inline-block;
  }
  .adopt-right .time {
  	padding-left: 15px;
  	line-height: 30px;
  	vertical-align: top;
    display:inline-block;
  }
  .adopt-right .see {
  	padding-left: 15px;
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
    width: 320px;
  }
  .read-more {
    width: 100%;
    height: 50px;
    font-size: 17px;
    background-color: #ffffff;
    color: #333;
    cursor: pointer;
    margin: 0 auto;
    line-height: 50px;
  }
</style>

<style>
  .el-card__body {
    padding-bottom: 0px;
  }
</style>