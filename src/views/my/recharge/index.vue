<template>
    <div class="show_recharge">
        <div class="nav">
            <van-nav-bar title="充值记录" left-arrow @click-left="onClickLeft" />
        </div>
        <div class="content-wrapper">
            <div class="amount">
                <p>
                    余额： 1.11 USDT
                </p>
            </div>
        </div>
        <van-cell style="backgroundColor: #1d2243">
            <van-row style="text-align: center;">
                <van-col span="5">
                    数量
                </van-col>
                <van-col span="8">
                    哈希
                </van-col>
                <van-col span="11">
                    时间
                </van-col>
            </van-row>
        </van-cell>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(item, index) in list" :key="index" style="backgroundColor:#1d2243">
                <van-row style="text-align: center;">
                    <van-col span="5">
                        {{ item.amount }}
                    </van-col>
                    <van-col span="8" @click="look(item.hash)">
                        查看
                    </van-col>
                    <van-col span="11">
                        {{ item.created_at }}
                    </van-col>
                </van-row>
            </van-cell>
        </van-list>


        <van-popup round position="bottom" v-model="show">{{ hash }}</van-popup>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                show: false,
                hash: '',
                user: {},
                active: 0,
                list: [
                {
                    amount: '1.00',
                    // hash: 'asd',
                    hash: '0x4786205d7ca3c457c08de5821fccaa909949376ea04f2e1c526edcd66ee1fbbf',
                    created_at: '2018年 12月 12日 12:12:12',
                },
                ],
                loading: false,
                finished: false,
                type: '',
                page: 0,
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onLoad() {
                this.page++;
                this.loading = false;
                this.finished = true;
            },
            look(hash) {
                this.hash = hash
                this.show = true
            },
        },
    }
</script>
<style lang="scss">
.show_recharge {

    .amount {
        background: #3F79FE;
        padding: 1rem;
        text-align: center;
    }

    .van-cell,
    .van-tab--active,
    .van-cell__value--alone {
        color: white;
    }

    .van-row {
        font-size: 12px;
    }


    .van-popup {
        // padding: 5rem;
        color: white;
        padding-top: 3rem;
        text-align: center;
        padding-bottom: 3rem;
        word-wrap:break-word; 
        word-break:break-all;
        background-color: #5e6b6d;
    }

}
</style>