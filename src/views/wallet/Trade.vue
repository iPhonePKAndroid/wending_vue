<template>
  <div class="trades">
    <van-nav-bar title="交易记录" left-arrow @click-left="onClickLeft" />
    <div>
      <van-tabs
        background="#282e48"
        title-active-color="#ba924a"
        v-model="activeName"
        @change="changeTokenList()"
      >
        <van-tab title="USDT" name="erc20_usdt" />
        <van-tab title="IA" name="ia" />
      </van-tabs>
      <van-cell>
        <van-row type="flex" justify="space-between">
          <van-col>时间</van-col>
          <van-col>类型</van-col>
          <van-col>金额</van-col>
          <van-col>账户/冻结</van-col>
        </van-row>
      </van-cell>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item, index) in list" :key="index">
          <van-row type="flex" justify="space-between">
            <van-col>{{ item.created_at | format}}</van-col>
            <van-col>{{ item.type_name }}</van-col>
            <van-col>
              <span v-if="item.expend" class="text-red">-{{ item.change*1 }}</span>
              <span v-else class="text-green">+{{ item.change*1 }}</span>
            </van-col>
            <van-col>{{ item.amount*1 }}/{{ item.lock_amount*1 }}</van-col>
          </van-row>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "erc20_usdt",
      list: [],
      loading: false,
      finished: false,
      type: "",
      page: 0
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      this.page++;
      this.$axios
        .get(`/trades?&token=${this.activeName}&page=${this.page}&size=30`)
        .then(response => {
          let ss = response.data;
          this.list = this.list.concat(ss);
          this.loading = false;

          if (this.page >= response.last_page || response.total == 0) {
            this.finished = true;
          }
        });
    },
    changeTokenList() {
      this.page = 0;
      this.list = [];
      this.onLoad();
    }
  },
  filters: {
    format(e) {
      return e.substring(5, 16);
    }
  }
};
</script>
<style lang="scss">
.trades {
  background: #282e48;
  .text-red {
    color: red;
  }

  .text-green {
    color: green;
  }

  .van-row {
    font-size: 10px;

    .van-col {
      flex: 1;
      text-align: center;
      // padding-left: 10px;
      // padding-right: 10px;
    }
  }
  .van-cell {
    background: #282e48;
  }
  .van-cell__value--alone {
    color: #fff;
  }
  .van-tabs__line {
    background: #ba924a;
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border: none;
  }
}
</style>