<template>
  <div class="recharge">
    <van-nav-bar title="充值" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="notes-o" slot="right" size="20" />
    </van-nav-bar>

    <div class="content-wrapper">
      <div class="amount">
        <span>余额:</span>
        <span>{{ wallet.amount }} {{ wallet.token.cn_name }}</span>
      </div>
    </div>

    <div>
      <h4 class="center alert">请将{{ wallet.token.cn_name }}发送到以下地址</h4>
    </div>

    <div class="qrcode center">
      <van-image width="150" height="150" :src="wallet.qrcode_url" />
    </div>

    <div class="alert center">
      <p>{{ wallet.address }}</p>
    </div>
    <div class="center">
      <van-button color="#ba924a" size="small" @click="copy(wallet.address)">复制钱包地址</van-button>
    </div>
    <br />
    <br />
    <br />
    <div class="distinct"></div>
    <div class="readme">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="说明" name="1">
          <div class="text">此地址仅接受USDT充值，单笔小于10金额将不会到账，任何低于最小金额或者非USDT的充值金额将无法找回。</div>
          <div class="text">由于转账需要整个区块网络节点的确认，所以到账时间由区块网络拥堵决定，12次确认后将入账。</div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["1"],
      wallet: {
        address: "-",
        amount: "0",
        lock_amount: "0",
        qrcode_url: "-",
        token: {
          icon: "-",
          cn_name: "-",
          en_name: "-"
        }
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({
        name: "recharge.index"
      });
    },
    async get_wallet() {
      let wallet = await this.$axios.get("/wallet/recharge");
      this.wallet = wallet.data;
    },
    async copy(address) {
      this.$clipboard(address);
      this.$toast("复制成功");
    }
  },
  mounted() {
    this.get_wallet();
  }
};
</script>

<style lang="scss">
.recharge {
  background: #282e48;
  .amount {
    // background: #3F79FE;
    text-align: center;
    color: #ba924a;
    padding-top: 40px;
    span:last-child {
      font-size: 28px;
    }
  }

  .alert {
    color: #aaa;
  }

  .center {
    text-align: center;
    font-size: 12px;
  }

  .qrcode {
    // margin-top: 2rem;
  }

  .readme {
    .text {
      margin-bottom: 1rem;
    }
    .van-hairline--top-bottom::after,
    .van-hairline-unset--top-bottom::after {
      border: none;
    }
  }
  .distinct {
    height: 5px;
    background: #1b2034;
  }
}
</style>