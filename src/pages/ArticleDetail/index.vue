<template>
	<div class="container">
		<article-detail-content :contentList="contentList" :changcontent="changcontent"></article-detail-content>
		<article-detail-comment :commentList="commentList" :pageTotal="pageTotal"  @currentPage="currentPage"></article-detail-comment>
		<article-detail-reply :author="author"></article-detail-reply>

	</div>
</template>

<script>
	import { getDetailArticle,getArticleReply } from '../../apis/foreground'
	import ArticleDetailContent from './components/ArticleDetailContent'
	import ArticleDetailComment from './components/ArticleDetailComment'
	import ArticleDetailReply from './components/ArticleDetailReply'
	export default {
		name: 'ArticleDetail',
		components: {
			ArticleDetailContent,
			ArticleDetailComment,
			ArticleDetailReply
		},
		data() {
			return {
				contentList: [],
				commentList: [],
				author: '',
				pageNum: 1,
				pageSize: 10,
				pageTotal: 0,
				changcontent: 1
			}
		},
		mounted: function() {
			this.getContent()
			this.getReply()
			
		},
		watch: {
			"pageNum": function changeContent() {
				if (this.pageNum !== 1) {
					this.changcontent = 0
				} else {
					this.changcontent = 1
				}
			}
		},
		methods: {
			getContent() {
				let id = this.$route.params.id
				getDetailArticle(id).then(res => {
            // 后台成功返回数据
            if (res.data.code === 1) {
            	this.contentList = res.data.data[0]
            	this.author = res.data.data[0].username
              console.log(res.data.msg)
              return
            }
            // 失败提示
            console.log(res.data.msg)
        })
			},
			getReply() {
				let id = this.$route.params.id
				const { pageNum, pageSize } = this
        getArticleReply(id, pageNum, pageSize).then(res => {
          if (res.data.code === 1) {
          	console.log(res.data.msg)
            this.commentList = res.data.data.result
	          this.pageTotal = res.data.data.pageTotal[0].count
	           // 点击分页回到顶部
	          document.body.scrollTop = 0
	          document.documentElement.scrollTop = 0
            return 
          }
        // 失败提示
        console.log(res.data.msg)
        })
			},
	    currentPage(val) {
	    	this.pageNum = val
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