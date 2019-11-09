<template>
    <div class="go">
        <van-notice-bar :text="info.notice.body" left-icon="volume-o" />
        <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" title="您的账号未激活，是否激活将消耗10个USDT？" @select="onSelect" />
        <div class="total" v-if="info.total_active == '1'">今日总量：{{ info.total }}</div>
        <div class="submit">
            <div class="container">
                <div class="lucky-wheel">
                    <div class="lucky-title"></div>
                    <div class="wheel-main">
                        <div class="wheel-pointer-box">
                            <div class="wheel-pointer" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}">
                                <img v-if="active_go" src="../assets/img/draw_btn.png" width="100%" @click="rotate_handle()" />
                                <img v-else src="../assets/img/draw_btn_dis.png" width="100%" />
                            </div>
                        </div>
                        <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
                            <div class="prize-list">
                                <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                                    <div class="prize-pic">
                                        <img :src="item.icon" />
                                    </div>
                                    <div class="prize-count" v-if="item.count">{{item.count}}</div>
                                    <div class="prize-type">{{item.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="toast" v-show="toast_control">
                    <div class="toast-container">
                        <img :src="toast_pictrue" class="toast-picture" />
                        <div class="close" @click="close_toast()"></div>
                        <div class="toast-title">{{toast_title}}</div>
                        <div class="toast-btn">
                            <div class="toast-cancel" @click="close_toast">关闭</div>
                        </div>
                    </div>
                </div>
                <div class="toast-mask" v-show="toast_control"></div>
            </div>
            <!--       <lucky-wheel></lucky-wheel>
            <van-row>
                <van-col span="8" offset="8">
                    <van-button round type="danger" @click="togo">抢单</van-button>
                </van-col>
      </van-row>-->
        </div>
        <div class="many">
            <van-row align="center" justify="center" type="flex">
                <van-col span="8">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="shop-o" color="#d50000" size="50" />
                        </div>
                        <div class="gray">保障金</div>
                        <div class="small">$ {{ info.wallet.amount }}</div>
                    </div>
                </van-col>
                <van-col span="8">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="exchange" color="#630000" size="50" />
                        </div>
                        <div class="gray">抢单金额</div>
                        <div class="small">$ {{ info.wallet.sheet_amount }}</div>
                    </div>
                </van-col>
                <van-col span="8">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="friends-o" color="#607D8B" size="50" />
                        </div>
                        <div class="gray">团队抢单</div>
                        <div class="small">$ {{ info.wallet.team_amount }}</div>
                    </div>
                </van-col>
            </van-row>
        </div>
        <!-- <div style="color: white;">层级费率：{{ info.profit }}</div> -->
        <!--         <div class="replace">
            <van-panel status="闪兑服务">

                <van-row class="panel">
                    <van-col span="6" offset="3">
                        <span class="icon">
                            <van-icon name="https://cdn.mytoken.org/Fp2vnCNJY7QudKwqR2mA4tt3Cmhl" size="16" />
                        </span>
                        <span class="text">USDT</span>
                        <div class="text2">
                            {{ info.wallet.amount }}
                        </div>
                    </van-col>
                    <van-col span="2" offset="2">
                        <div class="middle">
                            <van-icon name="exchange" size="20" />
                        </div>
                    </van-col>
                    <van-col span="6" offset="2">
                        <span class="icon">
                            <van-icon name="https://cdn.mytoken.org/FkonJbqGpUId6qy6AiVVURateiLD" size="16" />
                        </span>
                        <span class="text">积分</span>
                        <div class="text2">
                            {{ info.point.amount }}
                        </div>
                    </van-col>
                </van-row>

                <van-row>
                    <van-col span="12">
                        <van-cell-group>
                            <van-field v-model="params.amount" input-align="center" size="12" placeholder="请输入USDT" />
                        </van-cell-group>
                    </van-col>
                    <van-col span="12">
                        <van-cell-group>
                            <van-field v-model="params.amount" input-align="center" size="12" placeholder="请输入积分" />
                        </van-cell-group>
                    </van-col>
                </van-row>


                <van-row>
                    <van-col offset="8">
                    </van-col>
                    <van-col span="8">
                        <div class="button">
                            <van-button type="primary" :round="true" size="large" @click="replace" :disabled="info.wallet.amount < params.amount || params.amount == 0">立即兑换</van-button>
                        </div>
                    </van-col>
                </van-row>

            </van-panel>

        </div>
    -->
    </div>
</template>
<script>
import LuckyWheel from "../components/luckywheel";
export default {
    data() {
        return {
            active: true,
            show: false,
            active_go: false,
            check_active_go_cron: '',
            actions: [{ name: "确认激活", color: "#07c160" }],
            info: {
                total_active: false,
                total: "0",
                profit: "0",
                notice: {
                    body: "-"
                },
                wallet: {
                    amount: "0",
                    sheet_amount: "0"
                },
                point: {
                    amount: "0"
                },
                sheet: {
                    amount: "0"
                }
            },
            params: {
                amount: "1"
            },

            easejoy_bean: 0, //金豆
            lottery_ticket: 0, //抽奖次数
            prize_list: [{
                    // icon: require("../assets/img/bean_500.png"), // 奖品图片
                    icon: require("../assets/img/bean_five.png"),
                    // count: 10, // 奖品数量
                    // name: "易趣豆", // 奖品名称
                    isPrize: 1 // 该奖项是否为奖品
                },
                {
                    icon: require("../assets/img/bean_five.png"),
                    // count: 5,
                    // name: "豆",
                    isPrize: 1
                },
                {
                    // icon: require("../assets/img/bean_one.png"),
                    icon: require("../assets/img/bean_five.png"),
                    // count: 10,
                    // name: "易趣豆",
                    isPrize: 1
                },
                {
                    // icon: require("../assets/img/point_five.png"),
                    icon: require("../assets/img/bean_five.png"),
                    // count: 5,
                    // name: "积分",
                    isPrize: 1
                },
                {
                    // icon: require("../assets/img/point_ten.png"),
                    icon: require("../assets/img/bean_five.png"),
                    // count: 10,
                    // name: "积分",
                    isPrize: 1
                },
                {
                    // icon: require("../assets/img/bean_500.png"),
                    icon: require("../assets/img/bean_five.png"),
                    // count: 10,
                    // name: "易趣豆",
                    isPrize: 1
                },
                {
                    // icon: require("../assets/img/give_up.png"),
                    icon: require("../assets/img/bean_five.png"),
                    // count: 0,
                    // name: "未中奖",
                    isPrize: 0
                },
                {
                    // icon: require("../assets/img/bean_500.png"),
                    icon: require("../assets/img/bean_five.png"),
                    // count: 10,
                    // name: "易趣豆",
                    isPrize: 1
                }
            ], //奖品列表
            toast_control: false, //抽奖结果弹出框控制器
            hasPrize: false, //是否中奖
            start_rotating_degree: 0, //初始旋转角度
            rotate_angle: 0, //将要旋转的角度
            start_rotating_degree_pointer: 0, //指针初始旋转角度
            rotate_angle_pointer: 0, //指针将要旋转的度数
            rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
            rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
            click_flag: true, //是否可以旋转抽奖
            index: 0,
            toast_title: "asdasd"
        };
    },
    methods: {
        async get_go() {
            let go = await this.$axios.get("/go");
            this.info = go.data;
        },
        async togo() {
            let togo = await this.$axios.post("/togo");
            this.toast_title = togo.message;
            this.get_go();
        },
        async onSelect() {
            this.show = false;
            await this.$axios.post("/active");
            this.get_go();
        },
        async withdraw() {
            // this.$toast('你好，渣渣辉！')
            this.$router.push({
                name: "withdraw"
            });
        },
        async replace() {
            let replace = await this.$axios.post("/replace", this.params);
            console.log(replace);
            this.get_go();
        },
        async check_active() {
            let user = await this.$axios.get("/user");

            if (user.data.active == false) {
                this.show = true;
            }
        },
        async check_active_go() {
            let active_go = await this.$axios.get("/active_go");
            this.active_go = active_go.data
        },

        rotate_handle() {
            this.index = 1; //指定每次旋转到的奖品下标
            this.rotating();
        },
        rotating() {
            if (!this.click_flag) return;
            var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
            var during_time = 5; // 默认为1s
            // var random = Math.floor(Math.random() * 7);
            var result_index = this.index; // 最终要旋转到哪一块，对应prize_list的下标
            var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
            var rand_circle = 6; // 附加多转几圈，2-3
            this.click_flag = false; // 旋转结束前，不允许再次触发
            if (type == 0) {
                // 转动盘子
                var rotate_angle =
                    this.start_rotating_degree +
                    rand_circle * 360 +
                    result_angle[result_index] -
                    (this.start_rotating_degree % 360);
                this.start_rotating_degree = rotate_angle;
                this.rotate_angle = "rotate(" + rotate_angle + "deg)";
                // // //转动指针
                // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
                // this.start_rotating_degree_pointer =360*rand_circle;
                var that = this;
                // 旋转结束后，允许再次触发
                setTimeout(function() {
                    that.click_flag = true;
                    that.game_over();
                }, during_time * 1000 + 1500); // 延时，保证转盘转完
            } else {
                //
            }
        },
        game_over() {
            this.toast_control = true;
            this.hasPrize = this.prize_list[this.index].isPrize;

            this.togo();
        },
        //关闭弹窗
        close_toast() {
            this.toast_control = false;
        },
        del() {
            clearInterval(this.check_active_go_cron)
        },
    },
    mounted() {
        this.get_go();
        if (this.$store.state.token) {
            this.check_active();
        }

        this.check_active_go()

        this.check_active_go_cron = setInterval(this.check_active_go, 10000)
    },
    components: {
        // LuckyWheel
    },
    computed: {
        // toast_title() {
        //   return this.hasPrize
        //     ? "恭喜您，获得" +
        //         this.prize_list[this.index].count +
        //         " " +
        //         this.prize_list[this.index].name
        //     : "未中奖";
        // },
        toast_pictrue() {
            return this.hasPrize ?
                require("../assets/img/congratulation.png") :
                require("../assets/img/sorry.png");
        }
    },
    beforeDestroy() {
        this.del()
    },
};
</script>
<style lang="scss">
.go {
    color: black;
    text-align: center;
    position: relative;
    height: 100%;
    background-image: url("../assets/back.gif");
    // background-image: url('https://photo.16pic.com/00/92/34/16pic_9234014_b.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    // background-color: #a7bdee;

    .total {
        color: red;
        // padding-top: 5rem;
    }

    .submit {
        // margin-top: 5rem;
        // padding-bottom: 5rem;

        .container {
            width: 100%;
        }

        .lucky-wheel {
            width: 100%;
            height: 31.5625rem;
            // background: rgb(252, 207, 133) url("../assets/img/color_pillar.png") no-repeat center bottom;
            background-size: 100%;
            // padding-top: 1.5625rem;
        }

        .lucky-title {
            width: 100%;
            height: 8.125rem;
            background: url("../assets/img/lucky_title.png") no-repeat center top;
            background-size: 100%;
        }

        .wheel-main {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .wheel-bg {
            width: 18.4375rem;
            height: 18.4375rem;
            background: url("../assets/img/draw_wheel.png") no-repeat center top;
            background-size: 100%;
            color: #fff;
            font-weight: 500;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            transition: transform 3s ease;
        }

        .wheel-pointer-box {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 100;
            transform: translate(-50%, -60%);
            width: 5.3125rem;
            height: 5.3125rem;
        }

        .wheel-pointer {
            width: 5.3125rem;
            height: 5.3125rem;
            // background: url("../assets/img/draw_btn.png") no-repeat center top;
            // background: url("../assets/img/draw_btn_dis.png") no-repeat center top;
            background-size: 100%;
            transform-origin: center 60%;
        }

        .wheel-bg div {
            text-align: center;
        }

        .prize-list {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .prize-list .prize-item {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
        }

        .prize-list .prize-item:first-child {
            top: 0;
            left: 8.3125rem;
            transform: rotate(20deg);
        }

        .prize-list .prize-item:nth-child(2) {
            top: 2.8rem;
            left: 10.8rem;
            transform: rotate(67deg);
        }

        .prize-list .prize-item:nth-child(3) {
            top: 6.4rem;
            left: 10.6rem;
            transform: rotate(-250deg);
        }

        .prize-list .prize-item:nth-child(4) {
            top: 9rem;
            left: 8.2125rem;
            transform: rotate(-210deg);
        }

        .prize-list .prize-item:nth-child(5) {
            top: 9.2125rem;
            left: 4.4rem;
            transform: rotate(-160deg);
        }

        .prize-list .prize-item:nth-child(6) {
            top: 6.3875rem;
            left: 1.9rem;
            transform: rotate(-111deg);
        }

        .prize-list .prize-item:nth-child(7) {
            top: 2.8rem;
            left: 1.8125rem;
            transform: rotate(-69deg);
        }

        .prize-list .prize-item:nth-child(8) {
            top: 0;
            left: 4.5rem;
            transform: rotate(-20deg);
        }

        .prize-item {
            width: 5.875rem;
            height: 9rem;
        }

        .prize-pic img {
            width: 4.0625rem;
            height: 2.5rem;
            margin-top: 1.5625rem;
        }

        .prize-count {
            font-size: 0.875rem;
        }

        .prize-type {
            font-size: 0.75rem;
        }

        .main {
            position: relative;
            width: 100%;
            min-height: 14.25rem;
            background: rgb(243, 109, 86);
            // padding-bottom: 1.6875rem;
        }

        .main-bg {
            width: 100%;
            height: 6.5625rem;
            position: absolute;
            top: -3.4375rem;
            left: 0;
            background: url("../assets/img/luck_bg.png") no-repeat center top;
            background-size: 100%;
        }

        .bg-p {
            width: 100%;
            height: 2.95rem;
            background: rgb(252, 207, 133);
        }

        .content {
            position: absolute;
            top: 0.175rem;
            left: 0;
            background: rgb(243, 109, 86);
            width: 100%;
            height: 5.1875rem;
            font-size: 1.125rem;
            color: #ffeb39;
            // padding-left: 6.75rem;
        }

        .content div {
            text-align: left;
        }

        .tip {
            position: relative;
            margin: 2.5rem auto 0;
            width: 17.5rem;
            border: 1px solid #fbc27f;
        }

        .tip-title {
            position: absolute;
            top: -1rem;
            left: 50%;
            transform: translate(-50%, 0);
            font-size: 1rem;
            color: #fccc6e;
            background: rgb(243, 109, 86);
            // padding: 0.3125rem 0.625rem;
        }

        .tip-content {
            // padding: 1.5625rem 0.625rem;
            font-size: 0.875rem;
            color: #fff8c5;
            line-height: 1.5;
        }

        .toast-mask {
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
            z-index: 10000;
            width: 100%;
            height: 100%;
        }

        .toast {
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 20000;
            transform: translate(-50%, -50%);
            width: 15.4375rem;
            background: #fff;
            border-radius: 0.3125rem;
            // padding: 0.3125rem;
            background-color: rgb(252, 244, 224);
        }

        .toast-container {
            position: relative;
            width: 100%;
            height: 100%;
            border: 1px dotted #fccc6e;
        }

        .toast-picture {
            position: absolute;
            top: -6.5rem;
            left: -1.5rem;
            width: 18.75rem;
            height: 8.5625rem;
        }

        .toast-pictrue-change {
            position: absolute;
            top: -1.5rem;
            left: -1.375rem;
            width: 17.5rem;
            height: 3.125rem;
        }

        .toast-title {
            // padding: 2.8125rem 0;
            font-size: 18px;
            color: #fc7939;
            text-align: center;
        }

        .toast-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.9375rem;
        }

        .toast-btn div {
            background-image: -moz-linear-gradient(-18deg,
                rgb(242, 148, 85) 0%,
                rgb(252, 124, 88) 51%,
                rgb(252, 124, 88) 99%);

            background-image: -ms-linear-gradient(-18deg,
                rgb(242, 148, 85) 0%,
                rgb(252, 124, 88) 51%,
                rgb(252, 124, 88) 99%);
            background-image: -webkit-linear-gradient(-18deg,
                rgb(242, 148, 85) 0%,
                rgb(252, 124, 88) 51%,
                rgb(252, 124, 88) 99%);
            box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
            width: 4.6875rem;
            height: 1.875rem;
            border-radius: 1.875rem;
            text-align: center;
            line-height: 1.875rem;
            color: #fff;
        }

        .close {
            position: absolute;
            top: -0.9375rem;
            right: -0.9375rem;
            width: 2rem;
            height: 2rem;
            background: url("../assets/img/close_store.png") no-repeat center top;
            background-size: 100%;
        }
    }

    .many {
        padding-bottom: 5rem;
        // position: absolute;
        // left: 5px;
        // right: 5px;
        // bottom: 100px;

        .van-col {
            padding: 8px;

            .c {
                border-radius: 8px;
                padding: 10px 0 10px 0;
                background-color: white;

                .gray {
                    color: gray;
                }
            }
        }

        .small {
            font-size: 11px;
        }
    }

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