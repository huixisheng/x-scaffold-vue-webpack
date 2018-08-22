/* 使用x-do-view自动生成，修改会被覆盖 */
const SnippetDemo = () => import('src/pages/snippet/Demo');
const SnippetDemoform = () => import('src/pages/snippet/DemoForm');
const SnippetDemohttp = () => import('src/pages/snippet/DemoHttp');

const routerList = [];

routerList.push({
  path: 'demo',
  component: SnippetDemo,
  meta: {
    title: 'Demo',
  },
  name: 'snippetDemo',
  hidden: false,
});

routerList.push({
  path: 'demo-form',
  component: SnippetDemoform,
  meta: {
    title: '表单例子',
  },
  name: 'snippetDemoForm',
  hidden: false,
});

routerList.push({
  path: 'demo-http',
  component: SnippetDemohttp,
  meta: {
    title: '数据请求例子',
  },
  name: 'snippetDemoHttp',
  hidden: false,
});


export default routerList;