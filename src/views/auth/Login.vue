<template>
  <div class="login">
    <!-- <van-nav-bar
      :fixed="true"
      title="登录"
      left-text
      right-text="注册"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />-->

    <transition name="component-fade" mode="out-in">
      <div class="launchPage" v-if="curIndex ==1" key="el1">
        <div :class="{'img-wrapper':true,'img-wrapper-trans':isPageOk}">
          <van-image height="130px" width="133px" :src="require('../../assets/logo.png')" />
        </div>

        <div :class="{'mid-text':true,'mid-text-trans':isPageOk}">欢迎来到 IA</div>
        <div :class="{'bottom-btn':true,'bottom-btn-trans':isPageOk}">
          <van-button class="blank-bg" plain round color="#BD954E" @click="curIndex=2">登录</van-button>
          <van-button round color="#BD954E" @click="toRegister">注册</van-button>
        </div>
      </div>
      <div class="input-wrapper" v-if="curIndex==2" key="el2">
        <div class="logo">
          <van-image height="80px" width="80px" :src="require('../../assets/logo.png')" />
        </div>
        <span class="field-title">账户</span>
        <van-field v-model="params.phone" clearable placeholder="请输入账户" />
        <br />
        <span class="field-title">登录密码</span>
        <van-field
          v-model="params.password"
          clearable
          placeholder="请输入密码"
          right-icon="eye-o"
          @click-right-icon="needCheck =!needCheck"
          :type="needCheck==true?'text':'password'"
        />
        <div class="auth_button">
          <van-button
            color="linear-gradient(to right, #ba924a, #e9d495)"
            size="large"
            round
            @click="login"
          >立即登录</van-button>
        </div>
        <div class="bottom-text">
          <div>
            <span>还没有账号？</span>
            <router-link :to="{ name: 'register' }">
              <span style="color:#ba924a">点击注册</span>
            </router-link>
          </div>
          <div>
            <router-link :to="{ name: 'resetPwd' }">
              <span style="color:#fff">忘记密码</span>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  data() {
    return {
      params: {
        phone: "",
        password: ""
      },
      isPageOk: false,
      curIndex: 1,
      needCheck: false
    };
  },
  methods: {
    async toRegister() {
      // this.$toast('按钮');
      this.$router.push({
        name: "register"
      });
    },
    async login() {
      this.$axios.post("/login", this.params).then(response => {
        this.$store.commit("login", response.data.access_token);
        this.$router.push({
          name: "home"
        });
      });
    }
  },
  mounted() {
    var timer = setTimeout(() => {
      this.isPageOk = true;
    }, 1000);
  }
};
</script>

<style lang="scss">
.login {
  height: 100%;
  .launchPage {
    height: 100%;
    background-image: url("../../assets/bgImg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    .img-wrapper {
      transition: all 500ms ease-in 500ms;
      padding-top: 130px;
      text-align: center;
      opacity: 0;
    }
    .img-wrapper-trans {
      opacity: 1;
      padding-top: 180px;
    }
    .mid-text {
      transition: opacity 500ms ease-in 500ms;
      text-align: center;
      color: #bd954d;
      opacity: 0;
      font-size: 24px;
      padding-top: 30px;
      letter-spacing: 1;
    }
    .mid-text-trans {
      opacity: 1;
    }
    .bottom-btn {
      transition: all 500ms ease-in 500ms;
      position: absolute;
      bottom: 0px;
      opacity: 0;
      width: 100%;
      display: flex;
      justify-content: space-around;
      .van-button--normal {
        padding: 0 57px;
      }
      .blank-bg {
        background-color: transparent;
      }
    }
    .bottom-btn-trans {
      bottom: 103px;
      opacity: 1;
    }
  }
  .component-fade-enter-active,
  .component-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }
  .input-wrapper {
    .van-cell {
      background-color: inherit;
    }
    .field-title {
      padding: 0 16px;
      font-size: 13px;
    }
    .logo {
      text-align: center;
      padding-top: 119px;
      padding-bottom: 30px;
    }

    .center {
      text-align: center;
    }

    .auth_button {
      padding: 80px 16px 10px 16px;
    }
    .bottom-text {
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>