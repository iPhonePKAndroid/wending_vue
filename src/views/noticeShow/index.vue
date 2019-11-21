<template>
  <div class="notice-wrapper">
    <van-nav-bar title="平台公告" left-text="返回" left-arrow @click-left="$router.go(-1)" />

    <div class="notice-content">
      <h3>{{content.name}}</h3>
      <h6>{{content.created_at}}</h6>
      <br />
      <div v-html="content.body"></div>
    </div>
  </div>
</template>

<script>
import { async } from "q";
export default {
  data() {
    return {
      content: {
        name: "",
        body: "",
        created_at: ""
      }
    };
  },
  methods: {
    async getContent() {
      var res = await this.$axios.get(`notice/${this.$route.params.id}`);
      console.log(res);
      this.content = res.data;
    }
  },
  mounted() {
    this.getContent();
  }
};
</script>

<style lang="scss">
.notice-wrapper {
  .notice-content {
    padding: 0 20px 40px 20px;
    h3 {
      text-align: center;
    }
    h6 {
      text-align: center;
    }
    img {
      width: 100%;
    }
  }
}
</style>