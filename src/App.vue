<template>
  <div id="app">
    <router-view />
    <Tabar v-if="tabar" />
  </div>
</template>

<script>
  import Tabar from '@/components/Tabar.vue'
  export default {
    components: { Tabar },
    computed: {
      tabar () {
        return this.$route.meta.tabar === true
      },
    },
    data() {
      return {
        active: true,
      }
    },
    async mounted() {

      setInterval(() => {
        this.$notify({
          message: '联系QQ71314126',
          duration: 2000,
          background: '#07c160',
          onClick() {
            alert('联系微信iPhonePKAndroid')
          },
        });
      }, 100000)

    },
  }
</script>

<style lang="scss">
body {
  color: white;
  background-color: #1d2243;
  a {
    color: white;
  }
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 12px;
  margin-bottom: 12px;
}
</style>
