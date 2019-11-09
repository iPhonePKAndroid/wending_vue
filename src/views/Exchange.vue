<template>
    <div class="exchange">
        <van-nav-bar title="兑换" left-arrow @click-left="onClickLeft" />
        <div class="replace">
            <van-panel status="闪兑IA">
                <div>
                    <van-row class="panel">
                        <van-col span="7" offset="2">
                            <span class="icon">
                                <van-icon name="https://cdn.mytoken.org/Fp2vnCNJY7QudKwqR2mA4tt3Cmhl" size="16" />
                            </span>
                            <span class="text">USDT</span>
                            <div class="text2">
                                {{ info.usdt }}
                            </div>
                        </van-col>
                        <van-col span="2" offset="3">
                            <div class="middle">
                                <van-icon name="exchange" size="20" />
                            </div>
                        </van-col>
                        <van-col span="6" offset="3">
                            <span class="icon">
                                <van-icon name="https://cdn.mytoken.org/FkonJbqGpUId6qy6AiVVURateiLD" size="16" />
                            </span>
                            <span class="text">IA</span>
                            <div class="text2">
                                {{ info.ia }}
                            </div>
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="12">
                            <van-cell-group>
                                <van-field v-model="params.amount" type="number" @input="input()" input-align="center" size="12" :placeholder="`请输入兑换的USDT/${info.rate}`" />
                            </van-cell-group>
                        </van-col>
                        <van-col span="12">
                            <van-cell-group>
                                <van-field v-model="params.ia" disabled="true" input-align="center" size="12" placeholder="AI" />
                            </van-cell-group>
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col offset="8">
                        </van-col>
                        <van-col span="8">
                            <div class="button">
                                <van-button type="primary" :round="true" size="large" @click="submit()" :disabled="params.amount == 0">立即兑换</van-button>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </van-panel>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            info: {
                usdt: "0",
                ia: "0",
                rate: 1,
            },
            params: {
                amount: "",
                ia: ''
            },
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        input(){
            this.params.ia = (this.params.amount / this.info.rate).toFixed(4)
        },
        async getInfo() {
            let res = await this.$axios.get("/replace/info");
            this.info = res.data;
        },
        async submit(type) {
            this.params.type = type
            let r = await this.$axios.post('/replace', this.params)
            this.getInfo()
        },
    },
    mounted() {
        this.getInfo();
    },
};
</script>
<style lang="scss">
.exchange {
    color: black;
    // text-align: center;
    // position: relative;
    // height: 100%;
    background-color: white;
    // padding-bottom: 100%;

    .replace {
        // margin-top: 1rem;

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