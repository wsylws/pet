<template>
    <div class="container">
    	<detail-info :infoList="infoList"></detail-info>
    	<detail-date :dateList="dateList" :length="commentList.length"></detail-date>
        <detail-content :contentList="contentList"></detail-content>
        <detail-comment :commentList="commentList" :author="author"></detail-comment>
    </div>
</template>

<script>
import { retrievePetDetail, getPetComment } from '../../apis/foreground'
import DetailInfo from './components/DetailInfo'
import DetailDate from './components/DetailDate'
import DetailContent from './components/DetailContent'
import DetailComment from './components/DetailComment'
export default {
    name: 'AdoptDetail',
    components: {
    	DetailInfo,
    	DetailDate,
        DetailContent,
        DetailComment
    },
    data() {
        return {
            infoList: [],
            dateList: [],
            contentList:[],
            commentList: [],
            author: ''
        }
    },
    mounted: function() {
        this.DetailArticle()
        this.getComment()
    },
    methods: {
        DetailArticle() {
            let id = this.$route.params.id
            retrievePetDetail(id).then(res => {
                // 后台成功返回数据
                if (res.data.code === 1) {
                    console.log(res.data.msg)
                    const { id, title, pet_desc, status, breed, breed_name, sex, age, quchong, mianyi, jueyu, contactname, telephone, wechat, qqnumber, imgurl, read_num, comment_num, like_num, collect_num, province, city, county } = res.data.data[0]
                    this.infoList = { id, title, breed, breed_name, sex, age, province, city, county, status, quchong, mianyi, jueyu }
                    this.dateList = { read_num, comment_num, like_num, collect_num }
                    this.contentList = { imgurl, pet_desc, telephone, wechat, qqnumber }
                    this.author = res.data.data[0].username
                    return
                }
                // 失败提示
                console.log(res.data.msg)
            })
        },
        getComment() {
            let id = this.$route.params.id
            getPetComment(id).then(res => {
                if (res.data.code === 1) {
                    console.log(res.data.msg)
                    this.commentList = res.data.data
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
	.container {
		width: 100%;
		background-color: #eee;
	}
</style>