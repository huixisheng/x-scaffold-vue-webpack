<template>
  <div class="at-component__container">
    <div class="at-component__sample">
      <slot name="demo"></slot>
    </div>
    <collapse-transition>
      <div class="at-component__code" v-show="isShow">
        <slot name="source-code"></slot>
        <span class="btn-copy" v-clipboard="$slots['source-code'][0] && $slots['source-code'][0].elm && $slots['source-code'][0].elm.innerText" @success="handleCopySuccess"><i class="icon icon-clipboard"></i></span>
      </div>
    </collapse-transition>
    <a class="at-component__code-toggle" @click="isShow = !isShow" v-text="showCodeHint"></a>
  </div>
</template>

<script>
import CollapseTransition from 'theme/utils/collapse-transition';

export default {
  components: {
    CollapseTransition,
  },
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    lang() {
      return this.$route.path.split('/')[1] || 'zh';
    },
    showCodeHint() {
      let text = '';
      if (this.lang === 'en') {
        text = this.isShow ? 'Hide Code' : 'Show Code';
      } else {
        text = this.isShow ? '隐藏代码' : '显示代码';
      }
      return text;
    },
  },
  methods: {
    handleCopySuccess() {
      this.$Message.success('Code copied.');
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn-copy {
    display: none;
    position: absolute;
    top: 16px;
    right: 16px;
    transition: all .3s;

    &:hover {
      color: #6190E8;
      transform: scale(1.2);
      cursor: pointer;
    }
  }
  .at-component__code:hover {
    .btn-copy {
      display: block;
      animation: fadeIn .3s both;
    }
  }
</style>
