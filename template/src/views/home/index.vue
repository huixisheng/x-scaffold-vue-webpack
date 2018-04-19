<style scoped>
.container { max-width: 540px; margin: 0 auto; padding: 0 10px; }
.demoshow { margin-bottom: 20px; }
h2 { color: #333; }
.btn { padding: 8px 0; border: 1px solid #FF4A83; color: #FF4A83; margin-bottom: 10px; text-align: center; border-radius: 4px; }
.btn > a { color: #FF4A83; display: block; }

.img-wrap { display: block; }
.img-wrap > img { max-width: 100%; display: block; }
</style>

<template>
  <div class="container">
    <div class="demoshow">
      <div class="">
        <h2>文档</h2>
        <template v-for="item in docsList">
          <div class="btn" type="primary" size="large" style="margin-bottom: 10px;" >
            <router-link v-if="item.router" :to="item.link">{{item.title}}</router-link>
            <a target="_blank" v-else :href="item.link">{{item.title}}</a>
          </div>
        </template>
        <div @click="handleAddDocSource" class="btn">添加</div>
      </div>
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
    <div class="img-wrap">
      <img src="~src/assets/logo.jpeg">
    </div>
  </div>
</template>

<script>
import { apiDocsList, apiAddVueSource } from 'src/api/index';

export default {
  data() {
    return {
      docsList: [],
      links: [
        {
          link: '/demo',
          router: true,
          name: '示例页面',
        },
        {
          link: '/test/index.html',
          router: false,
          name: '多页面入口例子页面',
        },
      ],
    };
  },
  props: {

  },
  methods: {
    handleAddDocSource() {
      apiAddVueSource({
        name: 'huixisheng',
      }).then((data) => {
        alert(data.msg);
      });
    },
  },
  created() {
    const self = this;
    apiDocsList().then((data) => {
      self.docsList = data.data;
    });
  },
};
</script>
