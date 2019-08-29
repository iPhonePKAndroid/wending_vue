<template>
  <div id="app">
    <router-view />

    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" title="您的账号未激活，是否激活将消耗10个USDT？" @select="onSelect" />

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
        show: false,
        actions: [
          { name: '确认激活', color: '#07c160' },
        ],
      }
    },
    mounted() {
      this.check_active()
    },
    methods: {
      async onSelect(item) {
        this.show = false;
        let r = await this.$axios.post('/active')
      },
      async check_active() {
        let user = await this.$axios.get('/user')

        if (user.data.active == false) {
            this.show = true
        }

      },
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
