<template>
    <div class="header">
        <div class="nav">
            <van-nav-bar :fixed="true" title="注册" left-arrow right-text="登录" @click-left="onClickLeft" @click-right="onClickRight" />
        </div>
        <div class="text">
            <van-cell-group>
                <van-field clearable placeholder="中国" :disabled="true" right-icon="arrow" />
                <van-field v-model="params.name" clearable placeholder="请输入账户名称" />
                <van-field v-model="params.phone" clearable placeholder="请输入手机号码" />
                <van-field v-model="params.password" clearable placeholder="请输入密码" type="password" />
                <van-field v-model="params.password_confirmation" clearable placeholder="请确认登录密码" type="password" />
                <van-field v-model="params.code" clearable placeholder="请输入邀请码" />
            </van-cell-group>
            <van-checkbox v-model="checked" class="selectbox" icon-size="16" @click="tops">
                <div style="color:black;">同意《注册协议》</div>
            </van-checkbox>
            <div class="center auth_button">
                <div>
                    <van-button type="primary" :hairline="true" :square="true" size="large" @click="register" :disabled="!checked">注册</van-button>
                </div>
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
  .van-checkbox__label {
    color: white;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar {
    background-color: #13141a;
  }
  .van-hairline--bottom::after {
    border: none;
  }
  .selectbox {
    margin: 1rem;
    font-size: 0.8rem;
    color: #fff;
  }

  .center {
    text-align: center;
  }

  .margin-top-10 {
    margin-top: 10px;
  }
}
</style>