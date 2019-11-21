<template>
  <div class="my">
    <van-nav-bar title="我的" />
    <div class="bg">
      <van-cell :title="user.name">
        <van-image
          slot="icon"
          width="60"
          height="60"
          lazy-load
          round
          :src="require('../assets/logo.png')"
        />
        <div slot="label">
          <span>{{user.phone}}</span>
          <div class="label-area">
             邀请码：{{user.code}}
            <van-icon name="wap-nav" @click="toCopy(user.code)" />
          </div>
        </div>
      </van-cell>
    </div>
    <div class="trade">
      <van-row align="bottom" justify="space-between" type="flex">
        <van-col span="6">
          <div class="center" @click="go('recharge')">
            <van-icon name="paid" />
            <span class="text">充值</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="center" @click="go('withdraw')">
            <van-icon name="vip-card-o" />
            <span class="text">提现</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="center" @click="go('trades')">
            <van-icon name="todo-list-o" />
            <span class="text">交易</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="center" @click="go('exchange')">
            <van-icon name="exchange" />
            <span class="text">兑换</span>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="no"></div>
    <div>
      <van-cell title="团队人数" :value="user.team_count">
        <van-icon color="#ba924a" slot="icon" name="friends-o" size="20" />
      </van-cell>
      <van-cell title="直推人数" :value="user.direct_count">
        <van-icon color="#ba924a" slot="icon" name="manager-o" size="20" />
      </van-cell>
      <van-cell title="团队业绩" :value="user.team_amount">
        <van-icon color="#ba924a" slot="icon" name="chart-trending-o" size="20" />
      </van-cell>
    </div>
    <div class="no"></div>
    <div>
      <van-cell title="我的团队" is-link @click="go('my.team')">
        <van-icon color="#ba924a" slot="icon" name="cluster-o" size="20" />
      </van-cell>
      <van-cell title="我的收益" is-link @click="go('my.profit')">
        <van-icon color="#ba924a" slot="icon" name="balance-o" size="20" />
      </van-cell>
      <van-cell title="邀请好友" is-link @click="go('my.aff')">
        <van-icon color="#ba924a" slot="icon" name="share" size="20" />
      </van-cell>
      <van-cell title="修改登录密码" is-link @click="go('password')">
        <van-icon color="#ba924a" slot="icon" name="warn-o" size="20" />
      </van-cell>
      <van-cell title="修改支付密码" is-link @click="go('pay-pass')">
        <van-icon color="#ba924a" slot="icon" name="balance-pay" size="20" />
      </van-cell>
    </div>
    <div class="no"></div>
    <div>
      <van-cell title="APP下载" is-link @click="go('app')">
        <van-icon color="#ba924a" slot="icon" name="down" size="20" />
      </van-cell>
      <van-cell title="退出登录" is-link @click="logout">
        <van-icon color="#ba924a" slot="icon" name="home-o" size="20" />
      </van-cell>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        name: "-",
        phone: "-",
        direct_count: 0,
        team_count: 0
      }
    };
  },
  methods: {
    go(name) {
      this.$router.push({
        name: name
      });
    },
    logout() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认退出吗？"
        })
        .then(() => {
          this.$store.commit("logout");
          this.$router.push({
            name: "login"
          });
        })
        .catch(() => {});
    },
    async profile() {
      let user = await this.$axios.get("/user");
      this.user = user.data;
    },
    toCopy(val) {
      console.log(val);
      this.$clipboard(val);
      this.$toast({
        message: "成功",
        duration: 1500
      });
    }
  },
  mounted() {
    this.profile();
  }
};
</script>
<style lang="scss">
.my {
  //   text-align: center;
  padding-bottom: 5rem;

  .bg {
    background-color: #282e48;
    // background-image: url('../assets/profile.gif');
    padding-top: 10px;
    padding-bottom: 20px;
    .van-cell {
      background-color: #282e48;
      .van-cell__title {
        padding-top: 10px;
        padding-left: 20px;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .label-area {
      display: flex;
      align-items: center;
      .van-icon {
        padding: 5px;
      }
    }
  }
  .name {
  }

  .profile {
    padding-bottom: 2rem;

    .text {
      padding-left: 4px;
      padding-right: 4px;
    }

    .van-button {
      border-width: 1px;
      border-style: solid;
      border-radius: 10px;
      background-color: #424a5c;
    }
  }
}

.trade {
  // color: black;
  padding: 1rem 0 1rem 0;
  background-color: #282e48;

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    padding-left: 5px;
  }
}

.van-cell {
  background-color: #282e48;
  color: #fff;
  .van-icon {
    margin-right: 10px;
  }
}
.no {
  background-color: #1b2034;
  padding: 8px;
}

.team {
  color: black;
  background-color: white;

  .van-row {
    padding: 12px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #f2f4f5;
  }
}
</style>