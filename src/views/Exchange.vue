<template>
    <div class="exchange">
        <van-nav-bar title="兑换" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="notes-o" slot="right" size="20" />
        </van-nav-bar>
        <div class="replace">
            <!-- <van-panel status="闪兑IA"> -->
            <van-row type="flex" justify="space-around">
                <van-col>{{ info.usdt }}</van-col>
                <van-col>{{ info.ia }}</van-col>
            </van-row>
            <div>
                <van-row class="panel" type="flex" justify="space-around" align="center">
                    <van-col span="6">
                        <span class="icon">
                            <van-icon name="https://cdn.mytoken.org/Fp2vnCNJY7QudKwqR2mA4tt3Cmhl" size="18" />
                        </span>
                        <span class="text">USDT</span>
                        <!-- <div class="text2">{{ info.usdt }}</div> -->
                    </van-col>
                    <van-col span="6">
                        <div class="middle">
                            <van-icon name="exchange" size="12" />
                            <span class="ratetext">{{info.rate}}</span>
                        </div>
                    </van-col>
                    <van-col span="6">
                        <span class="icon">
                            <van-icon name="https://cdn.mytoken.org/FkonJbqGpUId6qy6AiVVURateiLD" size="18" />
                        </span>
                        <span class="text">IA</span>
                        <!-- <div class="text2">{{ info.ia }}</div> -->
                    </van-col>
                </van-row>
                <van-row type="flex" align="center">
                    <van-col span="12">
                        <van-cell-group>
                            <van-field v-model="params.amount" type="number" @input="input()" input-align="center" size="12" placeholder="请输入兑换的USDT" />
                        </van-cell-group>
                    </van-col>
                    <!-- <van-col span="6">{{info.rate}}</van-col> -->
                    <van-col span="12">
                        <van-cell-group>
                            <van-field v-model="params.ia" disabled="true" input-align="center" size="12" placeholder="IA" />
                        </van-cell-group>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col offset="8"></van-col>
                    <van-col span="8">
                        <div class="button">
                            <van-button type="primary" :round="true" size="large" @click="submit()" :disabled="params.amount == 0">立即兑换</van-button>
                        </div>
                    </van-col>
                </van-row>
            </div>
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
            info: {
                usdt: "0",
                ia: "0",
                rate: 1
            },
            params: {
                amount: "",
                ia: ""
            },
            needAuth: false
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {
            this.$router.push({ name: "exchangeList" });
        },
        input() {
            this.params.ia = (this.params.amount / this.info.rate).toFixed(4);
        },
        async getInfo() {
            let res = await this.$axios.get("/replace/info");
            this.info = res.data;
        },
        async submit() {
            this.needAuth = true;
        },
        async readyPay(pass) {
            var toast1 = this.$toast.loading({
                message: "加载中..."
            });
            this.params.password = pass;
            try {
                let r = await this.$axios.post("/replace", this.params);

                if (r.code == 10000) {
                    this.onClickRight();
                }
                this.needAuth = false;
                this.$refs.myAuth.clear();
            } catch (error) {
                this.needAuth = false;
                this.$refs.myAuth.clear();
            }

            this.getInfo();
        }
    },
    mounted() {
        this.getInfo();
    }
};
</script>
<style lang="scss">
.exchange {
    // text-align: center;
    // position: relative;
    height: 100%;
    // background-color: white;
    // padding-bottom: 100%;

    .replace {
        // margin-top: 1rem;

        padding-top: 40%;

        .panel {
            text-align: center;
            // line-height: 50px;
            padding: 20px 0;
        }

        .middle {
            // padding-top: 4px;
            display: flex;
            flex-direction: column;

            .ratetext {
                font-size: 10px;
                line-height: 20px;
            }
        }

        .text {
            font-size: 20px;
            margin-left: 5px;
        }

        .text2 {
            line-height: 30px;
            font-size: 14px;
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

    .my-popup {
        height: 50%;
        padding-top: 20px;
    }
}
</style>