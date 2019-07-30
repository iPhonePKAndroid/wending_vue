<template>
    <div class="wallet">

        <!-- 导航栏 -->
        <van-nav-bar :fixed="true" :border="false">

            <div slot="left">
                <span style="background-color: #f5f5f7; padding: 5px 5px 5px 5px; border-radius: 8px; color: black; box-shadow:1px 1px 1px #f3f3f5;">
                    Selly
                    <van-icon name="exchange" color="#d3ba93" style="background-color: #ffffff; border-radius: 8px; padding: 2px;" />
                </span>
            </div>

            <van-icon name="chat-o" color="black" size="22px" slot="right" style="right: 10px;" />
            <van-icon name="add-o" color="black" size="22px" slot="right" />
            <van-icon name="close" />
        </van-nav-bar>


        <!-- 总资产 -->
        <div class="assets">

            <div class="small">
                <div class="right">
                    <span class="alert">
                        <van-icon name="info" size="12px" color="#f5dfdf" />
                        <span>您还没有备份</span>
                    </span>
                    <span>
                        <span class="button">
                            去备份
                        </span>
                    </span>
                </div>
            </div>

            <div class="remark">
                <span>
                    总资产（USD）
                </span>
                <span>
                    <van-icon name="eye-o" />
                </span>
            </div>

            <div class="amount">
                <span>$</span>
                <span class="big">0.00</span>
            </div>
        </div>


        <!-- 公告 -->
        <div class="notice">
            <van-notice-bar rapable :scrollable="false" color="#525355" background="#ffffff" style="border-left: 3px solid #dbbd92;" >
                通知内容
                <van-icon name="arrow" color="#dedede" slot="right-icon" />
            </van-notice-bar>
        </div>


        <!-- 三宫格 -->
        <div class="three">
            <van-row>
              <van-col span="8">
                  <van-icon name="https://cdn.mytoken.org/5c8c17dc50c6706533f658d685b3bd5d" size="30px" color="black" />
                  <div class="text">EOS管理</div>
              </van-col>
              <van-col span="8">
                  <van-icon name="https://cdn.mytoken.org/FjMXTFsqGTqS3rNEygtKl6BeBJeY" size="30px" color="black" />
                  <div class="text">Dapp浏览器</div>
              </van-col>
              <van-col span="8">
                  <van-icon name="https://cdn.mytoken.org/FvKK2xxE7DNqbKHA9Dle2FPheJJe" size="30px" color="black" />
                  <div class="text">红包</div>
              </van-col>
            </van-row>
        </div>

        <!-- 资产 -->
        <div class="wallets">
            <div class="header">
                <van-nav-bar left-text="返回" left-arrow :border="false">
                  <van-icon name="add" slot="right" size="25px" color="black" style="box-shadow: 0 3px 3px 1px #afaaaa9c; border-radius: 100px;" />
                  <span slot="left" style="font-size: 18px;">
                      资产
                  </span>
                </van-nav-bar>
            </div>

            <div class="footer">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
                <van-cell v-for="item in list" :key="item" >

                <van-row>
                  <van-col span="4">
                    <div style=" position: absolute; top: 0; bottom: 0; margin: auto; line-height: 80px;">
                      <van-icon name="https://cdn.mytoken.org/e04064b7f151008854f4f0d6c822b608" size="38px" />
                    </div>
                  </van-col>
                  <van-col span="4">
                    <div>
                        BTC
                    </div>
                    <div class="blod">
                        12313.1231
                    </div>
                  </van-col>
                  <van-col span="2" offset="12" style="float: right;">
                    <div style="text-align: right;">
                        0
                    </div>
                    <div class="blod" style="text-align: right;">
                        ≈ 0
                    </div>
                  </van-col>
                </van-row>


                </van-cell>
                </van-list>
            </div>

        </div>

    </div>
</template>

<script>
export default {
      name: 'walelt',
      data() {
        return {
          wallets: [
          ],
          list: [],
          loading: false,
          finished: false,
      }
  },
  methods: {
    async onLoad() {
        for (let i = 0; i < 3; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        this.finished = true;
    },
  },
}
</script>

<style lang="scss">
.wallet {

    margin: 0 10px 0 10px;

    .assets {
        color: white;
        margin-top: 46px;
        font-size: 12px;
        background-color: #2a2b2f;
        border-radius: 10px;
        padding: 15px 20px 30px 20px;

        .small {
            text-align: right;
            height: 23px;
        }

        .right {
            display:flex;
            align-items: center;
            text-align: right;
            justify-content: flex-end;
        }

        .alert {
            display: flex;
            width: 6rem;
            justify-content: center;
            align-items: center;
            padding: 3px 5px 3px 5px;
            color: #9a9a9a;
            border-radius: 10px;
            background-color: #000000;
            margin-right: 10px;

            .van-icon {
                color: red;
                margin-right: 5px;
            }

            .center {
                vertical-align: middle;
                margin-top: 10px;
            }
        }

        .button {
            color: #a69275;
            border-radius: 10px;
            border: 1px solid #a69275;
            padding: 2px 5px 2px 5px;
        }

    }

    .notice {
        margin-top: 10px;
        .van-notice-bar {
            height: 14px;
        }
    }

    .three {
        margin: 30px 0 30px 0;
        text-align: center;

        .van-icon {
            background-color: white;
            box-shadow: 0 3px 3px 1px #afaaaa9c;
            border-radius: 100px;
            padding: 5px;
        }

        .text {
            margin-top: 5px;
            color: #888888;
            font-size: 10px;
        }

    }

    .amount {

        .big {
            font-size: 30px;
        }

    }

    .wallets {


        .blod {
            color: #adadad;
        }
    }
}
</style>