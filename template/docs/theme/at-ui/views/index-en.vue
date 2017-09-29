<template>
  <div class="wrapper">
    <m-header :collapse="false"></m-header>
    <section class="section section-banner">
      <div class="container">

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
