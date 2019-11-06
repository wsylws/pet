<template>
	<div>
		<div class="text item" v-for="item in articleList" :key="item.id">
      <div class="article-top">
        <div class="article-avatar">
          <img :src="item.avatar">
        </div>
        <div class="userinfo">
          <a target="_blank" class="list-name">{{item.username}}</a>
          <span>发布文章：</span>
          <a href="#">
            <div class="list-title">{{item.title}}</div>
          </a>
        </div>
      </div>
      <div class="article-bottom">
        <div>
          <i class="pre"></i>
          <div v-html="item.content" class="article-desc">
            {{item.content}}
          </div>
          <i class="nxt"></i>
        </div>
      </div>
      <el-button class="delete-article" type="text" @click="open(item.id)">删除文章</el-button>
    </div>
    <div v-if="articleList.length === 0" class="nothing-info">暂无数据</div>
	</div>
</template>

<script>
  import { getPersonalArticle, deletePersonalArticle } from '@/apis/foreground'
	export default {
		name: "MyArticle",
		data() {
      return {
        articleList: ''
      }
    },
    mounted: function() {
      this.getArticle()
    },
   	methods: {
      open(id) {
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteArticle(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      getArticle() {
        const { username } = this.$store.getters.getUser
        getPersonalArticle(username).then(res => {
          if (res.data.code === 1) {
            console.log(res.data.msg)
            this.articleList = res.data.data
            return
          } else 
          console.log(res.data.msg)
        })
      },
      deleteArticle(id) {
        deletePersonalArticle({id: id}).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.getArticle()
            return
          }
          this.$message.error(res.data.msg)
        })
      }
    }
	}
</script>

<style lang="css" scoped>
	.item {
   	padding: 10px 0 10px 70px;
   	box-sizing: border-box;
    border-bottom: 1px solid #EBEEF5;
    overflow: hidden;
    width: 100%;
  }
	.article-top {
    width: 100%;
    overflow: hidden;
  }
  .article-avatar {
    float: left;
    width: 50px;
    height: 50px;
  }
  .article-avatar img {
    width: 100%;
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
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .article-desc {
    font-size: 12px;
    margin-top: 10px;
    overflow: hidden;
    color: #666;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    width: 500px;
    text-indent: 25px;
  }
  .article-desc >>> img {
    width: 0;
  }
  .article-desc >>> span {
    color: #666 !important;
  }
  .article-bottom {
    color: #272322;
    font-size: 12px;
    margin-top: 10px;
    line-height: 20px;
    overflow: hidden;
  }
  .delete-article {
  	float: right;
  	line-height: 36px;
  	font-size: 14px;
  	color: #f56c6c;
  	padding-right: 90px;

  }
  .nothing-info {
    text-align: center;
    color: #545c64;
    line-height: 400px;
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
    margin-right: 90px;
  }
</style>