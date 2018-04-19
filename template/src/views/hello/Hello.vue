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
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'hello x-scaffold-vue-webpack',
    };
  },
  methods: {

  },
};
</script>

<style>
.container { max-width: 540px; margin: 0 auto; padding: 0 10px; }
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
</style>
