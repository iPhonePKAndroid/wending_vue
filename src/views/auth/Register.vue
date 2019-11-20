<template>
  <div class="header">
    <div class="logo">
      <van-image height="80px" width="80px" :src="require('../../assets/logo.png')" />
    </div>
    <div class="text">
      <!-- <van-field clearable placeholder="中国" :disabled="true" right-icon="arrow" /> -->
      <span class="field-title">账户</span>
      <van-field v-model="params.phone" maxlength="10" clearable placeholder="请输入账户" />
      <span class="field-title">名称</span>
      <van-field v-model="params.name" clearable placeholder="请输入账户名称" />
      <span class="field-title">密码</span>
      <van-field v-model="params.password" clearable placeholder="请输入密码" type="password" />
      <span class="field-title">确认密码</span>
      <van-field
        v-model="params.password_confirmation"
        clearable
        placeholder="请确认登录密码"
        type="password"
      />
      <span class="field-title">邀请码</span>
      <van-field v-model="params.code" clearable placeholder="请输入邀请码" />

      <van-checkbox v-model="checked" class="selectbox" icon-size="16" @click="tops">
        <span>同意《注册协议》</span>
      </van-checkbox>
      <div class="auth_button">
        <van-button
          color="linear-gradient(to right, #ba924a, #e9d495)"
          size="large"
          round
          @click="register"
          :disabled="!checked"
        >注册</van-button>
      </div>
      <div class="bottom-text">
        已有账号？
        <span @click="onClickLeft">立即登录</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      params: {
        phone: "",
        password: "",
        password_confirmation: "",
        code: this.$route.query.inviteCode || "",
        name: "",
        method: "register"
      },

      checked: true,
      show: true,
      count: "",
      timer: null
    };
  },
  methods: {
    affCode() {
      this.params.affcode = this.$route.query.inviteCode;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({
        name: "login"
      });
    },
    async register() {
      let res = await this.$axios.post("/register", this.params);
      if (res.code == 200) {
        this.$store.commit("login", res.data.access_token);
        this.$router.push({
          name: "pwdHelper"
        });
      }
    },
    async tops() {
      this.$router.push({
        name: "tops"
      });
    }
  },
  mounted() {
    this.affCode();
  },
  watch: {
    checked() {
      this.checked = true;
    }
  }
};
</script>
<style lang="scss">
.header {
  .logo {
    text-align: center;
    padding-top: 119px;
    padding-bottom: 30px;
  }
  .van-cell {
    background-color: inherit;
  }
  .field-title {
    padding: 0 16px;
    font-size: 13px;
  }
  .selectbox {
    padding: 10px 16px;
    font-size: 12px;
    .van-checkbox__label {
      color: #fff;
    }
  }
  .bottom-text {
    padding: 0 16px;
    text-align: right;
    font-size: 12px;
    span {
      color: #ba924a;
    }
  }
  .auth_button {
    padding: 10px 16px;
  }
}
</style>