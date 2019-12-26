<template>
  <div class="exchange">
    <van-nav-bar title="兑换" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="notes-o" slot="right" size="20" />
    </van-nav-bar>
    <div class="replace">
      <!-- <van-panel status="闪兑IA"> -->
      <van-row class="bit-img-wrapper" type="flex" justify="space-around">
        <van-col>
          <van-image
            height="36px"
            width="36px"
            src="https://cdn.mytoken.org/Fp2vnCNJY7QudKwqR2mA4tt3Cmhl"
          ></van-image>
        </van-col>
        <van-col>
          <van-image
            height="36px"
            width="36px"
            src="https://cdn.mytoken.org/FkonJbqGpUId6qy6AiVVURateiLD"
          ></van-image>
        </van-col>
      </van-row>

      <van-row class="amount-text" type="flex" justify="space-around">
        <van-col>USDT 余额: {{ info.usdt }}</van-col>
        <van-col>IA 余额: {{ info.ia }}</van-col>
      </van-row>
      <van-row class="input-area" type="flex" justify="center" align="center">
        <van-col span="11">
          <van-field
            v-model="params.amount"
            type="number"
            @input="input()"
            input-align="center"
            size="12"
            maxlength="7"
            placeholder="请输入兑换数量"
          >
            <span slot="right-icon">USDT</span>
          </van-field>
        </van-col>
        <van-col class="mid-icon" span="2">
          <van-icon name="exchange" />
        </van-col>
        <van-col span="11">
          <van-field
            v-model="params.ia"
            disabled="true"
            input-align="center"
            size="12"
            maxlength="7"
          >
            <span slot="right-icon">IA</span>
          </van-field>
        </van-col>
      </van-row>
      <van-row class="bottom-text">
        <van-col>
          <span>汇率：1 USDT ≈ {{info.rate}} IA</span>
        </van-col>
      </van-row>
      <div class="submit-button">
        <van-button
          color="linear-gradient(to right, #ba924a, #e9d495)"
          :round="true"
          size="large"
          @click="submit()"
          :disabled="params.amount == 0"
        >立即兑换</van-button>
      </div>
    </div>
    <van-popup class="my-popup" position="bottom" v-model="needAuth">
      <authPay ref="myAuth" v-on:readyPay="readyPay"></authPay>
    </van-popup>
  </div>
</template>
<script>
import authPay from "../components/authPay";
export default {
  components: {
    authPay
  },
  data() {
    return {
      info: {
        usdt: "0",
        ia: "0",
        rate: 1
      },
      params: {
        amount: "",
        ia: ""
      },
      needAuth: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({ name: "exchangeList" });
    },
    input() {
      this.params.ia = (this.params.amount * this.info.rate).toFixed(4);
      if (this.params.amount == "") {
        this.params.ia = "";
      }
    },
    async getInfo() {
      let res = await this.$axios.get("/replace/info");
      this.info = res.data;
    },
    async submit() {
      this.needAuth = true;
    },
    async readyPay(pass) {
      var toast1 = this.$toast.loading({
        message: "加载中..."
      });
      this.params.password = pass;
      try {
        let r = await this.$axios.post("/replace", this.params);

        if (r.code == 10000) {
          this.onClickRight();
        }
        this.needAuth = false;
        this.$refs.myAuth.clear();
      } catch (error) {
        this.needAuth = false;
        this.$refs.myAuth.clear();
      }

      this.getInfo();
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>
<style lang="scss">
.exchange {
  // text-align: center;
  // position: relative;
  height: 100%;
  // background-color: white;
  // padding-bottom: 100%;

  .replace {
    padding-top: 50px;
    background: #282e48;
    .bit-img-wrapper {
      .van-image {
        border-radius: 1000px;
        overflow: hidden;
      }
    }
    .amount-text {
      color: #ba924a;
      font-size: 13px;
    }
    .input-area {
      margin-top: 30px;
      .mid-icon {
        display: flex;
        justify-content: center;
      }
      .van-field {
        border-bottom: 1px solid #454c6c;
      }
      .van-cell {
        padding: 10px 0;
      }
      .van-col:first-child {
        padding: 0 16px;
      }
      .van-col:last-child {
        padding: 0 16px;
      }
    }
    .bottom-text {
      font-size: 10px;
      padding: 5px 16px;
      color: #ba924a;
    }
    .submit-button {
      padding: 16px;
      .van-button {
        font-size: 12px;
      }
    }
  }
  .van-cell {
    color: #fff;
    background: #282e48;
    .van-cell__value--alone {
      color: white;
    }
  }

  .my-popup {
    height: 50%;
    padding-top: 20px;
  }
}
</style>