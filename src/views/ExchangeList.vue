<template>
  <div class="trades">
    <van-nav-bar title="兑换记录" left-arrow @click-left="onClickLeft" />
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item, index) in list" :key="index">
          <van-row gutter="20">
            <van-col span="9">
              <p>时间</p>
              {{ item.created_at }}
            </van-col>
            <van-col span="6">
              <p>支出(USDT)</p>
              {{ item.amount }}
            </van-col>
            <van-col span="4">
              <p>价格</p>
              {{ item.rate }}
            </van-col>
            <van-col span="5">
              <p>收入(IA)</p>
              {{ item.income }}
            </van-col>
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
      active: 0,
      list: [],
      loading: false,
      finished: false,
      page: 0
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      this.page++;
      this.$axios.get(`/replace?&page=${this.page}&size=30`).then(response => {
        let ss = response.data;
        this.list = this.list.concat(ss);
        this.loading = false;

        if (this.page >= response.meta.last_page || response.meta.total == 0) {
          this.finished = true;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.trades {
  .van-row {
    font-size: 10px;
  }
}
</style>