<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="AdoptTitle1">热门</span>
        <span class="AdoptTitle2">文章</span>
        <router-link tag="a" :to="'/article'" class="read-more">更多</router-link>
      </div>
      <div class="card-body">
        <div class="text item" v-for="item in HotList" :key="item.id">
          <div class="top">
            <div class="avatar">
              <img :src="item.avatar">
            </div>
            <div class="userinfo">
              <a target="_blank" class="list-name">{{item.username}}</a>
              <span>发布文章：</span>
              <router-link tag="a" :to="'/article/' + item.id">
                <div class="list-title">{{item.title}}</div>
              </router-link>
            </div>
          </div>
          <div class="bottom">
            <div>
              <i class="pre"></i>
              <div v-html="item.content" class="lastest-desc">
                {{item.content}}
              </div>
              <i class="nxt"></i>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'HotArticles',
    props: {
      HotList: Array
    }
  }
</script>

<style lang="css" scoped>
  .container {
    width: 350px;
    float: right;
    margin-top: 10px;
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
  .read-more {
    float: right;
    font-size: 12px;
    padding-top: 16px;
    color: #9d9d9d;
  }
  .top {
    width: 100%;
    overflow: hidden;
  }
  .avatar {
    float: left;
    width: 50px;
    height: 50px;
  }
  .avatar img {
    width: 100%;
    height: 100%;
  }
  .userinfo {
    float: left;
    padding-left: 10px;
  }
  .userinfo .list-name {
    color: #029789;
    font-size: 14px;
    overflow: hidden;
    padding-right: 5px;

  }
  .userinfo .list-title {
    margin-top: 5px;
    color: #888;
    font-size: 12px;
    line-height: 28px;
    overflow: hidden;
    width: 240px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .lastest-desc {
    font-size: 12px;
    margin-top: 10px;
    height: 60px;
    overflow: hidden;
    color: #666;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    width: 310px;
    text-indent: 25px;
  }
  .lastest-desc >>> img {
    width: 0;
  }
  .lastest-desc >>> span {
    color: #666 !important;
  }
  .bottom {
    color: #272322;
    font-size: 12px;
    margin-top: 10px;
    line-height: 20px;
    overflow: hidden;
  }
  i {
    width: 17px;
    height: 13px;
    background: url(../../../images/right-sprite.png);
    display: inline-block;
  }
  i.pre {
    background-position: -25px -72px;
    margin-right: 5px;
  }
  i.nxt {
    background-position: -58px -71px;
    margin-left: 5px;
    float: right;
  }
</style>