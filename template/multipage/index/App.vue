<template>
<div>
  <div>页面入口列表</div>
  <ul>
    <li v-for="page in pages" :key="page.path">
      <a :href="'/' + page.path" v-text="page.title"></a>
    </li>
  </ul>
  <h2>单页入口</h2>
  <ul>
    <li v-for="route in routes" :key="route.path">
      <a :href="route.path" v-text="route.meta.title"></a>
    </li>
  </ul>
</div>
</template>

<script>
import pages from 'src/config/pages.json5';
import { routes } from 'src/routers/index';

export default {
  title: '页面标题',
  data() {
    return {
      pages,
      routes,
    };
  },
  created() {

  },
  props: {

  },
  methods: {

  },
};
</script>

<style scoped>
</style>