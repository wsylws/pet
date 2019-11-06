<template>
  <div class="container">
    <el-carousel :interval="4000" type="card" height="300px" width="970px">
      <el-carousel-item v-for="item in swiperList" :key="item.id">
        <img class="swiper-image" :src="item.imgUrl" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: 'HomeSwiper',
    data() {
      return {
        // 在data中使用别名要加require
        swiperList: [{
          id: '0001',
          imgUrl: require('@/images/swiper1.jpg')
        }, {
          id: '0002',
          imgUrl: require('@/images/swiper2.jpg')
        }, {
          id: '0003',
          imgUrl: require('@/images/swiper3.jpg')
        }, {
          id: '0004',
          imgUrl: require('@/images/swiper4.jpg')
        },]
      }
    }
  }
</script>

<style>
  .container {
    width: 970px;
    margin: 0 auto;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .swiper-image {
    width: 100%;
  }
</style>
