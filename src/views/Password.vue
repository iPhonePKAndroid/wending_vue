<template>
  <div class="header2">
    <van-nav-bar title="修改登录密码" left-arrow @click-left="onClickLeft" />

    <van-field
      v-model="params.old_password"
      type="password"
      required
      clearable
      label="旧登录密码"
      placeholder="请输入旧登录密码"
    />
    <van-field
      v-model="params.password"
      type="password"
      clearable
      label="新登录密码"
      placeholder="请输入登录密码"
      required
    />
    <van-field
      v-model="params.password_confirmation"
      type="password"
      clearable
      label="确认登录密码"
      placeholder="请确认新登录密码"
      required
    />

    <div class="center auth_button">
      <van-button
        size="large"
        color="linear-gradient(to right, #ba924a, #e9d495)"
        :round="true"
        @click="submit"
      >立即修改</van-button>
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
        password_confirmation: ""
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async submit() {
      let r = await this.$axios.post("/password/login", this.params);
      if (r.code == 10000) {
        this.$router.push({ name: "my" });
      }
    }
  }
};
</script>
<style lang="scss">
.header2 {
  background: #282e48;
  .center {
    text-align: center;
  }

  .auth_button {
    padding: 40px 16px;
  }
  .van-cell {
    background: inherit;
    color: #fff;
  }
}
</style>