<template>
	<div class="container">
		<i class="el-icon-success font"></i>
		<span>已提交 等待管理员审核</span>
	</div>
</template>

<script>
	export default {
		name: 'SendSuccess'
	}
</script>

<style scoped>
	.container {
		width: 100%;
		height: 84vh;
		font-size: 40px;
		color: #666;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container .font {
		font-size: 50px;
		color: green;
		margin-right: 15px;
	}
</style>