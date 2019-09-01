<template>
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