<template>
  <div class="withdraw">
    <van-nav-bar title="提现" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="notes-o" slot="right" size=20 />
    </van-nav-bar>


    <div class="select">

      <van-radio-group v-model="params.type">
        <van-radio name="amount">保证金提现（余额：{{ wallet.amount }}）</van-radio>
        <van-radio name="team_amount">团队抢单提现（余额：{{ wallet.team_amount }}）</van-radio>
        <van-radio name="sheet_amount">我的抢单提现（余额：{{ wallet.sheet_amount }}）</van-radio>
      </van-radio-group>

    </div>


    <div class="input">

      <van-cell-group>

        <van-field v-model="params.amount" required clearable label="提现金额" placeholder="请输入提现金额" />

        <van-field v-model="params.address" required clearable label="接收地址" placeholder="请输入提现地址" />


        <van-field clearable :placeholder="placeholder" label="收费标准" required :disabled="true" />

        <van-field
        v-model="params.password"
        @touchstart.native.stop="show = true"
        type="password"
        label="密码"
        placeholder="请输入密码"
        clearable
        required
        />


      </van-cell-group>


    </div>

    <div class="readme">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="说明" name="1">
          <div class="text">
            资金随进随出，完成抢单任务提现免手续费，没有完成抢单任务将扣取{{ info.token.fee }}个{{ info.token.cn_name }}
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>


    <div class="submit">

      <van-button round type="danger" size="normal" color="#1989fa" :loading="button.loading" :disabled="button.disabled" @click="submit">下一步</van-button>

    </div>


    <van-number-keyboard
    :show="show"
    theme="custom"
    extra-key="."
    close-button-text="完成"
    @blur="show = false"
    @input="onInput"
    @delete="onDelete"
    />


  </div>
</template>

<script>
  export default {
    data() {
      return {


        show: false,

        placeholder: '收费',

        info: {
          token: {
            min_withdraw: '0',
            cn_name: 'USDT',
            en_name: 'USDT',
          },
        },
        button: {
          loading: false,
          disabled: false,
        },
        params: {
          amount: '',
          address: '',
          type: 'amount',
          password: '',
        },
        point: {
          amount: '0',
        },
        wallet: {
          address: '-',
          amount: '0',
          lock_amount: '0',
          team_amount: '0',
          sheet_amount: '0',
          qrcode_url: '-',
          token: {
            icon: '-',
            cn_name: '-',
            en_name: '-',
          },
        },
        activeNames: ['1'],
      }
    },
    methods: {
      onInput(value) {
        this.params.password += value
      },
      onDelete() {
        this.params.password = this.params.password.substring(0, this.params.password.length-1)
        this.params.password.length-1
      },
      onClickLeft() {
        this.$router.go(-1);
      },
      onClickRight() {
        this.$router.push({
          name: 'withdraw.index'
        });
      },
      async get_wallet() {
        let wallet = await this.$axios.get('/wallet/recharge')
        this.wallet = wallet.data
      },
      async get_point() {
        let point = await this.$axios.get('/point')
        this.point = point.data
      },
      async get_info() {
        let info = await this.$axios.get('/withdraw/info')
        this.info = info.data
      },
      async submit() {
        this.button.loading = true

        let r = await this.$axios.post('/withdraw', this.params).catch(error => {
          this.button.loading = false
        })
        this.button.loading = false

      },
    },
    mounted() {
      this.get_wallet()
      this.get_point()
      this.get_info()
    },
    watch: {

      params: {
        handler: function(newValue, oldValue) {
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
    .van-radio {
      margin-top: 7px;
    }
  }

  .input {
    margin-top: 1rem;


    .van-field--disabled .van-field__control, .van-field__right-icon {
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