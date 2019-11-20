<template>
  <div class="withdraw">
    <van-nav-bar title="提现" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="notes-o" slot="right" size="20" />
    </van-nav-bar>
    <div class="select">
      <span>IA账户: {{ info.amount }}</span>
    </div>
    <div class="input">
      <van-field
        v-model="params.amount"
        type="number"
        @input="getFee"
        required
        clearable
        label="提现金额"
        placeholder="请输入提现金额"
      />
      <van-field v-model="params.address" required clearable label="接收地址" placeholder="请输入提现地址" />
      <van-field v-model="params.memo" required clearable label="Memo" placeholder="请输入Memo" />
      <van-field v-model="feeRes" disabled label="手续费" />
    </div>

    <div class="readme">
      <van-panel title="说明" :desc="`每次提现手续费 ${info.fee }%`"></van-panel>
    </div>
    <div class="submit">
      <van-button
        round
        color="linear-gradient(to right, #ba924a, #e9d495)"
        size="large"
        :loading="button.loading"
        :disabled="this.params.amount == '' || this.params.address == '' || this.params.memo == ''"
        @click="submit"
      >下一步</van-button>
    </div>
    <van-number-keyboard
      :show="show"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
    <van-popup class="my-popup" position="bottom" v-model="needAuth">
      <authPay ref="myAuth" v-on:readyPay="readyPay"></authPay>
    </van-popup>
  </div>
</template>
<script>
import authPay from "../../components/authPay";
export default {
  components: {
    authPay
  },
  data() {
    return {
      show: false,

      button: {
        loading: false,
        disabled: false
      },
      info: {
        amount: "0.0000",
        fee: 0
      },
      params: {
        amount: "",
        address: "",
        memo: "",
        password: ""
      },
      feeRes: "0.0000",
      activeNames: ["1"],
      needAuth: false
    };
  },
  methods: {
    onInput(value) {
      this.params.password += value;
    },
    onDelete() {
      this.params.password = this.params.password.substring(
        0,
        this.params.password.length - 1
      );
      this.params.password.length - 1;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({
        name: "withdraw.index"
      });
    },
    async get_info() {
      let info = await this.$axios.get("/withdraw/info");
      this.info = info.data;
    },
    async submit() {
      //   this.button.loading = true;
      this.needAuth = true;

      //   this.button.loading = false;
    },
    getFee(e) {
      if (e) {
        this.feeRes = ((e * this.info.fee) / 100).toFixed(4);
      } else {
        this.feeRes = "0.0000";
      }
    },

    readyPay(pass) {
      var toast1 = this.$toast.loading({
        message: "加载中..."
      });
      this.params.password = pass;
      this.$axios
        .post("wallet/withdraw", this.params)
        .then(res => {
          if (res.code == 10000) {
            this.onClickRight();
          }
          this.needAuth = false;
          this.$refs.myAuth.clear();
        })
        .catch(err => {
          this.needAuth = false;
          this.$refs.myAuth.clear();
        });
    }
  },
  mounted() {
    this.get_info();
  },
  watch: {
    params: {
      handler: function(newValue) {
        // console.log('你修改了a对象(watch deep)', newValue.type, oldValue.type)

        if (newValue.type == "amount") {
          this.placeholder = "收费";
        } else {
          this.placeholder = "免费";
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
.withdraw {
  .van-number-keyboard {
    background-color: #cecece;
  }

  .van-key--gray {
    // background-color: #7aaaf3;
  }

  .select {
    background: #282e48;
    line-height: 50px;
    padding: 0 16px;
  }

  .input {
    margin-top: 7px;

    .van-field--disabled .van-field__control,
    .van-field__right-icon {
      color: red;
    }
  }

  .readme {
    .van-hairline--top-bottom::after,
    .van-hairline-unset--top-bottom::after {
      border: none;
    }
  }
  .van-cell {
    color: #fff;
    background: #282e48;
    .van-cell__value--alone {
      color: white;
    }
  }
  .submit {
    padding: 20px 16px;
  }

  .my-popup {
    height: 50%;
    padding-top: 20px;
  }
}
</style>