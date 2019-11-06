<template>
	<div class="container">
		<forum-banner @changeCategory="changeCategory"></forum-banner>
		<forum-header @topic="getTopic"></forum-header>
		<forum-item :itemList="itemList" :pageTotal="pageTotal" @currentPage="currentPage"></forum-item>
	</div>
</template>

<script>
	import { getArticle } from '@/apis/foreground'
	import ForumBanner from './components/Forumbanner'
	import ForumHeader from './components/ForumHeader'
	import ForumItem from './components/ForumItem'
	export default {
		name: "BBS",
		components: {
			ForumBanner,
			ForumHeader,
			ForumItem
		},
		data() {
			return {
				itemList: [],
				pageNum: 1,
				pageSize: 20,
				pageTotal: 0,
				category: '',
				topic: 'lastest'
			}
		},
		mounted: function() {
			this.getItem()
		},
		methods: {
			getItem() {
				const { category, topic, pageNum, pageSize } = this
	    	getArticle(category, topic, pageNum, pageSize).then(res => {
	        // 后台成功返回数据
	        if (res.data.code === 1) {
	          this.itemList = res.data.data.result
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
	    },
	    changeCategory(val) {
	    	this.category = val
	    	this.pageNum = 1
	    },
	    getTopic(val) {
	    	this.topic = val
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