<template>
    <div class="trades">
        <van-nav-bar title="提现记录" left-arrow @click-left="onClickLeft" />
        <div>
            <van-cell>
                <van-row>
                    <van-col span="10">
                        时间
                    </van-col>
                    <van-col span="10">
                        金额/手续费/到账
                    </van-col>
                    <van-col span="4">
                        状态
                    </van-col>
                </van-row>
            </van-cell>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="(item, index) in list" :key="index">
                    <van-row>
                        <van-col span="10">
                            {{ item.created_at }}
                        </van-col>
                        <van-col span="8">
                            {{ item.amount*1 }}/{{ item.fee*1 }}/{{ item.out_amount*1 }}
                        </van-col>
                        <van-col span="4">
                            {{ item.status }}
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
            active: 0,
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
            this.$axios.get(`wallet/withdraws?&page=${this.page}&size=30`).then(response => {
                let ss = response.data;
                this.list = this.list.concat(ss);
                this.loading = false;

                if (this.page >= response.last_page || response.total == 0) {
                    this.finished = true;
                }
            });
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