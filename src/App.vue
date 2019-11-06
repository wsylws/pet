<template>
  <div id="app">
    <Header class="header"/>
    <router-view v-if="isRouterAlive"/>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  name: 'app',
  provide () {
  	return {
  		reload: this.reload
  	}
  },
  data() {
  	return {
  		isRouterAlive: true
  	}
  },
  methods: {
  	reload() {
  		this.isRouterAlive = false
  		this.$nextTick(function(){
  			this.isRouterAlive = true
  		})
  	}
  },
  computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
      }
   }
}
</script>

<style>
  @import "styles/common.css";
  
</style>
