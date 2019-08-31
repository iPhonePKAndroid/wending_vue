<template>
  <div class="trades">
    <van-nav-bar title="交易记录" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="get_trades">
        <van-cell v-for="(item,index) in data.data" :key="index">
          <div>
            {{ item.body }}
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async get_trades() {
      this.loading = true
      let r = await this.$axios.get("/trades");
      this.data = r.data
      this.loading = false
      this.finished = true
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  },
  mounted() {
    this.get_trades();
  }
};
</script>

<style lang="scss">
.trades {
}
</style>