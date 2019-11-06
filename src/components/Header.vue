<template>
  <div class="container">
    <div class="nav">
      <el-menu 
        :router="true"
        :default-active='$route.meta.module'
        class="el-menu" 
        mode="horizontal" 
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item><img class="logo" src="@/images/logo.png"></el-menu-item>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/adopt">领养</el-menu-item>
        <el-menu-item index="/create">送养</el-menu-item>
        <el-menu-item index="/article">论坛</el-menu-item>
        <el-menu-item index="/show">宠物秀</el-menu-item>
        <el-menu-item index="/register" v-if="!username" class="right" >注册</el-menu-item>
        <el-menu-item v-else class="right" @click="open">
          <a>退出</a>
        </el-menu-item>
        <el-menu-item index="/login" v-if="!username" class="right">登陆</el-menu-item>

        <el-menu-item index="/my" v-else class="right">
          <img class="avatar" :src="avatar" alt="avatar"/>
          {{username}}
        </el-menu-item>
        <el-menu-item index="/notice" v-if="username" class="right">
          提醒
          <span v-if='count' class="unread_num">{{count}}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { getTotalNotice } from '@/apis/foreground'
export default { 
  name: 'Header',
  inject: ['reload'],
  data() {
    return {
      activeIndex: '/',
      avatar: '',
      username: '',
      count: ''
    }
  },
  methods: {
    initUser() {
      const { username, avatar } = this.$store.getters.getUser
      this.username = username
      this.avatar = avatar
    },
    getNotice() {
      const { username } = this.$store.getters.getUser
      this.$store.dispatch('getNotice')
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    open() {
      this.$confirm('确认退出当前账号?', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        this.$store.dispatch('clearUser')
        this.initUser()
        this.$message.success("退出登录")
        this.$router.go(0)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });          
      });
    }
  },
  updated: function(){
    this.count = this.$store.state.count
  },
  mounted() {
    this.initUser()
    this.getNotice()
    this.count = this.$store.state.count
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 100%;
    position: relative;
    box-sizing: border-box;
  }
  .nav {
    background: #545c64;
  }
  .el-menu {
    width: 970px;
    padding: 0 50px;
    border-bottom: 0;
    margin: 0 auto;
  }
  .el-menu-item:first-child:hover {
    background-color:  rgb(84, 92, 100) !important;
  }
  .logo {
    height: 50px;
  }
  .right {
    float: right
  }
  .el-menu .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .unread_num {
    z-index: 10;
    padding: 0 4px;
    margin: 0 0 0 3px;
    line-height: 12px;
    color: #FFFFFF;
    font-size: 12px;
    text-align: center;
    border-radius: 0;
    cursor: pointer;
    background: #EA4747;
  }
</style>

<style>
  .el-badge__content.is-fixed {
    top: 14px;
  }
  .el-badge__content.is-dot {
    width: 5px;
    height: 5px;
    
  }
</style>