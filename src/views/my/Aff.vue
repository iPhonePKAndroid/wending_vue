<template>
    <div class="aff">
        <van-nav-bar title="我的邀请码" left-arrow right-text="分享" @click-left="onClickLeft" @click-right="onClickRight" />

        <div class="invite">
            <van-image :src="params.img" />
        </div>
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                params: {
                    code: '',
                    img: '',
                },
                show: false,
                actions: [
                    { id: 1, name: '保存图片', },
                    { id: 2, name: '复制邀请码' },
                    { id: 3, name: '复制邀请内容' },
                ]
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {
                this.show = true
            },
            onSelect(item) {
                this.show = false;
                if (item.id === 1) {
                    this.$toast('请截图保存');
                } else if(item.id === 2) {
                    this.$clipboard(this.params.code)
                    this.$toast('复制成功');
                } else {
                    this.$clipboard(`创造无限财富，从这里开始获得：https://imhtt.com/register?inviteCode=${this.params.code}`)
                    this.$toast('复制成功');
                }
          },
          async get_aff() {
            let aff = await this.$axios.get('/aff')
            this.params = aff.data
          },
      },
      mounted() {
        this.get_aff()
      },
 }
</script>
<style lang="scss">
.aff {
    margin-bottom: 5rem;
    .van-image {
        width: 100%;
        height: 100%;
    }
}
</style>