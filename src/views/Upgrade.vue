<template>
  <div class="upgrade">
    <van-nav-bar title="投单" @click-right="onClickRight">
      <van-icon name="notes-o" slot="right" size="20" />
    </van-nav-bar>
    <van-row class="title-area">
      <span>投单金额:</span>
      <span class="main-text">{{ upgrade.amount }}</span>
    </van-row>
    <van-grid :column-num="3">
      <van-grid-item text="每日收益">
        <span class="subtitle" slot="icon">{{ upgrade.static_rate }}%</span>
      </van-grid-item>
      <van-grid-item text="出局倍数">
        <span class="subtitle" slot="icon">{{ upgrade.out_rate }}%</span>
      </van-grid-item>
      <van-grid-item text="余额">
        <span class="subtitle" slot="icon">无</span>
      </van-grid-item>
    </van-grid>

    <van-grid :column-num="3" :border="false">
      <van-grid-item v-for="(value,index2) in lists" :key="index2">
        <van-button
          size="large"
          :type="selectedItem==index2?'primary':'default'"
          @click="selectBtn(index2)"
        >{{ value.amount*1 }}</van-button>
      </van-grid-item>
    </van-grid>
    <div class="bottom-button">
      <van-button size="large" type="primary" @click="submit()">投单</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lists: [],
      upgrade: {
        amount: 200,
        static_rate: 0,
        out_rate: 0
      },
      selectedItem: 0
    };
  },
  methods: {
    onClickRight() {
      this.$router.push({ name: "upgradeList" });
    },
    getLevel() {
      this.$axios.get("level").then(res => {
        this.lists = res.data;
        this.upgrade = this.lists[0];
      });
    },
    selectBtn(key) {
      this.selectedItem = key;
      this.upgrade = this.lists[key];
    },
    submit() {
      this.$axios.post("upgrade", this.upgrade).then(res => {
        if (res.code == 10000) {
          this.onClickRight();
        }
      });
    }
  },
  mounted() {
    this.getLevel();
  }
};
</script>
<style lang="scss">
.upgrade {
  height: 100%;
  background: #fff;
  //   .readme {
  //     color: #969799;
  //     padding: 1rem;
  //   }
  color: #888;
  .title-area {
    text-align: center;
  }
  .subtitle {
    color: #353535;
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
    bottom: 50px;
    width: 100%;
    position: absolute;
  }
}
</style>