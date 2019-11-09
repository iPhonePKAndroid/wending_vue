<template>
  <div class="pwdHelper">
    <van-nav-bar :fixed="true" title="助记词" left-arrow left-text=" " right-text />
    <div class="top">
      <div class="icon-wrapper">
        <van-icon name="notes-o" />
      </div>
      <span v-if="noConfirm">请备份助记词</span>
      <span v-else>请确认助记词</span>
    </div>
    <div class="selected" v-if="!noConfirm">
      <van-button
        v-for="(item,index1) in selectedItem"
        :key="index1"
        type="info"
        plain
        size="small"
        @click="delItem(item,index1)"
      >{{item}}</van-button>
    </div>

    <div class="unselected">
      <template v-if="noConfirm">
        <van-button
          v-for="(item,index2) in tagTemp"
          :key="index2"
          type="info"
          plain
          size="small"
        >{{item}}</van-button>
      </template>
      <template>
        <van-button
          v-for="(item,index2) in unSelectedItem"
          :key="index2"
          type="info"
          plain
          size="small"
          @click="addItem(item,index2)"
        >{{item}}</van-button>
      </template>
    </div>
    <div class="submit-button">
      <van-button v-if="noConfirm" size="large" @click="toConfirm" type="info">下一步</van-button>
      <van-button
        v-else
        size="large"
        @click="submit"
        type="info"
        :disabled="selectedItem.length<12"
      >完成</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: [],
      unSelectedItem: [],
      tagTemp: [],
      noConfirm: true
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    addItem(item, index) {
      this.selectedItem.push(item);
      this.unSelectedItem.splice(index, 1);
    },
    delItem(item, index) {
      this.unSelectedItem.push(item);
      this.selectedItem.splice(index, 1);
    },
    async getTags() {
      if (this.noConfirm) {
        var res = await this.$axios("en");
        this.tagTemp = res.data;
      } else {
        var res = await this.$axios("en/show");
        this.unSelectedItem = res.data;
      }
    },
    async submit() {
      var res = await this.$axios.post("en", {
        code: this.selectedItem
      });
      if (res.code == 10000) {
        this.$router.push({
          name: "home"
        });
      }
    },
    toConfirm() {
      this.noConfirm = false;
      this.getTags();
    }
  },
  mounted() {
    this.getTags();
  }
};
</script>

<style lang="scss" >
.pwdHelper {
  background: #fff;
  height: 100%;
  .top {
    padding-top: 145px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .icon-wrapper {
      display: inline-block;
      height: 50px;
      width: 50px;
      background: #f2f4f5;
      font-size: 25px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
    }
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
  .submit-button {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>