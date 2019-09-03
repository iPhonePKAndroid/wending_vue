<template>
    <div class="exchange">
        <van-nav-bar title="兑换" left-arrow @click-left="onClickLeft" />

        <div class="replace">
            <van-panel status="闪兑服务">

                <div>
                    <van-row class="panel">
                        <van-col span="7" offset="2">
                            <span class="icon">
                                <van-icon name="https://cdn.mytoken.org/FkonJbqGpUId6qy6AiVVURateiLD" size="16" />
                            </span>
                            <span class="text">抢单金额</span>
                            <div class="text2">
                                {{ info.wallet.sheet_amount }}
                            </div>
                        </van-col>
                        <van-col span="2" offset="3">
                            <div class="middle">
                                <van-icon name="exchange" size="20" />
                            </div>
                        </van-col>
                        <van-col span="6" offset="3">
                            <span class="icon">
                                <van-icon name="https://cdn.mytoken.org/Fp2vnCNJY7QudKwqR2mA4tt3Cmhl" size="16" />
                            </span>
                            <span class="text">保障金</span>
                            <div class="text2">
                                {{ info.wallet.amount }}
                            </div>
                        </van-col>
                    </van-row>

                    <van-row>
                        <van-col span="12">
                            <van-cell-group>
                                <van-field v-model="params.amount" input-align="center" size="12" placeholder="请输入抢单金额" />
                            </van-cell-group>
                        </van-col>
                        <van-col span="12">
                            <van-cell-group>
                                <van-field v-model="params.amount" input-align="center" size="12" placeholder="请输入保障金" />
                            </van-cell-group>
                        </van-col>
                    </van-row>


                    <van-row>
                        <van-col offset="8">
                        </van-col>
                        <van-col span="8">
                            <div class="button">
                                <van-button type="primary" :round="true" size="large" @click="submit('sheet_amount')" :disabled="params.amount == 0">立即兑换</van-button>
                            </div>
                        </van-col>
                    </van-row>
                </div>

                <div>
                    <van-row class="panel">
                        <van-col span="7" offset="2">
                            <span class="icon">
                                <van-icon name="https://cdn.mytoken.org/FkonJbqGpUId6qy6AiVVURateiLD" size="16" />
                            </span>
                            <span class="text">团队抢单</span>
                            <div class="text2">
                                {{ info.wallet.team_amount }}
                            </div>
                        </van-col>
                        <van-col span="2" offset="3">
                            <div class="middle">
                                <van-icon name="exchange" size="20" />
                            </div>
                        </van-col>
                        <van-col span="6" offset="3">
                            <span class="icon">
                                <van-icon name="https://cdn.mytoken.org/Fp2vnCNJY7QudKwqR2mA4tt3Cmhl" size="16" />
                            </span>
                            <span class="text">保障金</span>
                            <div class="text2">
                                {{ info.wallet.amount }}
                            </div>
                        </van-col>
                    </van-row>

                    <van-row>
                        <van-col span="12">
                            <van-cell-group>
                                <van-field v-model="params.amount" input-align="center" size="12" placeholder="请输入团队抢单金额" />
                            </van-cell-group>
                        </van-col>
                        <van-col span="12">
                            <van-cell-group>
                                <van-field v-model="params.amount" input-align="center" size="12" placeholder="请输入保障金" />
                            </van-cell-group>
                        </van-col>
                    </van-row>


                    <van-row>
                        <van-col offset="8">
                        </van-col>
                        <van-col span="8">
                            <div class="button">
                                <van-button type="primary" :round="true" size="large" @click="submit('team_amount')" :disabled="params.amount == 0">立即兑换</van-button>
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
                    wallet: {
                        amount: "0",
                        team_amount: "0",
                        sheet_amount: "0",
                    },
                },
                params: {
                    amount: "1",
                    type: 'sheet_amount',
                },
            };
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            async get_go() {
                let go = await this.$axios.get("/go");
                this.info = go.data;
            },
            async submit(type) {
                this.params.type = type
                let r = await this.$axios.post('/replace', this.params)
                this.get_go()
            },
        },
        mounted() {
            this.get_go();
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