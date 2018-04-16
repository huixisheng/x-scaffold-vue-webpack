<template>
  <transition name="router-fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: 'app',
  watch: {
    $route: () => {
      // 路由变化 from to
    },
  },
  // 属于组件内的钩子
  // https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
  beforeRouteEnter(to, from, next) {
    next();
  },
  afterEach() {
  },
};
</script>

<style>
.router-fade-enter-active, .router-fade-leave-active { transition: opacity 0.3s; }
.router-fade-enter, .router-fade-leave-active { opacity: 0; }
</style>
