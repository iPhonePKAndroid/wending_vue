<template>
    <div class="header">
        <van-nav-bar title="修改登录密码" left-arrow @click-left="onClickLeft" />
        <van-cell-group>
            <van-field v-model="params.old_password" type="password" required clearable label="旧登录密码" placeholder="请输入旧登录密码" />
            <van-field v-model="params.password" type="password" clearable label="新登录密码" placeholder="请输入登录密码" required />
            <van-field v-model="params.password_confirmation" type="password" clearable label="确认登录密码" placeholder="请确认新登录密码" required />
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
            let r = await this.$axios.post('/password/login', this.params)
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