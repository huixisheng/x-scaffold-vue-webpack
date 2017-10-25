<template>
  <div class="wrapper">
    <m-header :collapse="false"></m-header>
    <section class="section section-banner">
      <div class="container">
        <h1>main content</h1>
      </div>
    </section>
    <section class="section section-navigation">

    </section>
    <m-footer></m-footer>
  </div>
</template>

<script>
import MHeader from '../components/header';
import MFooter from '../components/footer';

export default {
  components: {
    MHeader,
    MFooter,
  },
};
</script>


<style lang="scss" scoped>
@import '../assets/style/index';

.navigation-panel {
  width: 290px !important;
}
</style>
