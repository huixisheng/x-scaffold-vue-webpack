<template>
<div>
  <div>Hello x-scaffold-vue-webpack</div>
  <div>
    <h2>数据请求例子</h2>
    <ul>
      <li v-for="item in list" :key="item.title">
        <a :href="item.url" v-text="item.title"></a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  // mixins: [],

  components: {},

  data() {
    return {
      list: [],
    };
  },

  computed: {

  },

  created() {
    this.fetchDataInit();
  },

  mounted() {

  },

  activated() {

  },

  methods: {
    fetchDataInit() {
      const self = this;
      this.$http.run('docsList', {})
        .then((data) => {
          this.list = data.data;
        })
        .catch((error) => {
          if (error && error.msg) {
            this.$message.error(error.msg);
          } else {
            console.log('error', error);
          }
        });
    },
  },
};

</script>
<style lang="less" scoped>

</style>