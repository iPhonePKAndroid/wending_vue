<template>
    <div class="withdraw">
        <van-nav-bar title="提现" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="notes-o" slot="right" size=20 />
        </van-nav-bar>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onClickRight() {
              this.$router.push({
                name: 'withdraw.index'
              });
            },
        },
    }
</script>

<style lang="scss">
.withdraw {
    
}
</style>