<template>
    <div class="go">

        <van-notice-bar :text="info.notice.body" left-icon="volume-o" />
        
        <div class="total">
            <h3>今日总量：{{ info.total }}</h3>
        </div>


        <div class="submit">
            <van-row>
                <van-col span="6" offset="6">
                    <van-button round type="danger" @click="togo">点击抢单</van-button>
                </van-col>
                <van-col span="6" offset="0">
                    <van-button round type="danger" @click="withdraw">余额提现</van-button>
                </van-col>
            </van-row>
        </div>



        <div class="many">

            <van-row align="center" justify="center" type="flex">
                <van-col span="8">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="shop-o" color="#d50000" size="50" />
                        </div>
                        <div class="gray">保障金</div>
                        <div class="small">$ {{ info.wallet.amount }}</div>
                    </div>
                </van-col>
                <van-col span="8">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="exchange" color="#630000" size="50" />
                        </div>
                        <div class="gray">抢单金额</div>
                        <div class="small">$ {{ info.wallet.sheet_amount }}</div>
                    </div>
                </van-col>
                <van-col span="8">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="friends-o" color="#607D8B" size="50" />
                        </div>
                        <div class="gray">团队抢单</div>
                        <div class="small">$ {{ info.wallet.team_amount }}</div>
                    </div>
                </van-col>
            </van-row>
        </div>



<!--         <div class="replace">
            <van-panel status="闪兑服务">

                <van-row class="panel">
                    <van-col span="6" offset="3">
                        <span class="icon">
                            <van-icon name="https://cdn.mytoken.org/Fp2vnCNJY7QudKwqR2mA4tt3Cmhl" size="16" />
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
                            <van-icon name="https://cdn.mytoken.org/FkonJbqGpUId6qy6AiVVURateiLD" size="16" />
                        </span>
                        <span class="text">积分</span>
                        <div class="text2">
                            {{ info.point.amount }}
                        </div>
                    </van-col>
                </van-row>

                <van-row>
                    <van-col span="12">
                        <van-cell-group>
                            <van-field v-model="params.amount" input-align="center" size="12" placeholder="请输入USDT" />
                        </van-cell-group>
                    </van-col>
                    <van-col span="12">
                        <van-cell-group>
                            <van-field v-model="params.amount" input-align="center" size="12" placeholder="请输入积分" />
                        </van-cell-group>
                    </van-col>
                </van-row>


                <van-row>
                    <van-col offset="8">
                    </van-col>
                    <van-col span="8">
                        <div class="button">
                            <van-button type="primary" :round="true" size="large" @click="replace" :disabled="info.wallet.amount < params.amount || params.amount == 0">立即兑换</van-button>
                        </div>
                    </van-col>
                </van-row>

            </van-panel>

        </div>
 -->
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
                        sheet_amount: '0',
                    },
                    point: {
                        amount: '0',
                    },
                    sheet: {
                        amount: '0',
                    },
                },
                params: {
                    amount: '1',
                },



            }
        },
        methods: {
            async get_go() {
                let go = await this.$axios.get('/go')
                this.info = go.data
            },
            async togo() {
                let togo = await this.$axios.post('/togo')
                this.get_go()

            },
            async withdraw() {
                // this.$toast('你好，渣渣辉！')
                this.$router.push({
                    name: "withdraw"
                });
            },
            async replace() {
                let replace = await this.$axios.post('/replace', this.params)
                console.log(replace)
                this.get_go()
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
    position: relative;
    height: 100%;
    background-image: url('https://photo.16pic.com/00/93/15/16pic_9315805_b.jpg');
    // background-image: url('https://photo.16pic.com/00/92/34/16pic_9234014_b.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    // background-color: #a7bdee;

    .total {
        color: red;
        padding-top: 5rem;
    }


    .submit {
        margin-top: 5rem;
        margin-bottom: 5rem;
    }

    .many {
        // padding-top: 15rem;
        // padding-bottom: 5rem;
        position:absolute;
        left:5px;
        right:5px;
        // height: 120px;
        bottom: 100px;

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

        .small {
            font-size: 11px;
        }

    }


    .replace {
        margin-top: 1rem;


        .panel {
            padding-top: 1rem;
            // padding-bottom: 10rem;
        }

        .middle {
            padding-top: 16px;
        }

        .text {
            font-size: 20px;
            margin-left: 5px;
        }

        .text2 {
            font-size: 12px;
            text-align: center;
        }

        .icon {
            vertical-align: middle;
        }

        .button {
            padding-top: 1rem;
            padding-bottom: 3rem;
        }
    }



}
</style>