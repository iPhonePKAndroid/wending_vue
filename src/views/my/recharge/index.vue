<template>
    <div class="intgeral">
        <div class="nav">
            <van-nav-bar title="充值记录" left-arrow @click-left="onClickLeft" />
        </div>
        <div class="content-wrapper">
            <div class="amount-title">
                <p>
                    余额： 1.11 USDT
                </p>
            </div>
        </div>
        <van-cell style="backgroundColor:#1d2243">
            <van-row style="text-align: center;">
                <van-col span="5">
                    类型
                </van-col>
                <van-col span="8">
                    数量
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
                        {{ item.type }}
                    </van-col>
                    <van-col span="8">
                        <span v-if="item.add == 1" style="color:green;">+{{ item.amount }}</span>
                        <span v-else style="color:red;">-{{ item.amount }}</span>
                    </van-col>
                    <van-col span="11">
                        {{ item.created_at }}
                    </van-col>
                </van-row>
            </van-cell>
        </van-list>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {},
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
            this.loading = false;
            this.finished = true;
        }
    },
}
</script>
<style lang="scss">
.intgeral {
    .amount-title {
        background: #3F79FE;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .text-grey {
        color: #aaa;
    }

    .van-cell,
    .van-tab--active,
    .van-cell__value--alone {
        color: white;
    }

    .van-row {
        font-size: 12px;
    }

}
</style>