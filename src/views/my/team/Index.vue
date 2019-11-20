<template>
    <div class="team-list">
        <van-nav-bar title="我的团队" left-arrow @click-left="onClickLeft" />
        <div>
            <van-cell>
                <van-row>
                    <van-col span="10">
                        邀请时间
                    </van-col>
                    <van-col span="8">
                        用户
                    </van-col>
                    <van-col span="6">
                        业绩
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
                            {{ item.phone }}
                        </van-col>
                        <van-col span="6">
                            {{ item.team_amount }}
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
            this.$axios.get(`team?&page=${this.page}&size=30`).then(response => {
                let ss = response.data;
                this.list = this.list.concat(ss);
                this.loading = false;

                if (this.page >= response.meta.last_page || response.meta.total == 0) {
                    this.finished = true;
                }
            });
        }
    },
};
</script>
<style lang="scss">
.team-list {
    .text-red {
        color: red;
    }

    .text-green {
        color: green;
    }
    .van-cell {
    color: #fff;
    background: #282e48;
    .van-cell__value--alone {
      color: white;
    }
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