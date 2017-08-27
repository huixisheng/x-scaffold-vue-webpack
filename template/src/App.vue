<template>
  <div class="container" id="app">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  watch: {
    $route: (to, from) => {
      console.log(to);
      console.log(from);
    },
  },
  // 属于组件内的钩子
  // https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
  beforeRouteEnter() {
    // debugger;
  },
  // 无效果
  afterEach() {
    // debugger;
  },
};
</script>

<style>
/* @todo 切换的动画优化 */
.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}
</style>
