<template>
    <div class="upgrade">
        <van-nav-bar title="理财" @click-right="onClickRight">
            <van-icon name="notes-o" slot="right" size="20" />
        </van-nav-bar>
        <van-row class="title-area">
            <span>理财金额:</span>
            <span class="main-text">{{ upgrade.amount*1 }} USDT</span>
        </van-row>
        <van-grid :column-num="3">
            <van-grid-item text="每日收益">
                <span class="subtitle" slot="icon">{{ upgrade.static_rate }}%</span>
            </van-grid-item>
            <van-grid-item text="出局倍数">
                <span class="subtitle" slot="icon">{{ upgrade.out_rate }}</span>
            </van-grid-item>
            <van-grid-item text="余额USDT">
                <span class="subtitle" slot="icon">{{ amount }}</span>
            </van-grid-item>
        </van-grid>
        <van-grid :column-num="3" :border="false">
            <van-grid-item v-for="(value,index2) in lists" :key="index2">
                <van-button size="large" :type="selectedItem==index2?'primary':'default'" @click="selectBtn(index2)">{{ value.amount*1 }}</van-button>
            </van-grid-item>
        </van-grid>
        <div class="bottom-button">
            <van-button size="large" type="primary" @click="submit()">理财</van-button>
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
            lists: [],
            upgrade: {
                amount: 200,
                static_rate: 0,
                out_rate: 0
            },
            selectedItem: 0,
            needAuth: false,
            amount:'0.0000',
        };
    },
    methods: {
        onClickRight() {
            this.$router.push({ name: "upgradeList" });
        },
        getLevel() {
            this.$axios.get("level").then(res => {
                this.lists = res.data.levels;
                this.amount = res.data.amount
                this.upgrade = this.lists[0];
            });
        },
        selectBtn(key) {
            this.selectedItem = key;
            this.upgrade = this.lists[key];
        },
        submit() {
            this.needAuth = true;
        },
        readyPay(pass) {
            var toast1 = this.$toast.loading({
                message: "加载中..."
            });
            this.upgrade.password = pass;
            this.$axios
                .post("upgrade", this.upgrade)
                .then(res => {
                    if (res.code == 10000) {
                        this.onClickRight();
                    }
                    this.needAuth = false;
                    this.$refs.myAuth.clear();
                })
                .catch(err => {
                    this.needAuth = false;
                    this.$refs.myAuth.clear();
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
  //   height: 100%;
  // background: #fff;
  //   .readme {
  //     color: #969799;
  //     padding: 1rem;
  //   }
  // color: #888;
  .title-area {
    text-align: center;
  }
  .subtitle {
    // color: #353535;
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
  .my-popup {
    height: 50%;
    padding-top: 20px;
  }
}
</style>