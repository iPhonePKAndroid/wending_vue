<template>
  <div class="show_recharge">
    <div class="nav">
      <van-nav-bar title="充值记录" left-arrow @click-left="onClickLeft" />
    </div>
    <van-cell>
      <van-row type="flex" justify="space-between">
        <van-col>数量</van-col>
        <van-col>余额</van-col>
        <van-col>时间</van-col>
      </van-row>
    </van-cell>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, index) in list" :key="index" @click="look(item)">
        <van-row type="flex" justify="space-between">
          <van-col>{{ item.amount }}</van-col>
          <van-col>{{item.balance}}</van-col>
          <van-col>{{ item.created_at |format }}</van-col>
        </van-row>
      </van-cell>
    </van-list>

    <van-dialog v-model="show" title="详情" show-cancel-button>
      <van-cell title="交易数量数量" :value="selectedItem.amount" />
      <van-cell title="交易前余额" :value="selectedItem.balance" />
      <van-cell title="Hash" :value="selectedItem.hash" value-class="hash-value" />
      <van-cell title="来源地址" :value="selectedItem.from_address" value-class="hash-value" />
      <van-cell title="备注" :value="selectedItem.remark" />
      <van-cell title="充值时间" :value="selectedItem.created_at" />
    </van-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      hash: "",
      active: 0,
      list: [],
      loading: false,
      finished: false,
      type: "",
      page: 0,
      selectedItem: {}
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      this.page++;
      this.$axios
        .get(`/wallet/recharges?&page=${this.page}&size=30`)
        .then(response => {
          let ss = response.data;
          this.list = this.list.concat(ss);
          this.loading = false;
          if (
            this.page >= response.last_page ||
            response.data.data.total == 0
          ) {
            this.finished = true;
          }
        });
    },
    look(hash) {
      this.selectedItem = hash;
      this.show = true;
    },
    async get_list() {
      let list = await this.$axios.get("/wallet/recharges");
      this.list = list.data;
    }
  },
  filters: {
    format(e) {
      return e.substring(5, 16);
    }
  },
  mounted() {
    this.get_list();
  }
};
</script>
<style lang="scss">
.show_recharge {
  .amount {
    background: #282e48;
    padding: 1rem;
    text-align: center;
  }

  .van-cell,
  .van-tab--active,
  .van-cell__value--alone {
    color: white;
    background: #282e48;
  }

  .van-row {
    font-size: 12px;
    .van-col {
      flex: 1;
      text-align: center;
    }
  }

  .van-popup {
    // padding: 5rem;
    color: white;
    padding-top: 3rem;
    text-align: center;
    padding-bottom: 3rem;
    word-wrap: break-word;
    word-break: break-all;
    background-color: #5e6b6d;
  }
  .van-dialog {
    background: #282e48;
    .hash-value {
      word-wrap: break-word;
      flex: 3;
    }
  }
}
</style>