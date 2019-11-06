<template>
    <div class="comment-container">
        <div class="comment-color">
          <div class="comment-item" v-for="item in commentList" :ket="item.id">
            <div class="comment-item-left">
              <img class="avatar" :src="item.avatar"></img>
            </div>
            <div class="comment-item-right">
              <span class="username">{{item.username}}</span>
              <span class="time">发布于:{{item.create_time}}</span>
              <div class="comment">{{item.content}}</div>
            </div>
          </div>

          <el-input
            class="input"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="form.textarea">
          </el-input>
          <el-button  @click="sendComment" class="button" type="primary">发表</el-button>
        </div>
    </div>
</template>

<script>
    import { sendShowComment,addNotice } from '@/apis/foreground'
    export default {
      name: "ShowDetailComment",
      data() {
        return {
          squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          form: {
            textarea: ''
          }
        }
      },
      props: {
        commentList: Array,
        author: ''
      },
      methods: {
        sendComment() {
          const { username } = this.$store.getters.getUser
          if (username) {
            if ( this.form.textarea) {
              const showid = this.$route.params.id
              const { form } = this
              sendShowComment({...form, username: username, showid: showid}).then(res => {
                if (res.data.code === 1) {
                  this.$message.success(res.data.msg)
                  this.form.textarea = ''
                  this.$parent.getComment()
                  return
                } else 
                this.$message.error(res.data.msg)
              })
              addNotice({content:this.form.textarea, username: username, comment_id: showid, category: 'show', author: this.author}).then (res => {
                  console.log(res.data.msg)
                  return
              })

              return 
            }
            this.$message.error("评论不能为空")
          } else {
            this.$alert('您还未登录，请登录后评论', '提示', {
              confirmButtonText: '登录',
              callback: action => {
                this.$router.push('/login')
              }
            });
          }
          
        }
      }
    }
</script>

<style lang="css" scoped>
    .comment-container {
      width: 970px;
      margin: 0 auto;
      padding-bottom: 40px;
    }
    .comment-color {
      background-color: #fff;
      overflow: hidden;
    }
    .comment-container .input {
      width: 80%;
      padding: 20px 0px 50px 50px;
    }
    .comment-container .button {
      float: right;
      margin-right: 150px;
      margin-bottom: 30px;
    }
    .comment-item {
      border-top: 1px solid hsla(212, 9%, 63%, .2);
      margin: 20px 50px;
      padding-top: 20px;
      width: 80%;
      padding-left: 8px;
      overflow: hidden;
    }
    .comment-item-left {
      float: left;
    }
    .comment-item-right {
      float: left;
    }
    .comment-item-right .username {
      font-size: 14px;
      color: #029789;
      line-height: 14px;
      margin-left: 5px;
    }
    .comment-item-right .time {
      font-size: 12px;
      color: #979fa8;
      margin-left: 5px;
    }
    .comment-item-right .comment {
      line-height: 26px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      margin-left: 5px;
      color: #666;
      margin-top: 2px;
    }
    .comment-item-left .avatar {
      width: 50px;
      height: 50px;
    }
</style>