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
      <a :href="route.path" v-text="showSpaTitile(route)"></a>
      <ol v-if="route.children && route.children.length">
        <li v-for="subRoute in route.children" :key="subRoute.path">
          <a :href="subRoute.path" v-text="showSpaTitile(subRoute)"></a>
        </li>
      </ol>
    </li>
  </ul>
</div>
</template>

<script>
import pages from 'src/config/pages.json5';
import { routes } from 'src/routers/index';

export default {
  title: '所有页面入口',
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
    showSpaTitile(route) {
      if (route.meta && route.meta.title) {
        return route.meta.title;
      }
      return route.path;
    },
  },
};
</script>

<style scoped>
</style>