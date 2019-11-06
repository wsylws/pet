<template>
    <div class="content-container">
        <div class="content-color">
            <div class="photo">
                <el-divider content-position="left">宠物相册</el-divider>
                <div class="img">
                    <el-image 
                        style="width: 700px; height: 400px"
                        v-for="item in (contentList.imgurl || '').split(',')" 
                        :key="item.id"
                        :src="item"
                        fit="cover"
                        :preview-src-list="(contentList.imgurl || '').split(',')"
                    >
                    </el-image>
                </div>
            </div>
            <div class="desc">
                <el-divider content-position="left">宠物介绍</el-divider>
                <span class="desc-content">{{contentList.pet_desc}}</span>
            </div>
            <div class="contact">
                <el-divider content-position="left">联系方式</el-divider>
                <div class="contact-mode">
                    <div class="padding">
                        <i class="iconfont icon-phone">&#xe7bf;</i>
                        电话号码:
                        <span class="item">{{contentList.telephone}}</span>
                    </div>
                    <div class="padding">
                        <i class="iconfont icon-wechat">&#xe637;</i>
                        微信号:
                        <span class="item">{{contentList.wechat}}</span>
                    </div>
                    <div class="padding">
                        <i class="iconfont icon-qqnumber">&#xe66a;</i>
                        QQ:
                        <span class="item">{{contentList.qqnumber}}</span>
                    </div>
                </div>
            </div>
            <div class="money">如有金钱交易请谨慎处理，谨防诈骗。</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailContent",
        props: {
            contentList: ''
        },
        data() {
            return {
                // contentList: {
                //     desc: "朋友的猫，两岁半了，驱虫疫苗8月19都以做过，英短银渐层重点色，和银渐层区别是背毛黑色很短，看起来更加白，蓝色大眼睛，朋友要出国照看不了，真正爱猫的铲屎官可以联系",
                //     contact: {
                //         telephone: "13665962554",
                //         wechat: "13665962554",
                //         qqnumber: "847885262"
                //     },
                //     imgUrl: [
                //         require("@/images/adopt1.jpg"),
                //         require("@/images/adopt2.jpg")
                //     ]
                // }
            }
        }
    }
</script>

<style lang="css" scoped>
    .content-container {
        width: 970px;
        margin: 0 auto;

    }
    .content-color {
        overflow: hidden;
        background-color: #fff;
        padding-top: 40px;
        padding-left: 40px;
        padding-right: 40px;
    }
    .content-container .img {
        padding-left: 100px;
    }
    .content-container .desc {
        padding: 0 0 15px;

    }
    .content-container .desc-content {
        color: #666;
        display: inline-block;
        width: 800px;
        padding-left: 40px;
    }
    .contact-mode {
        padding-left: 40px;
        color: #666;
        font-size: 15px;
    }
    .contact-mode .padding {
        padding-bottom: 15px; 
        padding-left: 10px;
    }
    .contact-mode .item {
        color: #333;
    }
    .contact-mode .icon-phone {
        color: rgb(35, 163, 197);
        font-size: 20px;
    }
    .contact-mode .icon-wechat {
        color: rgb(0, 200, 0);;
        font-size: 20px;
    }
    .contact-mode .icon-qqnumber {
        color: rgb(27, 193, 250);
        font-size: 20px;
    }
    .content-container .money {
        padding-left: 53px;
        color: red;
        font-size: 12px;
        padding-bottom: 20px;
    }
    
</style>

<style lang="css">
    .el-divider__text {
        font-size: 20px !important;
        color: #333;
        font-weight: 300;
    }

</style>