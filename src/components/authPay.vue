<template>
  <div class="authPay">
    <van-password-input :value="value" info="密码为 6 位数字" />

    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="true"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      showKeyboard: false,
      value: ""
    };
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        this.$emit("readyPay", this.value);
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    clear() {
      this.value = "";
    }
  }
};
</script>

<style lang="scss">
.authPay {
}
</style>