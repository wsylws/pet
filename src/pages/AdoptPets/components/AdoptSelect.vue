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
					<a>
						<div class="query-button" :class="{active : activeBreed == dog_breed}" @click="selected(dog_breed);find(dog_breed)">{{dog_breed}}</div>
					</a>
					<a>
						<div class="query-button" :class="{active : activeBreed == cat_breed}" @click="selected(cat_breed);find(cat_breed)">{{cat_breed}}</div>
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
			<div class="breed-box-category" v-if="this.activeBreed == dog_breed || this.activeBreed == cat_breed">
				<a 
					v-for="item in breedNameList" 
					:key="item.breed_name" 
					@click="selectedName(item.breed_name)"
				>
					<div class="query-button" :class="{active : activeBreedName == item.breed_name}">{{item.breed_name}}</div>
				</a>
			</div>
			<el-button class="search" @click="search" type="primary" icon="el-icon-search">搜索</el-button>
		</el-card>
	</div>
</template>

<script>
	import { regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
	import { findBreed } from '@/apis/foreground'
	export default {
		name: 'AdoptSelect',
		props: {
			breedList: Array
		},
	  data () {
	  	const pv = sessionStorage.getItem("province")
	  	const ci = sessionStorage.getItem("city")
	  	const ct = sessionStorage.getItem("county")
	  	let pvcode;
	  	let cicode;
	  	let ctcode;
	  	if (pv!=='' && ci!=='' && ct!=='') {
	  		pvcode = TextToCode[pv].code
	  		cicode = TextToCode[pv][ci].code
	  		ctcode = TextToCode[pv][ci][ct].code
	  	} else if (pv!=='' && ci !==''){
				pvcode = TextToCode[pv].code
	  		cicode = TextToCode[pv][ci].code
	  		ctcode = ''
	  	}
	    return {
	      options: regionDataPlus,
	      breedNameList: [],
	      selectedOptions: [pvcode, cicode, ctcode],
	      activeBreed: '',
	      activeBreedName: '',
	      province: pv,
	      city: ci,
	      county: ct,
	      all_breed: "全部",
	      dog_breed: "狗",
	      cat_breed: "猫"
	    }
	  },
	  mounted: function() {
	  	if (this.province!=='' && this.city === '全部'){
				const pvcode = TextToCode[this.province].code
	  		const cicode = TextToCode[this.province][this.city].code
	  		this.selectedOptions = [pvcode, cicode]
	  	} else if (this.province === '') {
	  		this.selectedOptions = [""]
	  	}
	  },
	  methods: {
	  	selected(name) {
				this.activeBreed = name;
				this.activeBreedName = ''
			},
			selectedName(name) {
				this.activeBreedName = name;
			},
	    handleChange (value) {
	    	console.log(value)
	    	this.province = CodeToText[value[0]]
	    	if (this.province !== '全部') {
	    		this.city = CodeToText[value[1]]
	    		if (this.city !== '全部') {
	    			this.county = CodeToText[value[2]]
	    		}
	    	}

	    },
	    find(name) {
	    	findBreed(name).then(res => {
	        // 后台成功返回数据
	        if (res.data.code === 1) {
	          this.breedNameList = res.data.data
	          return
	        }
	        // 失败提示
	        console.log(res.data.msg)
	      })
	    },
	    search() {
	    	const pv = sessionStorage.getItem("province")
	  		const ci = sessionStorage.getItem("city")
	  		const ct = sessionStorage.getItem("county")
	  		// console.log(this.province, pv, this.city, ci, this.county, ct)
	    	if ((this.province === pv && this.city === ci && this.county !== '') || (this.province === lo && this.city === lc && this.county !== '')) {
		    	const payload= { province: this.province, city: this.city, county: this.county, breed: this.activeBreed, breedName: this.activeBreedName }
		    	this.$emit('select',payload)
		    	this.$parent.retrievePetArticleInfo()
		    	sessionStorage.setItem("county", this.county)
	      } else if ((this.province === pv && this.city === ci && this.county === '') || (this.province === lo && this.city === lc && this.county === '')) {
		    	const payload= { province: this.province, city: this.city, county: this.county, breed: this.activeBreed, breedName: this.activeBreedName }
		    	this.$emit('select',payload)
		    	this.$parent.retrievePetArticleInfo()
	      } else if (this.province === '全部') {
	      	this.city = ''
	      	this.county = ''
	      	const payload= { province: this.province, city: this.city, county: this.county, breed: this.activeBreed, breedName: this.activeBreedName }
	      	this.$emit('select',payload)
		    	this.$parent.retrievePetArticleInfo()
		    	sessionStorage.setItem("province", "");
		    	sessionStorage.setItem("city", "");
			    sessionStorage.setItem("county", "")
		    } else {
		    	this.$confirm(`您当前位置是${lo}${lc}，是否要切换到别的位置`, '提示', {
		        confirmButtonText: '切换',
		        cancelButtonText: '取消',
		        type: 'warning'
		      }).then(() => {
		      	const payload= { province: this.province, city: this.city, county: this.county, breed: this.activeBreed, breedName: this.activeBreedName }
			    	this.$emit('select',payload)
			    	this.$parent.retrievePetArticleInfo()
			    	sessionStorage.setItem("province", this.province);
			    	sessionStorage.setItem("city", this.city);
			    	sessionStorage.setItem("county", this.county)
		        this.$message({
		          type: 'success',
		          message: '切换成功!'
		        });
		      }).catch(() => {
		        this.$message({
		          type: 'info',
		          message: '已取消切换'
		        });          
		      });
		    }
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
	.breed-box-category {
		margin-left: 60px;
	}
</style>