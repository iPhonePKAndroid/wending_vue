<template>
    <div class="my">

        <div class="bg">
            <div class="avatar">
                <van-image width="100" height="100" lazy-load round :src="require('../assets/logo.png')" />
            </div>

            <div class="name">
                {{ user.name }}
            </div>

            <div class="profile">
                <van-button color="white" plain size="mini">
                    <span class="text">
                        {{ user.phone }}
                    </span>
                </van-button>
            </div>
        </div>

        <div class="trade">
            <van-row align="bottom" justify="space-between" type="flex">
              <van-col span="6">
                <div class="center" @click="go('recharge')">
                    <van-icon name="paid" />
                    <span class="text">充值</span>
                </div>
                
            </van-col>
            <van-col span="6">
                <div class="center" @click="go('withdraw')">
                    <van-icon name="vip-card-o" />
                    <span class="text">提现</span>
                </div>
            </van-col>
            <van-col span="6">
                <div class="center" @click="go('trades')">
                    <van-icon name="todo-list-o" />
                    <span class="text">交易</span>
                </div>
            </van-col>
            <van-col span="6">
                <div class="center" @click="go('exchange')">
                    <van-icon name="exchange" />
                    <span class="text">兑换</span>
                </div>
            </van-col>
        </van-row>
    </div>    

    <div class="no"></div>

    <div class="team">
        <van-row>
            <van-col span="3">
                <van-icon name="friends-o" size="20" color="#7d8993" />
            </van-col>
            <van-col span="8">
                我的团队
            </van-col>
            <van-col span="3" offset="10">
                {{ team.direct }}
            </van-col>
        </van-row>
    </div>

    <div class="team">
        <van-row>
            <van-col span="3">
                <van-icon name="user-o" size="20" color="#7d8993" />
            </van-col>
            <van-col span="8">
                有效人数
            </van-col>
            <van-col span="3" offset="10">
                {{ team.teams }}
            </van-col>
        </van-row>
    </div>

    <div class="team">
        <van-row>
            <van-col span="3">
                <van-icon name="gift-o" size="20" color="#7d8993" />
            </van-col>
            <van-col span="10">
                团队今日抢单
            </van-col>
            <van-col span="6" offset="5">
                {{ team.today }}
            </van-col>
        </van-row>
    </div>

    <div class="no"></div>
    
    <div class="team">

        <van-row @click="go('my.aff')">
            <van-col span="3">
                <van-icon name="share" size="20" color="#7d8993" />
            </van-col>
            <van-col span="8">
                邀请好友
            </van-col>
            <van-col span="3" offset="10">
                <van-icon name="arrow" color="#dfe3e5" />
            </van-col>
        </van-row>

        <van-row @click="go('password')">
            <van-col span="3">
                <van-icon name="bulb-o" size="20" color="#7d8993" />
            </van-col>
            <van-col span="8">
                修改密码
            </van-col>
            <van-col span="3" offset="10">
                <van-icon name="arrow" color="#dfe3e5" />
            </van-col>
        </van-row>

        <van-row @click="go('app')">
            <van-col span="3">
                <van-icon name="flower-o" size="20" color="#7d8993" />
            </van-col>
            <van-col span="8">
                APP下载
            </van-col>
            <van-col span="3" offset="10">
                <van-icon name="arrow" color="#dfe3e5" />
            </van-col>
        </van-row>

<!--         <van-row @click="go('notice')">
            <van-col span="3">
                <van-icon name="search" size="20" color="#7d8993" />
            </van-col>
            <van-col span="8">
                平台公告
            </van-col>
            <van-col span="3" offset="10">
                <van-icon name="arrow" color="#dfe3e5" />
            </van-col>
        </van-row> -->
<!--         <van-row @click="go('tops')">
            <van-col span="3">
                <van-icon name="description" size="20" color="#7d8993" />
            </van-col>
            <van-col span="8">
                用户协议
            </van-col>
            <van-col span="3" offset="10">
                <van-icon name="arrow" color="#dfe3e5" />
            </van-col>
        </van-row>
        <van-row @click="go('about')">
            <van-col span="3">
                <van-icon name="home-o" size="20" color="#7d8993" />
            </van-col>
            <van-col span="8">
                关于我们
            </van-col>
            <van-col span="3" offset="10">
                <van-icon name="arrow" color="#dfe3e5" />
            </van-col>
        </van-row> -->

        <van-row @click="logout">
            <van-col span="3">
                <van-icon name="underway-o" size="20" color="#7d8993" />
            </van-col>
            <van-col span="8">
                退出登录
            </van-col>
            <van-col span="3" offset="10">
                <van-icon name="arrow" color="#dfe3e5" />
            </van-col>
        </van-row>
    </div>

</div>
</template>

<script>
    export default {
        data() {
            return {
                team: {
                    direct: 0,
                    teams: 0,
                    today: 0,
                },
                user: {
                    name: '-',
                    phone: '-',
                },
            }
        },
        methods: {
            go(name) {
                this.$router.push({
                    name: name
                });
            },
            logout() {
                this.$store.commit("logout");
                this.$router.push({
                    name: "login"
                });
            },
            async profile() {
                let user = await this.$axios.get('/user')
                this.user = user.data
            },
            async team_count() {
                let team = await this.$axios.get('/team')
                this.team = team.data
            },
        },
        mounted() {
            this.profile()
            this.team_count()
        },
    }
</script>

<style lang="scss">

.my {
    text-align: center;
    padding-bottom: 5rem;

    .bg {
        background-color: #424a5c;
        // background-image: url('../assets/profile.gif');
    }


    .avatar {
        padding-top: 5rem;
    }

    .name {

    }


    .profile {
        padding-bottom: 2rem;

        .text {
            padding-left: 4px;
            padding-right: 4px;
        }

        .van-button {
            border-width: 1px;
            border-style: solid;
            border-radius:  10px;
            background-color: #424a5c;
        }
    }



}



.trade {
    color: black;
    padding: 1rem 0 1rem 0;
    background-color: white;

    .center {
        display: flex;
        justify-content:center;
        align-items:center;
    }

    .text {
        padding-left: 5px;
    }

}

.no {
 background-color: #f2f4f5;
 padding: 8px;
}

.team {
    color: black;
    background-color: white;

    .van-row {
        padding: 12px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #f2f4f5;
    }
}



</style>