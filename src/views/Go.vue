<template>
    <div class="go">

        <div class="submit">
            <van-button round type="danger">点击抢单</van-button>
        </div>



        <div class="many">

            <van-row align="center" justify="center" type="flex">
                <van-col span="6">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="shop-o" color="#d5efda" size="50" />
                        </div>
                        <div class="gray">保障金</div>
                        <div>￥100.00</div>
                    </div>
                </van-col>
                <van-col span="6">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="discount" color="#eec4b3" size="50" />
                        </div>
                        <div class="gray">奖励金</div>
                        <div>￥100.00</div>
                    </div>
                </van-col>
                <van-col span="6">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="passed" color="#ea95a1" size="50" />
                        </div>
                        <div class="gray">佣金费率</div>
                        <div>￥100.00</div>
                    </div>
                </van-col>
                <van-col span="6">
                    <div class="c">
                        <div class="icon">
                            <van-icon name="clock-o" color="#638fd9" size="50" />
                        </div>
                        <div class="gray">抢单金额</div>
                        <div>￥100.00</div>
                    </div>
                </van-col>
            </van-row>


        </div>



    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
    }
</script>

<style lang="scss">
.go {
    color: black;
    text-align: center;


    .submit {
        margin-top: 5rem;
        margin-bottom: 5rem;
    }

    .many {
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

    }
}
</style>