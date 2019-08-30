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
      }
    },
    mounted() {
    },
    methods: {
    },
  }
</script>

<style lang="scss">
html,body {
  color: white;
  height: 100%;
  background-color: #f2f4f5;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
