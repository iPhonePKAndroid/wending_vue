<template>
  <div class="my">
    <div class="bg">
      <van-cell :title="user.name" :label="user.phone">
        <van-image
          slot="icon"
          width="60"
          height="60"
          lazy-load
          round
          :src="require('../assets/logo.png')"
        />
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

    <van-cell-group class="sub-nav">
      <van-cell icon="friends-o" title="我的团队" :value="user.team_count" />
      <van-cell icon="manager-o" title="直推人数" :value="user.direct_count" />
      <van-cell icon="manager-o" title="团队业绩" :value="user.team_amount" />
    </van-cell-group>

    <div class="no"></div>
    <van-cell-group class="sub-nav">
      <van-cell icon="share" title="邀请好友" is-link @click="go('my.aff')" />
      <van-cell icon="friends-o" title="我的团队" is-link @click="go('my.team')" />
      <van-cell icon="bulb-o" title="修改密码" is-link @click="go('password')" />
      <van-cell icon="flower-o" title="APP下载" is-link @click="go('app')" />
      <van-cell icon="underway-o" title="退出登录" is-link @click="logout" />
    </van-cell-group>
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
      this.$store.commit("logout");
      this.$router.push({
        name: "login"
      });
    },
    async profile() {
      let user = await this.$axios.get("/user");
      this.user = user.data;
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
    background-color: #424a5c;
    // background-image: url('../assets/profile.gif');
    padding-top: 50px;
    padding-bottom: 20px;
    .van-cell {
      background: #424a5c;
      .van-cell__title {
        padding-top: 10px;
        padding-left: 20px;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }

  .avatar {
    padding-top: 5rem;
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
  color: black;
  padding: 1rem 0 1rem 0;
  background-color: white;

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    padding-left: 5px;
  }
}

.no {
  background-color: #f2f4f5;
  padding: 8px;
}
.sub-nav {
  .van-cell {
    color: black;
    font-size: 16px;
    .van-cell__title {
      padding-left: 10px;
    }
  }
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