<template>
  <div class="option-list">
    <van-nav-bar title="理财记录" left-arrow @click-left="onClickLeft" />
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item, index) in list" :key="index">
          <van-row>
            <van-col span="10">
              <p>时间</p>
              {{ item.created_at }}
            </van-col>
            <van-col span="5">
              <p>投入/收益</p>
              {{ item.amount }}/{{ item.now }}
            </van-col>
            <van-col span="5">
              <p>预计收益</p>
              {{ item.want_amount }}
            </van-col>
            <van-col span="4" v-if="item.status == 1">
              <p>操作</p>
              <van-tag type="danger" @click="checkout(item.id)">撤销</van-tag>
            </van-col>
            <van-col span="4" v-else>
              <p>状态</p>
              {{ item.status_name }}
            </van-col>
          </van-row>
        </van-cell>
      </van-list>
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
      active: 0,
      list: [],
      loading: false,
      finished: false,
      page: 0,
      needAuth: false,
      selectedId: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      this.page++;
      this.$axios.get(`/upgrade?&page=${this.page}&size=30`).then(response => {
        let ss = response.data;
        this.list = this.list.concat(ss);
        this.loading = false;

        if (this.page >= response.meta.last_page || response.meta.total == 0) {
          this.finished = true;
        }
      });
    },
    checkout(id) {
      this.$dialog
        .confirm({
          title: "注意",
          message: "确定撤销吗"
        })
        .then(() => {
          this.selectedId = id;
          this.needAuth = true;
        })
        .catch(() => {});

      // this.$axios.put(`/upgrade/${id}`).then(res => {
      //   if (res.code == 10000) {
      //     this.list = [];
      //     this.page = 0;
      //     this.onLoad();
      //   }
      // });
    },
    readyPay(pass) {
      var toast1 = this.$toast.loading({
        message: "加载中..."
      });
      this.$axios
        .put(`/upgrade/${this.selectedId}`, {
          password: pass
        })
        .then(res => {
          if (res.code == 10000) {
            this.list = [];
            this.page = 0;
            this.needAuth = false;
            toast1.clear();
            this.onLoad();
          }
        });
    }
  }
};
</script>
<style lang="scss">
.option-list {
  .van-row {
    font-size: 10px;
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