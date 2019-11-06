<template>
    <div class="info-container">
    	<el-card class="box-card" shadow="never">
			<div class="info-color">
				<div class="info-header">
					<h1 class="info-title">{{infoList.title}}</h1>
                    <span class="info-status">{{infoList.status == 0 ? '待领养' : '已领养'}}</span>
				</div>
                <div class="info-center">
                    <span class="no">No.{{infoList.id}}</span>
                    <span class="location">{{infoList.province + (infoList.city ? ('/' + infoList.city) : ' ') + (infoList.county ? ('/' + infoList.county) : ' ')}}</span>
                </div>
                <div class="info-bottom">
                    <span class="item">
                        品种:
                        <strong>{{infoList.breed}}</strong>
                    </span>
                    <span class="item">
                        性别:
                        <strong>{{infoList.sex === 1 ? "公" : "母"}}</strong>
                    </span>
                    <span class="item">
                        免费:
                        <strong>{{infoList.free? "是" : "否"}}</strong>
                    </span>
                    <span class="item">
                        金额:
                        <strong>￥{{infoList.money}}</strong>
                    </span>
                </div>
			</div>
		</el-card>
    </div>
</template>

<script>
export default {
    name: 'DetailInfo',
    props: {
        infoList: ''
    },
    data() {
    	return {
    		// headerList: {
    		// 	id: "0001",
    		// 	title: "苏州银点弟弟无偿领养-苏州宠物领养",
    		// 	status: "待领养",
    		// 	location: "江苏省/苏州市/虎丘区",
    		// 	breed: "小猫",
    		// 	sex: 1,
    		// 	free: true,
    		// 	money: 0
    		// }
    	}
    }
}
</script>

<style lang="css" scoped>
	.info-container {
		width: 970px;
		margin: 0 auto;
		padding-top: 20px;
	}
	.info-color {
		background: #fff;
	}
    .info-title {
        display: inline-block;
        font-size: 26px;
    }
    .info-status {
        float: right;
        color: #029789;
        padding-top: 4px;
        padding-right: 20px;
    }
    .info-center {
        margin-top: 15px;
    }
    .info-center .no {
        border-radius: 3px;
        background-color: #8796A8;
        color: #fff;
        font-size: 10px;
        padding: 3px 4px;
        margin-right: 6px;
    }
    .info-center .location {
        font-size: 14px;
        color: #2D3238;
    }
    .info-bottom {
        margin-top: 30px;
        padding-bottom: 20px;
    }
    .info-bottom .item {
        padding: 0 40px 0 5px;
        color: #979FA8;
        height: 25px;
        line-height: 25px;
    }
    .info-bottom .item strong {
        color: #2D3238;
        font-size: 14px;
        font-weight: 700;
    }
</style>