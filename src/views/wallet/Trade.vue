<template>
    <div class="trades">
        <van-nav-bar title="交易记录" left-arrow @click-left="onClickLeft" />
        <div>
            <van-tabs v-model="activeName" @change="changeTokenList()">
                <van-tab title="USDT" name="erc20_usdt" />
                <van-tab title="IA" name="ia"/>
            </van-tabs>
            <van-cell>
                <van-row>
                    <van-col span="9">
                        时间
                    </van-col>
                    <van-col span="4">
                        类型
                    </van-col>
                    <van-col span="4">
                        金额
                    </van-col>
                    <van-col span="7">
                        账户/冻结
                    </van-col>
                </van-row>
            </van-cell>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="(item, index) in list" :key="index">
                    <van-row gutter='20'>
                        <van-col span="9">
                            {{ item.created_at }}
                        </van-col>
                        <van-col span="4">
                            {{ item.type_name }}
                        </van-col>
                        <van-col span="4">
                            <span v-if="item.expend" class="text-red">-{{ item.change*1 }}</span>
                            <span v-else class="text-green">+{{ item.change*1 }}</span>
                        </van-col>
                        <van-col span="7">
                            {{ item.amount*1 }}/{{ item.lock_amount*1 }}
                        </van-col>
                    </van-row>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'erc20_usdt',
            list: [],
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
            this.$axios.get(`/trades?&token=${this.activeName}&page=${this.page}&size=30`).then(response => {
                let ss = response.data;
                this.list = this.list.concat(ss);
                this.loading = false;

                if (this.page >= response.last_page || response.total == 0) {
                    this.finished = true;
                }
            });
        },
        changeTokenList(){
            this.page = 0;
            this.list = [];
            this.onLoad()
        }
    },
};
</script>
<style lang="scss">
.trades {
    .text-red {
        color: red;
    }

    .text-green {
        color: green;
    }

    .van-row {
        font-size: 10px;

        .van-col {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
}
</style>