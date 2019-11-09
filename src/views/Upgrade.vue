<template>
    <div class="upgrade">
        <van-nav-bar title="投单" @click-right="onClickRight">
            <van-icon name="notes-o" slot="right" size=20 />
        </van-nav-bar>
        <div>
            <van-cell>
                <van-row>
                    <van-col span=8 v-for="(item,index) in lists" :key="index">
                        <van-button @click="selectBtn(index)">{{ item.amount*1 }}</van-button>
                    </van-col>
                </van-row>
                <van-row>
                    <van-button type="primary" @click="submit()">投单</van-button>
                </van-row>
                <van-row>
                    <p>投单金额:{{ upgrade.amount }}</p>
                    <p>每日收益:{{ upgrade.static_rate }}%</p>
                    <p>出局倍数:{{ upgrade.out_rate }}%</p>
                </van-row>
            </van-cell>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            lists: [],
            upgrade: {
                amount: 200,
                static_rate: 0,
                out_rate: 0,
            },
        }
    },
    methods: {
        onClickRight() {
            this.$router.push({ name: 'upgradeList' })
        },
        getLevel() {
            this.$axios.get('level').then(res => {
                this.lists = res.data
                this.upgrade = this.lists[0]
            });
        },
        selectBtn(key) {
            this.upgrade = this.lists[key]
        },
        submit() {
            this.$axios.post('upgrade', this.upgrade).then(res => {
                if (res.code == 10000) {
                    this.onClickRight()
                }
            });
        }
    },
    mounted() {
        this.getLevel();
    }
}
</script>
<style lang="scss">
.about {

    .readme {
        color: #969799;
        padding: 1rem;
    }


}
</style>