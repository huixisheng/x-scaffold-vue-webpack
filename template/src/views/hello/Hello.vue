<template>
  <div class="demo">
    <div class="demo-item">
      <h2>页面入口</h2>
      <template v-for="item in links">
        <div class="btn" type="primary" size="large" style="margin-bottom: 10px;" >
          <router-link v-if="item.router" :to="item.link">{{item.name}}</router-link>
          <a v-else :href="item.link">{{item.name}}</a>
        </div>
      </template>
    </div>

    <div class="demo-item">
      <h2>文档</h2>
      <template v-for="item in docsLinks">
        <div class="btn" type="primary" size="large" style="margin-bottom: 10px;" >
          <router-link v-if="item.router" :to="item.link">{{item.name}}</router-link>
          <a target="_blank" v-else :href="item.link">{{item.name}}</a>
        </div>
      </template>
    </div>

    <div class="demo-item">
      <h2>组件-xx-demo</h2>
      <section></section>
    </div>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      links: [
        {
          link: '/',
          router: true,
          name: '首页',
        },
        {
          link: '/test/index.html',
          router: false,
          name: '多页面入口例子页面',
        },
      ],
      docsLinks: [
        {
          link: 'https://cn.vuejs.org/index.html',
          router: false,
          name: 'vue官方文档',
        },
        {
          link: 'https://router.vuejs.org/zh-cn/',
          router: false,
          name: 'vue-router',
        },
        {
          link: 'https://github.com/vuejs/awesome-vue',
          router: false,
          name: 'awesome-vue',
        },
        {
          link: 'https://mint-ui.github.io/docs/#/zh-cn',
          router: false,
          name: 'mint-ui',
        },
        {
          link: 'https://github.com/MeCKodo/vue-tap/blob/master/doc/use.MD',
          router: false,
          name: 'v-tap',
        },
        {
          link: 'https://vuex.vuejs.org/zh-cn/',
          router: false,
          name: 'vuex',
        },
        {
          link: 'https://github.com/mzabriskie/axios',
          router: false,
          name: 'axios',
        },
      ],
    };
  },
  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo { max-width: 540px; margin: 0 auto; }
.demo-item{ margin-bottom: 20px; }
h2 { color: #333; }
.btn { padding: 8px 0; border: 1px solid #FF4A83; color: #FF4A83; margin-bottom: 10px; text-align: center; border-radius: 4px; }
.btn > a { color: #FF4A83; display: block; }
</style>
