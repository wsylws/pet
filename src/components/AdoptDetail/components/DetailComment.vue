<template>
    <div class="comment-container">
        <div class="comment-color">
          <el-row class="comment-item" v-for="item in commentList" :key="item.id" >
            <el-col :span="2">
              <div class="grid-content">
                <div class="comment-item-left">
                  <el-avatar class="img" shape="square" :size="50" :src="item.avatar"></el-avatar>
                </div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content">
                <div class="comment-item-right">
                  <span class="username">{{item.username}}</span>
                  <span class="time">发布于:{{item.create_time}}</span>
                  <div class="comment">{{item.content}}</div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-input
            class="input"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="form.textarea">
          </el-input>
          <el-button @click="sendComment" class="button"type="primary">发表</el-button>
        </div>
    </div>
</template>

<script>
    import { sendPetComment,addNotice  } from '@/apis/foreground'
    export default {
      name: "DetailComment",
      props:{
        commentList: Array,
        author: ''
      },
      data() {
        return {
          squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          form: {
            textarea: ''
          }
          
        }
      },
      methods: {
        sendComment() {
          const { username } = this.$store.getters.getUser
          if (username) {
            if ( this.form.textarea) {
              const petid = this.$route.params.id
              
              const { form } = this
              console.log(form)
              sendPetComment({...form, username: username, petid: petid}).then(res => {
                if (res.data.code === 1) {
                  this.$message.success(res.data.msg)
                  this.$parent.getComment()
                  this.form.textarea = ''
                  return
                } else 
                this.$message.error(res.data.msg)
              })
              console.log(this.author)
              addNotice({content:this.form.textarea, username: username, comment_id: petid, category: 'pet', author: this.author}).then (res => {
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
      padding-bottom: 60px;
      margin-top: 20px;
    }
    .comment-color {
      background-color: #fff;
      overflow: hidden;
      padding-top: 40px;
    }
    .comment-container .input {
      width: 80%;
      padding: 30px 0px 50px 100px;
    }
    .comment-container .button {
      float: right;
      margin-right: 90px;
      margin-bottom: 40px;
    }
    .comment-item {
      box-sizing: border-box;
      border-top: 1px solid hsla(212, 9%, 63%, .2);
      margin: 0 90px;
      padding-bottom: 10px;
      padding-top: 15px;
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
      width: 800px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      margin-left: 5px;
      color: #666;
      margin-top: 2px;
    }
</style>