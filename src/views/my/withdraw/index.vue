<template>
  <div class="withdraw-list">
    <van-nav-bar title="提现记录" left-arrow @click-left="onClickLeft" />
    <div>
      <van-cell>
        <van-row type="flex" justify="space-between">
          <van-col>时间</van-col>
          <van-col>金额/手续费/到账</van-col>
          <van-col>状态</van-col>
        </van-row>
      </van-cell>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item, index) in list" :key="index" @click="showDetail(item)">
          <van-row type="flex" justify="space-between">
            <van-col>{{ item.created_at|format }}</van-col>
            <van-col>{{ item.amount*1 }}/{{ item.fee*1 }}/{{ item.out_amount*1 }}</van-col>
            <van-col>{{ item.status_name }}</van-col>
          </van-row>
        </van-cell>
      </van-list>
    </div>
    <van-dialog v-model="show" title="详情" show-cancel-button>
      <van-cell title="数量" :value="selectedItem.amount" />
      <van-cell title="手续费" :value="selectedItem.fee" />
      <van-cell title="Hash" :value="selectedItem.hash" value-class="hash-value" />
      <van-cell title="Memo" :value="selectedItem.memo" />
      <van-cell title="到账金额" :value="selectedItem.out_amount" />
      <van-cell title="备注" :value="selectedItem.remark" />
      <van-cell title="状态" :value="selectedItem.status_name" />
      <van-cell title="地址" :value="selectedItem.to_address" />
    </van-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      type: "",
      page: 0,
      show: false,
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
        .get(`wallet/withdraws?&page=${this.page}&size=30`)
        .then(response => {
          let ss = response.data;
          this.list = this.list.concat(ss);
          this.loading = false;

          if (this.page >= response.last_page || response.total == 0) {
            this.finished = true;
          }
        });
    },
    showDetail(e) {
      this.selectedItem = e;
      this.show = true;
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
.withdraw-list {
  .text-red {
    color: red;
  }

  .text-green {
    color: green;
  }
  .van-cell {
    color: #fff;
    background: #282e48;
    .van-cell__value--alone {
      color: white;
    }
  }

  .van-row {
    font-size: 10px;
    color: #fff;
    .van-col {
      flex: 1;
      text-align: center;
    }
  }
  .van-dialog {
    background: #282e48;
    .hash-value {
      word-wrap: break-word;
      flex: 4;
    }
  }
}
</style>