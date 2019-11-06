<template>
	<div class="container">
		<el-container class="personal-container">
		      <el-tabs type="border-card" class="box-card" v-model="activeName" @tab-click="change">
					  <el-tab-pane :label="'领养文章' + (petUnread == 0 ? '' : '(' + petUnread +')') " name='pet'>
					  	<adopt-article :adoptList="adoptList"></adopt-article>
						</el-tab-pane>
					  <el-tab-pane :label="'论坛文章' + (bbsUnread == 0 ? '' : '(' + petUnread +')')" name='bbs'>
					  	<bbs-article :bbsList="bbsList"></bbs-article>
					  </el-tab-pane>
					  <el-tab-pane :label="'宠物秀' + (showUnread == 0 ? '' : '(' + petUnread +')')" name='show'>
					  	<pet-show :showList="showList"></pet-show>
					  </el-tab-pane>
					</el-tabs>
	  </el-container>
	</div>
</template>

<script>
	import AdoptArticle from './components/AdoptArticle'
	import PetShow from './components/PetShow'
	import bbsArticle from './components/bbsArticle'
	import {getNoticeInfo, updateNoticeInfo} from '@/apis/foreground'
	export default {
		name: "Notice",
		components: {
			AdoptArticle,
			PetShow,
			bbsArticle
		},
		data() {
			return {
				unread_num:1,
				category: 'pet',
				activeName: 'pet',
				adoptList: [],
				showList: [],
				bbsList: [],
				petUnread: 0,
				bbsUnread: 0,
				showUnread: 0
			}
		},
		mounted: function() {
			this.getNotice()
		},
		watch: {
	    category: function() {
	      this.getNotice()
	    }
	  },
		destroyed: function() {
			this.updateNotice()
		},
		methods: {
			change(value) {
				this.category = value.name
			},
			getNotice() {
				const { username } = this.$store.getters.getUser
				getNoticeInfo(username).then(res => {
					if (res.data.code === 1) {
						this.adoptList = res.data.data.result1
						this.bbsList = res.data.data.result2
						this.showList = res.data.data.result3
						this.petUnread = res.data.data.result4[0].petcount
						this.bbsUnread = res.data.data.result5[0].bbscount
						this.showUnread = res.data.data.result6[0].showcount
            return
          } else 
          console.log(res.data.msg)
				})
			},
			updateNotice() {
				const { username } = this.$store.getters.getUser
				updateNoticeInfo({username: username}).then(res => {
					if (res.data.code === 1) {
						console.log(res.data.msg)
						this.$store.dispatch('getNotice')
            return
          } else 
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
	.personal-container {
		width: 1000px;
		margin: 0 auto;
		padding-bottom: 50px;
		padding-top: 20px;
	}
	.box-card {
		width: 100%;
	}
</style>