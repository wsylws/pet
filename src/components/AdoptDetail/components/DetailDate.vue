<template>
    <div class="date-container">
        <div class="date-color">
            <div class="date-container">
                <span class="item">
                    <i class="el-icon-view"></i>
                    <span class="title">阅读</span>
                    <span class="num">{{dateList.read_num}}</span>
                </span>
                <span class="item">
                    <i class="iconfont iconfont-like" :class="{active: isActive}">&#xe872;</i>
                    <span @click="isActive === false ? petLike() : petUnLike()" class="title title-like">喜欢</span>
                    <span class="num">{{likeNum}}</span>
                </span>
                <span class="item">
                    <i class="el-icon-document-copy"></i>
                    <span class="title">评论</span>
                    <span class="num">{{length}}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { petLikeNum, getLikeNum, petUnLikeNum  } from '@/apis/foreground'
    export default {
        name: "DetailDate",
        props: {
            dateList: '',
            length: Number,
        },
        data() {
            return {
                isActive: false,
                likeNum: 0
                // DateList: {
                //     scan: 44,
                //     like: 1,
                //     collect: 20,
                //     comment: 0
                // }
            }
        },
        mounted: function(){
            this.getLike()
        },
        methods: {
            petLike() {
                const { username } = this.$store.getters.getUser
                if (username) {
                    let petid = this.$route.params.id
                    petLikeNum({petid: petid, username: username}).then( res=> {
                        // 后台成功返回数据
                        if (res.data.code === 1) {
                            this.$message.success(res.data.msg)
                            this.isActive = true
                            this.getLike()
                            return
                        }
                        // 失败提示
                        this.$message.error(res.data.msg)
                    })
                } else {
                    this.$alert('您还未登录，请登录', '提示', {
                      confirmButtonText: '登录',
                      callback: action => {
                        this.$router.push('/login')
                      }
                    });
                }
                
            },
            petUnLike() {
                const { username } = this.$store.getters.getUser
                if (username) {
                    let petid = this.$route.params.id
                    
                    petUnLikeNum({petid: petid, username: username}).then( res=> {
                        // 后台成功返回数据
                        if (res.data.code === 1) {
                            this.$message.success(res.data.msg)
                            this.isActive = false
                            this.getLike()
                            return
                        }
                        // 失败提示
                        this.$message.error(res.data.msg)
                    })
                } else {
                    this.$alert('您还未登录，请登录', '提示', {
                      confirmButtonText: '登录',
                      callback: action => {
                        this.$router.push('/login')
                      }
                    });
                }
            },
            getLike() {
                let petid = this.$route.params.id
                const { username } = this.$store.getters.getUser
                getLikeNum(petid).then( res=> {
                    // 后台成功返回数据
                    if (res.data.code === 1) {
                        console.log(res.data.msg)
                        this.likeNum = res.data.data[0].count
                        if ( username === res.data.data[0].username) {
                            this.isActive = true
                        }
                        return
                    }
                    // 失败提示
                    console.log(res.data.msg)
                })
            }
        }
    }
</script>

<style lang="css" scoped>
    .date-container {
        width: 970px;
        margin: 0 auto;
        height: 50px;
        line-height: 50px;
    }
    .date-color {
        background-color: #f0f2f5;
    }
    .date-container .item {
        padding-left: 30px;
        margin-right: 10px;
        font-size: 14px;
    }
    .date-container .item i {
        margin-right: 7px;
        color: #979FA8;
    }
    .date-container .item .title {
        color: #333;
        margin-right: 7px;
    }
    .date-container .item .num {
        color: #979FA8;
    }
    .iconfont-like.active{
        color: red !important;
    }
    .title-like {
        cursor: pointer;
    }
</style>