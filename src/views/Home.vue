<template>
<<<<<<< HEAD
    <div class="home">

        <template v-for="banenr in banners">

            <div class="swiper">
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(image, index) in banenr.banners" :key="index">
                        <img v-lazy="image.path" />
                    </van-swipe-item>
                </van-swipe>
            </div>

        </template>

    </div>
=======
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="欢迎使用快速开发框架"/>
  </div>
>>>>>>> 425629bc78a3a96b74b399d8f1a6a254d956c802
</template>

<script>
    export default {
        data() {
            return {
                banners: [
                ],
            }
        },
        methods: {
            async get_banners() {
                let banners = await this.$axios.get('/banners')
                this.banners = banners.data
            },
        },
        mounted() {
            this.get_banners()
        },
    }
</script>

<style lang="scss">
.home {
    padding-bottom: 5rem;

    .swiper {
        img {
            width: 100%;
            height: 200px;
        }
    }
}
</style>