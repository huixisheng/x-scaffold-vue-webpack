<template>
  <div class="about">
    <h2>数据请求例子</h2>
    <ul>
      <li v-for="item in list" :key="item.title">
        <a :href="item.url" v-text="item.title"></a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  title: '数据请求例子',
  name: 'snippetDemoHttp',
  data() {
    return {
      list: [],
    };
  },
  activated() {
    // 直接刷新不触发？
    console.log('DemoHttp-> activated');
    this.fetchDataInit();
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
  components: {},
  created() {
    console.log('DemoHttp-> created');
    this.fetchDataInit();
  },
};
</script>
