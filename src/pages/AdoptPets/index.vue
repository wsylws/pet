<template>
	<div class="container">
		<adopt-select :breedList="breedList" @select="select"></adopt-select>
		<adopt-article 
			:AdoptList="AdoptList" 
			@currentPage="currentPage"
			:pageTotal="pageTotal"
		></adopt-article>
	</div>
</template>

<script>
	import { retrieveBreed, retrievePetInfo } from '../../apis/foreground'
	import AdoptSelect from './components/AdoptSelect'
	import AdoptArticle from './components/AdoptArticle'
	export default {
		name: 'AdoptPets',
		components: {
			AdoptSelect,
			AdoptArticle,
		},
		data() {
			return {
				breedList: [],
				AdoptList: [],
				pageNum: 1,
				pageSize: 10,
				pageTotal: 0,
				searchInfo: '',
				province: '',
				city: '',
				county: '',
				breed: ''
			}
		},
		mounted: function() {
			this.retrievePetBreed()
			this.retrievePetArticleInfo()
		},
		methods: {
			retrievePetBreed() {
	    	retrieveBreed().then(res => {
	        // 后台成功返回数据
	        if (res.data.code === 1) {
	          this.breedList = res.data.data
	          return
	        }
	        // 失败提示
	        console.log(res.data.msg)
	      })
	    },
	    retrievePetArticleInfo() {
	    	const { pageNum, pageSize, province, city, county, breed } = this
	    	
	    	retrievePetInfo(pageNum, pageSize, province, city, county, breed).then(res => {
	        // 后台成功返回数据
	        if (res.data.code === 1) {
	          this.AdoptList = res.data.data.result
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
	    select(val) {
	    	this.searchInfo = val
	    	this.province = this.searchInfo.province
	    	this.city = this.searchInfo.city
	    	this.county = this.searchInfo.county
	    	this.breed = this.searchInfo.breed
	    	this.pageNum = 1
	    }
		}
	}
</script>

<style lang="css" scoped>
	.container {
		width: 970px;
		margin: 0 auto;
  }
</style>