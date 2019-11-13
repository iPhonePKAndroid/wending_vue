<template>
    <div class="resetPassword">
        <van-nav-bar :fixed="true" title="找回密码" left-arrow left-text=" " right-text @click-left="onClickLeft" @click-right="onClickRight" />
        <div class="input-area">
            <van-steps class="steps" :active="active">
                <van-step>输入账户</van-step>
                <van-step>输入助记词</van-step>
                <van-step>重置密码</van-step>
            </van-steps>
            <van-cell-group v-if="active==0">
                <van-field v-model="phone" clearable placeholder="请输入账户" />
            </van-cell-group>
            <template v-if="active==1">
                <div class="selected">
                    <van-button v-for="(item,index1) in selectedItem" :key="index1" type="info" plain size="small" @click="delItem(item,index1)">{{item}}</van-button>
                </div>
                <div class="unselected">
                    <van-button v-for="(item,index2) in unSelectedItem" :key="index2" type="info" plain size="small" @click="addItem(item,index2)">{{item}}</van-button>
                </div>
            </template>
            <template v-if="active==2">
                <van-cell-group>
                    <van-field v-model="changeValue.password" type="password" clearable placeholder="请输入密码" />
                    <van-field v-model="changeValue.password_confirmation" type="password" clearable placeholder="请确认密码" />
                </van-cell-group>
            </template>
        </div>
        <div class="bottomButton">
            <van-button size="large" type="info" :disabled="phone.length <=0" :hairline="true" @click="getNext" :square="true">下一步</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            phone: "",
            changeValue: {
                password: "",
                password_confirmation: ""
            },
            selectedItem: [],
            unSelectedItem: [],
            active: 0
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {
            this.$router.push({
                name: "my.payment.add"
            });
        },
        addItem(item, index) {
            this.selectedItem.push(item);
            this.unSelectedItem.splice(index, 1);
        },
        delItem(item, index) {
            this.unSelectedItem.push(item);
            this.selectedItem.splice(index, 1);
        },
        async getNext() {
            switch (this.active) {
                case 0:
                    var res = await this.$axios(`forget/${this.phone}`);
                    if (res.code == 200) {
                        this.unSelectedItem = res.data;
                        this.active++;
                    }

                    break;
                case 1:
                    var res = await this.$axios.post("forget", {
                        phone: this.phone,
                        code: this.selectedItem
                    });
                    if (res.code == 10000) {
                        this.active++;
                    }
                    break;
                case 2:
                    var res = await this.$axios.put(
                        `forget/${this.phone}`,
                        this.changeValue
                    );
                    if (res.code == 10000) {
                        this.$router.push({
                            name: "login"
                        });
                    }
            }
        }
    }
};
</script>
<style lang="scss">
.resetPassword {
  height: 100%;
  .input-area {
    padding-top: 45px;
    .steps {
      padding: 15px 40px;
    }

    .bottomButton {
        width: 100%;
        position: absolute;
        bottom: 0;
    }

    .selected {
        border-bottom: 1px solid #eee;
        margin: 30px 15px;

        .van-button {
            margin: 5px;
        }
    }

    .unselected {
        padding: 16px;

        .van-button {
            margin: 5px;
        }
    }
  }
  .van-steps {
    background: #13141a;
    .van-step--horizontal .van-step__circle-container {
      background: #13141a;
    }
  }
}
</style>