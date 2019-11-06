<template>
	<div class="container">
		<send></send>
		<show-item 
			:showList="showList" 
			:pageTotal="pageTotal" 
			@currentPage="currentPage"
		></show-item>
	</div>
</template>

<script>
	import { retrieveShowInfo } from '@/apis/foreground'
	import Send from './components/Send'
	import ShowItem from './components/ShowItem'
	export default {
		name: 'PetShow',
		components: {
			Send,
			ShowItem
		},
		data() {
			return {
				showList: [],
				pageNum: 1,
				pageSize: 10,
				pageTotal: 0,
				comment: []
			}
		},
		mounted: function() {
			this.getPetShow()
		},
		methods: {
			getPetShow() {
				const { pageNum, pageSize } = this
	    	retrieveShowInfo(pageNum, pageSize).then(res => {
	        // 后台成功返回数据
	        if (res.data.code === 1) {
	          this.showList = res.data.data.result
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