<template>
    <div class="withdraw">
        <van-nav-bar title="提现" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
            <van-icon name="notes-o" slot="right" size=20 />
        </van-nav-bar>
        <div class="select">
            <p>IA账户: {{ info.amount }}</p>
        </div>
        <div class="input">
            <van-cell-group>
                <van-field v-model="params.amount" required clearable label="提现金额" placeholder="请输入提现金额" />
                <van-field v-model="params.address" required clearable label="接收地址" placeholder="请输入提现地址" />
                <van-field clearable :placeholder="placeholder" label="收费标准" required :disabled="true" />
                <van-field v-model="params.password" @touchstart.native.stop="show = true" type="password" label="密码" placeholder="请输入密码" clearable required />
            </van-cell-group>
        </div>
        <div class="readme">
            <van-collapse v-model="activeNames">
                <van-collapse-item title="说明" name="1">
                    <div class="text">
                        每次提现手续费{{ token.fee }}%
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div class="submit">
            <van-button round type="danger" size="normal" color="#1989fa" :loading="button.loading" :disabled="this.params.amount == '' || this.params.address == ''" @click="submit">下一步</van-button>
        </div>
        <van-number-keyboard :show="show" theme="custom" extra-key="." close-button-text="完成" @blur="show = false" @input="onInput" @delete="onDelete" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false,

            placeholder: '收费',
            button: {
                loading: false,
                disabled: false,
            },
            info: {
                amount: '0.0000'
            },
            token: {
                fee: 0,
            },
            params: {
                amount: '',
                address: '',
                password: '',
            },
            point: {
                amount: '0',
            },
            wallet: {
                address: '-',
                amount: '0',
                lock_amount: '0',
                qrcode_url: '-',
                token: {
                    icon: '-',
                    cn_name: '-',
                    en_name: '-',
                },
            },
            activeNames:[1]
        }
    },
    methods: {
        onInput(value) {
            this.params.password += value
        },
        onDelete() {
            this.params.password = this.params.password.substring(0, this.params.password.length - 1)
            this.params.password.length - 1
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {
            this.$router.push({
                name: 'withdraw.index'
            });
        },
        async get_info() {
            let info = await this.$axios.get('/withdraw/info')
            this.info = info.data.info
            this.token = info.data.token
        },
        async submit() {
            this.button.loading = true

            await this.$axios.post('/withdraw', this.params).catch(res => {
                this.button.loading = false
                if(res.code == 10000){
                    this.onClickRight()
                }

            })
            this.button.loading = false



        },
    },
    mounted() {
        this.get_info()
    },
    watch: {

        params: {
            handler: function(newValue) {
                // console.log('你修改了a对象(watch deep)', newValue.type, oldValue.type)

                if (newValue.type == 'amount') {
                    this.placeholder = '收费'
                } else {
                    this.placeholder = '免费'
                }

            },
            deep: true
        },

    }
}
</script>
<style lang="scss">
.withdraw {

    .van-number-keyboard {
        background-color: #cecece;
    }


    .van-key--gray {
        background-color: #7aaaf3;
    }

    .select {
        margin-top: 1rem;
        padding-left: 1rem;
        margin-bottom: 1rem;
        color: #000;

        .van-radio {
            margin-top: 7px;
        }
    }

    .input {
        margin-top: 1rem;


        .van-field--disabled .van-field__control,
        .van-field__right-icon {
            color: red;
        }
    }

    .readme {
        margin-top: 1rem;

        .text {
            margin-bottom: 1rem;
        }
    }

    .submit {
        margin-top: 1rem;
        text-align: center;

        .van-button {
            width: 80%;
        }
    }

}
</style>