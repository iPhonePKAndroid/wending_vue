<template>
  <div id="app">
    <router-view />

    <Tabar v-if="tabar" />
  </div>
</template>

<script>
import Tabar from "@/components/Tabar.vue";
export default {
  components: { Tabar },
  computed: {
    tabar() {
      return this.$route.meta.tabar === true;
    }
  },
  data() {
    return {};
  },
  async mounted() {
    this.$toast.setDefaultOptions({ duration: 7000 });
    // setInterval(() => {
    //   this.$notify({
    //     message: '联系QQ71314126',
    //     duration: 2000,
    //     background: '#07c160',
    //     onClick() {
    //       alert('联系微信iPhonePKAndroid')
    //     },
    //   });
    // }, 100000)
  }
};
</script>

<style lang="scss">
html,
body {
  // color: white;
  height: 100%;
  background-color: #f2f4f5;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
