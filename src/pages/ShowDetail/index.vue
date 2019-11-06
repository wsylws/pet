<template>
	<div class="container">
	
				<show-detail-content :contentList="contentList" :commentLength="commentList.length">
				</show-detail-content>
				<show-detail-comment :commentList="commentList" :author='author'>
				</show-detail-comment>

	</div>
</template>

<script>
	import { getDetailShow, getShowComment } from '@/apis/foreground'
	import ShowDetailContent from './components/ShowDetailContent'
	import ShowDetailComment from './components/ShowDetailComment'
	export default {
		name: 'ShowDetail',
		components: {
			ShowDetailContent,
			ShowDetailComment
		},
		data() {
			return {
				contentList: [],
				commentList: [],
				author: ''
			}
		},
		mounted: function() {
			this.DetailShow()
			this.getComment()
		},
		methods: {
			DetailShow() {
				const id = this.$route.params.id
				getDetailShow(id).then(res => {
					// 后台成功返回数据
          if (res.data.code === 1) {
          	console.log(res.data.msg)
          	this.contentList = res.data.data[0]
          	this.author = res.data.data[0].username
          	return
          }
          console.log(res.data.msg)
				}) 
			},
			getComment() {
        let id = this.$route.params.id
        getShowComment(id).then(res => {
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