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
      // console.log(to);
      // console.log(from);
    },
  },
  // 属于组件内的钩子
  // https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
  beforeRouteEnter(to, from, next) {
    next();
  },
  afterEach() {
    // debugger;
  },
};
</script>

<style>
/* @todo 切换的动画优化 */
.router-fade-enter-active, .router-fade-leave-active { transition: opacity 0.3s; }
.router-fade-enter, .router-fade-leave-active { opacity: 0; }
</style>
