/* 使用x-do-view自动生成，修改会被覆盖 */
const DashboardIndex = () => import('src/pages/dashboard/Index');

const routerList = [];

routerList.push({
  path: 'index',
  component: DashboardIndex,
  meta: {
    title: '页面标题',
  },
  name: 'dashboardIndex',
  hidden: false,
});


export default routerList;