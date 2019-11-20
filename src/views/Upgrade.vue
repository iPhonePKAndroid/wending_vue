<template>
  <div class="upgrade">
    <van-nav-bar title="理财" @click-right="onClickRight">
      <van-icon name="notes-o" slot="right" size="20" />
    </van-nav-bar>
    <div class="preview">
      <span class="title">今日收益</span>
      <div class="owned">
        <span>{{static_rate}}</span>
        <span>%</span>
      </div>
      <div>理财金额：{{ upgrade.amount*1 }} USDT</div>
    </div>
    <van-row class="notice" type="flex" justify="space-around">
      <van-col>出局倍数: {{ upgrade.out_rate }}</van-col>

      <van-col>余额USDT: {{ amount }}</van-col>
    </van-row>
    <van-grid :column-num="3" :border="false">
      <van-grid-item v-for="(value,index2) in lists" :key="index2">
        <van-button
          :color="selectedItem ==index2?'linear-gradient(to right, #ba924a, #e9d495)':''"
          size="large"
          class="button"
          @click="selectBtn(index2)"
        >{{ value.amount*1 }}</van-button>
      </van-grid-item>
    </van-grid>
    <div class="bottom-button">
      <van-button
        size="large"
        round
        color="linear-gradient(to right, #ba924a, #e9d495)"
        @click="submit()"
      >理财</van-button>
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
      lists: [],
      upgrade: {
        amount: 200,
        static_rate: 0,
        out_rate: 0
      },
      selectedItem: 0,
      needAuth: false,
      amount: "0.0000",
      static_rate: 0.0,
      countTimer: null
    };
  },
  methods: {
    onClickRight() {
      this.$router.push({ name: "upgradeList" });
    },
    getLevel() {
      this.$axios.get("level").then(res => {
        this.lists = res.data.levels;
        this.amount = res.data.amount;
        this.upgrade = this.lists[0];
        this.counter(this.upgrade.static_rate);
      });
    },
    selectBtn(key) {
      this.selectedItem = key;
      this.upgrade = this.lists[key];
      this.counter(this.upgrade.static_rate);
    },
    submit() {
      this.needAuth = true;
    },
    readyPay(pass) {
      var toast1 = this.$toast.loading({
        message: "加载中..."
      });
      this.upgrade.password = pass;
      this.$axios
        .post("upgrade", this.upgrade)
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
    },
    counter(limit) {
      this.static_rate = 0;
      this.countTimer = setInterval(() => {
        this.static_rate *= 1;
        if (this.static_rate >= limit) {
          clearInterval(this.countTimer);
        } else {
          this.static_rate = (this.static_rate + 0.1).toFixed(1);
        }
      }, 50);
    }
  },
  mounted() {
    this.getLevel();
  }
};
</script>
<style lang="scss">
.upgrade {
  // height: 100%;
  padding-bottom: 80px;
  // background: #fff;
  //   .readme {
  //     color: #969799;
  //     padding: 1rem;
  //   }
  // color: #888;
  font-size: 13px;
  .preview {
    background: #282e48;
    padding: 20px 0;
    color: #ba924a;
    text-align: center;
    line-height: 50px;
    .owned {
      color: #e9d495;
      overflow: hidden;
      span:first-child {
        font-size: 60px;
      }
      span:last-child {
        font-size: 30px;
      }
    }
  }
  .notice {
    background: #282e48;
    line-height: 60px;
    font-size: 13px;
  }
  .button {
    background-color: #282e48;
    color: #fff;
    border: none;
  }
  .title-area {
    text-align: center;
  }
  .subtitle {
    // color: #353535;
    font-size: 16px;
    line-height: 40px;
  }
  .main-text {
    font-size: 30px;
    font-weight: 600;
    color: red;
    line-height: 200px;
  }
  .bottom-button {
    padding: 0 16px;
    margin-top: 80px;
  }
  .my-popup {
    height: 50%;
    padding-top: 20px;
  }
  .van-grid-item__content {
    background: inherit;
  }
}
</style>