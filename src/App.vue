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
<<<<<<< HEAD
    mounted() {
    },
    methods: {
=======
    async mounted() {

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

>>>>>>> 425629bc78a3a96b74b399d8f1a6a254d956c802
    },
  }
</script>

<style lang="scss">
<<<<<<< HEAD
html,body {
  color: white;
  // height: 100%;
  background-color: #f2f4f5;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // height: 100%;
=======
#app {
>>>>>>> 425629bc78a3a96b74b399d8f1a6a254d956c802
}
</style>
