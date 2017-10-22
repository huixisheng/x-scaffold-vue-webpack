<template>
  <div class="container">
    <div class="less-flex demo">
      <div class="less-flex-item demo-item">{{ msg }}</div>
      <div class="less-flex-item demo-item">{{ msg }}</div>
    </div>

    <div class="demo">
      <div class="img-wrap">
        <img src="~src/assets/logo.jpeg">
      </div>
    </div>

    <div class="demo">
      <div class="img-css"></div>
    </div>

    <div class="demoshow">
      <div class="">
        <h2>页面入口</h2>
        <template v-for="item in links">
          <div class="btn" type="primary" size="large" style="margin-bottom: 10px;" >
            <router-link v-if="item.router" :to="item.link">{{item.name}}</router-link>
            <a v-else :href="item.link">{{item.name}}</a>
          </div>
        </template>
      </div>
    </div>

    <div class="demoshow">
      <div class="">
        <h2>文档</h2>
        <template v-for="item in docsLinks">
          <div class="btn" type="primary" size="large" style="margin-bottom: 10px;" >
            <router-link v-if="item.router" :to="item.link">{{item.name}}</router-link>
            <a target="_blank" v-else :href="item.link">{{item.name}}</a>
          </div>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'hello x-scaffold-vue-webpack',
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

<style>
.container { max-width: 540px; margin: 0 auto; }
.demo { margin-bottom: 20px; text-align: center; }
.demo-item { border: 1px solid #ddd; padding: 20px 0; margin: 0 10px; }
.img-wrap { display: block; }
.img-wrap > img { max-width: 100%; display: block; }
.img-css { width: 75px; height: 76px; background: url(~src/assets/logo.jpeg) no-repeat center center; background-size: cover; }
img { display: block; }
</style>
<style lang="less">
.less-flex {
  display: flex;
  &-item {
    flex: 1;
  }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demoshow { margin-bottom: 20px; }
h2 { color: #333; }
.btn { padding: 8px 0; border: 1px solid #FF4A83; color: #FF4A83; margin-bottom: 10px; text-align: center; border-radius: 4px; }
.btn > a { color: #FF4A83; display: block; }
</style>
