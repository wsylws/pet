<template>
	<div class="container">
		<el-container class="personal-container">
		    <el-aside class="color left" width="300px">
		    	<basic-info></basic-info>
		    </el-aside>
		    <el-main class="color">
		    	<tab-pane></tab-pane>
		    </el-main>
	  </el-container>
	</div>
</template>

<script>
	import BasicInfo from './components/BasicInfo'
	import TabPane from './components/TabPane'
	export default {
		name: "Personal",
		components: {
			BasicInfo,
			TabPane
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
	.color {
		background-color: #fff;
		width: 100%;
	}
	.left {
		margin-right: 20px;
		height: 450px;
	}
</style>