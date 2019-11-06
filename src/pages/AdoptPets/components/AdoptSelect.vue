<template>
	<div>
		<el-card class="box-card">
			<div class="city-box">
				<div class="city-name">城市:</div>
				<div class="city-select">
					<el-cascader
				      size="large"
				      :options="options"
				      v-model="selectedOptions"
				      @change="handleChange">
				   </el-cascader>
				</div>
			</div>
			<div class="breed-box">
				<div class="breed-name">品种:</div>
				<div class="breed-select">
					<a href="#">
						<div 
							class="query-button" 
							:class="{active : activeBreed === all_breed || activeBreed === ''}"
							@click="selected(all_breed)"
						>{{all_breed}}</div>
					</a>
					<a 
						v-for="item in breedList" 
						:key="item.breed_name" 
						@click="selected(item.breed_name)"
					>
						<div class="query-button" :class="{active : activeBreed == item.breed_name}">{{item.breed_name}}</div>
					</a>
				</div>
			</div>
			<el-button class="search" @click="search" type="primary" icon="el-icon-search">搜索</el-button>
		</el-card>
	</div>
</template>

<script>
	import { regionDataPlus, CodeToText } from 'element-china-area-data'
	export default {
		name: 'AdoptSelect',
		props: {
			breedList: Array
		},
	  data () {
	    return {
	      options: regionDataPlus,
	      selectedOptions: [],
	      activeBreed: '',
	      province: '',
	      city: '',
	      county: '',
	      all_breed: "全部"
	    }
	  },

	  methods: {
	  	selected(name) {
				this.activeBreed = name;
			},
	    handleChange (value) {
	    	this.province = CodeToText[value[0]]
	    	if (this.province !== '全部') {
	    		this.city = CodeToText[value[1]]
	    		if (this.city !== '全部') {
	    			this.county = CodeToText[value[2]]
	    		}
	    	}

	    },
	    search() {
	    	const payload= { province: this.province, city: this.city, county: this.county, breed: this.activeBreed }
	    	this.$emit('select',payload)
	    	this.$parent.retrievePetArticleInfo()
	    	this.province = ''
			  this.city = ''
			  this.county = ''
			  this.breed = ''
	    }
	  }
	}
</script>

<style lang="css" scoped>
	.city-box{
		background: #FFFFFF;
    	padding: 20px;
    	border-bottom: 1px solid #eff2f7;
    	margin-top: 10px;
	}
	.breed-box {
		background: #FFFFFF;
    	padding: 20px;
    	margin-top: 10px;
	}
	.city-name {
		float: left;
		line-height: 40px;
		padding-right: 7px;
	}
	.breed-name {
		float: left;
		line-height: 30px;
		padding-right: 7px;
	}
	.query-button {
		display: inline-block;
	    padding: 12px 15px;
	    color: #273444;
	    font-size: 13px;
	    line-height: 5px;
	    cursor: pointer;
	    margin: 0 5px 13px;
	}
	.query-button.active {
	    border-radius: 2px;
	    background: #029789;
	    color: #fff;
	}
	.search {
		float: right;
		margin: 0 35px 20px 0px;
		background-color: #029789;
		border-color: #029789;
	}
</style>