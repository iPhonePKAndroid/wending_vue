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
    },
  }
</script>

<style lang="scss">
body {
  color: white;
  background-color: #f2f4f5;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
