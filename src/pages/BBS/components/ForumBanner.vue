<template>
	<div class="banner-container">
		<el-card class="box-card" shadow="never">
			<div class="banner-color">
				<el-button @click="selectAll">全部文章</el-button>
				<el-button 
					v-for="item in categoryList" 
					:key="item.value"
					@click="selectCategory(item.value)"
				>{{item.value}}</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { getArticle } from '@/apis/foreground'
	export default {
		name: "ForumBanner",
		data() {
			return {

				categoryList: 
					[{
						value: "育宠交流"
					}, {
						value: "宠物救济"
					}, {
						value: "寻宠启示"
					}, {
						value: "问答中心"
					}, {
						value: "资源下载"
					}]
			}
		},
		methods: {
			selectCategory(value) {
				this.$emit('changeCategory',value)
				this.$parent.getItem()
			},
			selectAll() {
				this.$emit('changeCategory','')
				this.$parent.getItem()
			}
		}
	}
</script>

<style lang="css" scoped>
	.banner-container {
		width: 970px;
		margin: 0 auto;
		padding-top: 30px;
	}
	.banner-color {
		background: #fff;
		padding-bottom: 20px;
	}

</style>

<style>
	.banner-container .el-card__body {
		padding-bottom: 0;
	}
</style>