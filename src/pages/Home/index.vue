<template>
	<div class="container">
		<home-swiper></home-swiper>
		<home-adopt :AdoptList="AdoptList"></home-adopt>
		<lastest-articles :LastestList="LastestList"></lastest-articles>
		<hot-articles :HotList="HotList" ></hot-articles>
	</div>
</template>

<script>
	import { retrievePetInfo,getLastestArticle,getHotArticle  } from '@/apis/foreground'
	import HomeSwiper from './components/Swiper'
	import HomeAdopt from './components/HomeAdopt'
	import LastestArticles from './components/LastestArticles'
	import HotArticles from './components/HotArticles'
	export default {
		name: 'Index',
		components: {
			HomeSwiper,
			HomeAdopt,
			LastestArticles,
			HotArticles
		},
		data() {
			return {
				AdoptList: [],
				LastestList: [],
				HotList: []
			}
		},
		mounted: function() {
			this.retrievePetArticleInfo()
			this.getLastest()
			this.getHot()
		},
		methods: {
			retrievePetArticleInfo() {
	    	const pageNum = 1, pageSize = 10, province = '', city = '', county = '', breed = ''
	    	retrievePetInfo(pageNum, pageSize, province, city, county, breed).then(res => {
	        // 后台成功返回数据
	        if (res.data.code === 1) {
	          this.AdoptList = res.data.data.result
	          return
	        }
	        // 失败提示
	        console.log(res.data.msg)
	      })
	    },
	    getLastest() {
	    	getLastestArticle().then(res => {
	    		if (res.data.code === 1) {
	    			this.LastestList = res.data.data
	    			this.HotList = res.data.data
	    			return 
	    		}
	    		console.log(res.data.msg)
	    	})
	    },
	    getHot() {
	    	getHotArticle().then(res => {
	    		if (res.data.code === 1) {
	    			this.HotList = res.data.data
	    			return 
	    		}
	    		console.log(res.data.msg)
	    	})
	    }
		}
	}
</script>

<style lang="css" scoped>
	.container {
		width: 970px;
		margin: 0 auto;
		overflow: hidden;
  }
  lastest-articles {
  	float: left;
  }
</style>