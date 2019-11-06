<template>
	<div>
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
	    <el-tab-pane label="个人信息" name="first">
	    	<update-info></update-info>
	    </el-tab-pane>
	    <el-tab-pane label="我的送养" name="second">
	    	<my-send-pets></my-send-pets>
	    </el-tab-pane>
	    <el-tab-pane label="我的喜欢" name="third">
	    	<my-like></my-like>
	    </el-tab-pane>
	    <el-tab-pane label="我的文章" name="fourth">
	    	<my-article></my-article>
	    </el-tab-pane>
	  </el-tabs>
	</div>
</template>

<script>
	import UpdateInfo from './UpdateInfo'
	import MySendPets from './MySendPets'
	import MyLike from './MyLike'
	import MyArticle from './MyArticle'
	export default {
		name: "TabPane",
		data() {
      return {
        activeName: 'first'
      };
    },
    components: {
    	UpdateInfo,
    	MySendPets,
    	MyLike,
    	MyArticle
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
	}
</script>

<style lang="css" scoped>
	
</style>