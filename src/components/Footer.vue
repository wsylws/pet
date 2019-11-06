<template>
	<div class="footer-container">
		<div class="footer-content">
			<span class="site-info">© Copyright 2019 </span>
			<a href="#" class="site-link">Pet.net</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Footer"
	}
</script>

<style lang="css" scoped>
	.footer-container {
		width: 100%;
		height: 60px;
		background: #545c64;
		/*margin-top: 10px;*/
		text-align: center;
	}
	.footer-content {
		max-width: 1040px;
    margin-left: auto;
    margin-right: auto;
    font-family: "Times New Roman";
	}
	.footer-content .site-info {
    padding-top: 5px;
    text-align: left;
    color: #999;
    height: 60px;
    line-height: 60px;
	}
	.footer-content .site-link {
		color: #fff;
    border-bottom: 1px dotted #777;
	}
	.footer-content .site-link:hover {
    color: #e69a00;
	}
</style>