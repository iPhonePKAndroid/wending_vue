<template>
    <div class="recharge">
        <van-nav-bar title="充值" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="notes-o" slot="right" size=20 />
        </van-nav-bar>

        <div>
            <h4 class="center alert">请将USDT发送到以下地址</h4>
        </div>
        
        <div class="qrcode center">
            <van-image width="150" height="150" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>


        <div class="alert center">
            <p>
                0xasdad123131
            </p>
        </div>


        <div class="center">
            <van-button round type="primary" size="small" color="#424a5c">复制</van-button>
        </div>

        <div class="readme">
            <van-collapse v-model="activeNames">
              <van-collapse-item title="说明" name="1">
                  <div class="text">
                      此地址仅接受USDT充值，单笔小于10金额将不会到账，任何低于最小金额或者非USDT的充值金额将无法找回。
                  </div>
                  <div class="text">
                      由于转账需要整个区块网络节点的确认，所以到账时间由区块网络拥堵决定，12次确认后将入账。
                  </div>
              </van-collapse-item>
          </van-collapse>
        </div>

    

    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeNames: ['1'],
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onClickRight() {
              this.$router.push({
                name: 'recharge.index'
              });
            },
        },
    }
</script>

<style lang="scss">
.recharge {

    .alert {
        color: black;
    }

    .center {
        text-align: center;
    }

    .qrcode {
        // margin-top: 2rem;
    }

    .readme {
        margin-top: 5rem;

        .text {
            margin-bottom: 1rem;
        }
    }

}
</style>