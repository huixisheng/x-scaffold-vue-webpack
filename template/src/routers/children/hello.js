const HelloHello = () => import('src/views/hello/Hello');

/* 使用x-do-cli的命令 x view 自动生成 */

const routerList = [];

routerList.push({
  path: 'hello',
  component: HelloHello,
  meta: {
    title: '',
  },
  name: 'helloHello',
  hidden: false,
});


export default routerList;