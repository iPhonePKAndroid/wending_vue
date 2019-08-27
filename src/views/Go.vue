<template>
    <div class="go">

        <van-notice-bar :text="info.notice.body" left-icon="volume-o" />
        
        <div class="total">
            今日总量：{{ info.total }}
        </div>


        <div class="submit">
            <van-row>
                <van-col span="6" offset="6">
                    <van-button round type="danger" @click="go">点击抢单</van-button>
                </van-col>
                <van-col span="6" offset="0">
                    <van-button round type="danger" @click="withdraw">积分提现</van-button>
                </van-col>
            </van-row>
        </div>



        <div class="many">

            <van-row align="center" justify="center" type="flex">
                <van-col span="6">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="shop-o" color="#d5efda" size="50" />
                        </div>
                        <div class="gray">保障金</div>
                        <div>￥100.00</div>
                    </div>
                </van-col>
                <van-col span="6">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="discount" color="#eec4b3" size="50" />
                        </div>
                        <div class="gray">奖励金</div>
                        <div>￥100.00</div>
                    </div>
                </van-col>
                <van-col span="6">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="passed" color="#ea95a1" size="50" />
                        </div>
                        <div class="gray">佣金费率</div>
                        <div>￥100.00</div>
                    </div>
                </van-col>
                <van-col span="6">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="clock-o" color="#638fd9" size="50" />
                        </div>
                        <div class="gray">抢单金额</div>
                        <div>￥100.00</div>
                    </div>
                </van-col>
            </van-row>
        </div>



        <div class="replace">
            <van-panel status="兑换服务">

                <van-row class="panel">
                    <van-col span="6" offset="3">
                        <span class="icon">
                            <van-icon name="https://cdn.mytoken.org/Fp2vnCNJY7QudKwqR2mA4tt3Cmhl" size="24" />
                        </span>
                        <span class="text">USDT</span>
                        <div class="text2">
                            {{ info.wallet.amount }}
                        </div>
                    </van-col>
                    <van-col span="2" offset="2">
                        <div class="middle">
                            <van-icon name="exchange" size="20" />
                        </div>
                    </van-col>
                    <van-col span="6" offset="2">
                        <span class="icon">
                            <van-icon name="https://cdn.mytoken.org/FkonJbqGpUId6qy6AiVVURateiLD" size="24" />
                        </span>
                        <span class="text">积分</span>
                        <div class="text2">
                            {{ info.point.amount }}
                        </div>
                    </van-col>
                </van-row>


            </van-panel>

        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                info: {
                    total: '0',
                    profit: '0',
                    notice: {
                        body: '-',
                    },
                    wallet: {
                        amount: '0',
                    },
                    point: {
                        amount: '0',
                    },
                },
            }
        },
        methods: {
            async get_go() {
                let go = await this.$axios.get('/go')
                this.info = go.data
            },
            async go() {
                this.$toast('你好，渣渣辉！')
            },
            async withdraw() {
                this.$toast('你好，渣渣辉！')
            },
        },
        mounted() {
            this.get_go()
        },
    }
</script>

<style lang="scss">
.go {
    color: black;
    text-align: center;

    // background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS5WN_J3aLp34DLWC-JcVDbEH9Lt4rZqaDMfOBoRHIUMyurzB2');
    background-color: #a7bdee;

    .total {
        padding-top: 5rem;
    }


    .submit {
        margin-top: 5rem;
        margin-bottom: 5rem;
    }

    .many {
        .van-col {
            padding: 8px;

            .c {
                border-radius: 8px;
                padding: 10px 0 10px 0;
                background-color: white;


                .gray {
                    color: gray;
                }
            }

        }

    }


    .replace {
        margin-top: 1rem;


        .panel {
            padding-top: 1rem;
            padding-bottom: 10rem;
        }

        .middle {
            padding-top: 28px;
        }

        .text {
            font-size: 24px;
            margin-left: 5px;
        }

        .text2 {
            font-size: 12px;
            text-align: center;
        }

        .icon {
            vertical-align: middle;
        }
    }



}
</style>