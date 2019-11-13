<template>
    <div class="header">
        <van-nav-bar title="修改支付密码" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-cell-group>
            <van-field v-model="params.old_password" type="password" required clearable label="旧支付密码" placeholder="默认123456" />
            <van-field v-model="params.password" type="password" clearable label="支付密码" placeholder="请输入支付密码" required />
            <van-field v-model="params.password_confirmation" type="password" clearable label="确认支付密码" placeholder="请确认新支付密码" required />
        </van-cell-group>
        <div class="center auth_button">
            <van-button type="primary" size="large" :round="true" :hairline="true" :square="true" @click="submit">立即修改</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            params: {
                old_password: "",
                password: "",
                password_confirmation: '',
            }
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        async submit() {
            let r = await this.$axios.post('/password/pay', this.params)
            if (r.code == 10000) {
                this.$router.push({ name: 'my' })
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.center {
    text-align: center;
}

.auth_button {
    margin: 10px 20px 0 20px;
}
</style>