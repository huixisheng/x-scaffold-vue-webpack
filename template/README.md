# {{ name }}

> {{ description }}


## 生成路由和页面的通用组件 ##
> views/ 页面组件指定title用于页面标题的显示
```
# 生成card.vue在src/views/group下
$ x-do-view card [-o src/views] -c group
# 生成card.vue在src/components/group
$ x-do-component card [-o src/components] -c group
```