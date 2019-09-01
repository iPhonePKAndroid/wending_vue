<template>
  <div class="header">

    <van-nav-bar title="修改密码" left-text="返回" left-arrow @click-left="onClickLeft" />


    <van-cell-group>
      <van-field
      v-model="params.old_password"
      required
      clearable
      label="旧密码"
      placeholder="请输入旧密码"
      />

      <van-field
      v-model="params.password"
      type="password"
      clearable
      label="密码"
      placeholder="请输入密码"
      required
      />
      <van-field
      v-model="params.password_confirmation"
      type="password"
      clearable
      label="确认密码"
      placeholder="请确认新密码"
      required
      />
    </van-cell-group>

      <div class="center auth_button">
        <van-button type="info" size="large" :round="true" :hairline="true" :square="true" @click="submit">立即登录</van-button>
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
        let r = await this.$axios.post('/password',this.params)
        console.log(r)
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