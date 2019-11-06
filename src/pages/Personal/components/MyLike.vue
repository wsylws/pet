<template>
	<div>
		<router-link tag="div" :to="'/adopt/' + item.id" v-for="item in LikeList" :key="item.id" class="text item">
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
    <div v-if="LikeList.length === 0" class="nothing-info">暂无数据</div>
	</div>
</template>

<script>
  import { getLikePets } from '@/apis/foreground'
	export default {
		name: "MyLike",
		data() {
			return {
				LikeList: []
			}
		},
    mounted: function() {
      this.getLike()
    },
    methods: {
      getLike() {
        const { username } = this.$store.getters.getUser
        getLikePets(username).then(res => {
          if (res.data.code === 1) {
            console.log(res.data.msg)
            this.LikeList = res.data.data
            return
          } else 
          console.log(res.data.msg)
        })
      }
    }
	}
</script>

<style lang="css" scoped>
	.item {
    padding: 10px 0;
    border-bottom: 1px solid #EBEEF5;
    overflow: hidden;
    width: 100%;
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
    margin-bottom: 8px;
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
  	font-size: 14px;
  	line-height: 30px;
  	vertical-align: top;
    display:inline-block;
  }
  .adopt-right .see {
  	font-size: 14px;
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
  .nothing-info {
    text-align: center;
    color: #545c64;
    line-height: 400px;
  }
</style>