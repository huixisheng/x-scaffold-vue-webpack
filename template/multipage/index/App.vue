<template>
<div>
  <div>页面入口列表</div>
  <ul>
    <li v-for="page in pages" :key="page.path">
      <a :href="'/' + page.path" v-text="page.name"></a>
    </li>
  </ul>
</div>
</template>

<script>
import pages from 'src/config/pages.json';

export default {
  title: '页面标题',
  data() {
    return {
      pages,
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