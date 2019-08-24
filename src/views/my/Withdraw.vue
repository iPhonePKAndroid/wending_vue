<template>
  <div class="withdraw">
    <van-nav-bar title="提现" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="notes-o" slot="right" size=20 />
    </van-nav-bar>



    <div class="input">

      <van-cell-group>
        <van-field v-model="params.amount" required clearable label="提现金额" placeholder="请输入提现金额" />

        <van-field v-model="params.address" required clearable label="接收地址" placeholder="请输入提现地址" />

      </van-cell-group>


    </div>

    <div class="readme">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="说明" name="1">
          <div class="text">
            此地址仅接受USDT充值，单笔小于10金额将不会到账，任何低于最小金额或者非USDT的充值金额将无法找回。
          </div>
          <div class="text">
            由于转账需要整个区块网络节点的确认，所以到账时间由区块网络拥堵决定，12次确认后将入账。
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>


    <div class="submit">

      <van-button round type="danger" size="normal" color="#1989fa">下一步</van-button>


    </div>



  </div>
</template>

<script>
  export default {
    data() {
      return {
        params: {
          amount: '',
          address: '',
        },
        activeNames: ['1'],
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      onClickRight() {
        this.$router.push({
          name: 'withdraw.index'
        });
      },
    },
  }
</script>

<style lang="scss">
.withdraw {

  .input {
    margin-top: 1rem;
  }

  .readme {
    margin-top: 1rem;

    .text {
      margin-bottom: 1rem;
    }
  }

  .submit {
    margin-top: 1rem;
    text-align: center;

    .van-button {
      width: 80%;
    }
  }

}
</style>