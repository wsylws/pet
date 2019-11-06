<template>
	<div>
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
		  <div>
			  <el-switch
			  	class="switch"
				  v-model="item.status"
          active-value=1
          inactive-value=0
          @change="updateStatus(item.id, item.status)"
				  inactive-text="已被领养">
				</el-switch>
				<el-button class="delete-article" type="text" @click="open(item.id)">删除</el-button>
				<!-- <a href="#" class="delete-article">删除文章</a> -->
			</div>
		</router-link>
    <div v-if="AdoptList.length === 0" class="nothing-info">暂无数据</div>
	</div>
</template>

<script>
  import { getMyPets, updatePetStatus, deletePersonalPet } from '@/apis/foreground'
	export default {
		name: "MySendPets",
		data() {
			return {
				AdoptList: []
			}
		},
    mounted: function() {
      this.getPets()
    },
		methods: {
      getPets() {
        const { username } = this.$store.getters.getUser
        getMyPets(username).then(res => {
          if (res.data.code === 1) {
            console.log(res.data.msg)
            this.AdoptList = res.data.data
            return
          } else 
          console.log(res.data.msg)
        })
      },
      updateStatus(id, val) {
        updatePetStatus({id: id, status: val}).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            return
          } else 
          this.$message.error(res.data.msg)
        })
      },
      deletePet(id) {
        deletePersonalPet({id: id}).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.getPets()
            return
          }
          this.$message.error(res.data.msg)
        })
      },
      open(id) {
        this.$confirm('此操作将永久删除该送养信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deletePet(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
  	height: 140px;
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
  .adopt-right .time {
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
  .switch {
  	margin-top: 20px;
  	float: right;
  }
  .delete-article {
  	float: right;
  	line-height: 36px;
  	font-size: 14px;
  	color: #f56c6c;
  	padding-right: 15px;
  }
  .nothing-info {
    text-align: center;
    color: #545c64;
    line-height: 400px;
  }
</style>

<style>
	.el-switch__label {
		font-size: 14px;
		color: #409eff;
	}
</style>