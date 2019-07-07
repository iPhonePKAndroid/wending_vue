<template>
  <div class="header">
    <div class="nav">
      <van-nav-bar
        :fixed="true"
        title="注册"
        left-arrow
        left-text=" "
        right-text
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="text">
      <van-cell-group>
        <van-field clearable placeholder="中国" :disabled="true" right-icon="arrow" />
        <van-field v-model="params.name" clearable placeholder="请输入账户名称" />
        <van-field v-model="params.phone" clearable placeholder="请输入手机号码" />
        <van-field v-model="params.password" clearable placeholder="请输入密码" type="password" />
        <van-field
          v-model="params.password_confirmation"
          clearable
          placeholder="请确认登录密码"
          type="password"
        />
        <van-field v-model="params.affcode" clearable placeholder="请输入邀请码" />

        <van-field v-model="params.code" center clearable placeholder="请输入短信验证码">
          <van-button
            v-show="show"
            @click="getCode()"
            slot="button"
            size="small"
            type="primary"
          >发送验证码</van-button>
          <van-button
            v-show="!show"
            :disabled="!show"
            slot="button"
            size="small"
            type="primary"
          >{{ count }}秒后重试</van-button>
        </van-field>
      </van-cell-group>
      <van-checkbox v-model="checked" class="selectbox" icon-size="16" @click="tops">
        <div style="color:#fff">同意《注册协议》</div>
      </van-checkbox>
      <div class="goin">
        <van-button
          type="primary"
          :hairline="true"
          :square="true"
          @click="register"
          :disabled="!checked"
        >注册</van-button>
      </div>
      <div class="text-center register_and_password">
        已经有账号？
        <router-link :to="{ name: 'login' }" style="color: #07c160;">立即登录</router-link>
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
        code: "",
        name: "",
        affcode: "",
        method: "register"
      },

      checked: true,
      show: true,
      count: "",
      timer: null,
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
      // this.$toast('按钮');
      this.$router.push({
        name: "my.payment.add"
      });
    },
    register() {
      this.$axios.post("/register", this.params).then(res => {
        if (res.code == 10000) {
          this.$router.push({
            name: "app"
          });
        }
      });
    },
    async getCode() {
      if (!this.timer) {
        let res = await this.$axios.post("/sendcode", this.params);

        this.count = 60;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= 60) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    async tops() {
      this.$router.push({
        name: 'tops'
      })
    },
  },
  mounted() {
    this.affCode();
  },
  watch: {
    checked() {
      this.checked = true
    }
  },
};
</script>
<style lang="scss">
.selectbox {
  margin: 1rem;
  font-size: 0.8rem;
  color: #fff;
}
</style>