<template>
    <div>

        <div class="swiper">
            <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
            </van-swipe-item>
            </van-swipe>
        </div>

        <div class="swiper">
            <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
            </van-swipe-item>
            </van-swipe>
        </div>

        <div class="swiper">
            <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
            </van-swipe-item>
            </van-swipe>
        </div>

        <div class="swiper">
            <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
            </van-swipe-item>
            </van-swipe>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
              images: [
                'https://img.yzcdn.cn/vant/apple-1.jpg',
                'https://img.yzcdn.cn/vant/apple-2.jpg',
              ],
           }
       },
       methods: {
       },
   }
</script>

<style lang="scss">
.swiper {
    img {
        width: 100%;
        height: 200px;
    }
}
</style>