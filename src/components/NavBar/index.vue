<template>
  <van-tabs v-model="active" route title-active-color="#0c6edf">
    <van-tab :to="{name:'City'}" title="北京">内容 1</van-tab>
    <van-tab :to="{name:'Hot'}" title="正在热映">内容 2</van-tab>
    <van-tab :to="{name:'ComingSoon'}" title="即将上映">内容 3</van-tab>
    <van-tab :to="{name:'Search'}" title="搜索">内容 4</van-tab>
  </van-tabs>
</template>

<script>
export default {
  data() {
    return {
      active: 1
    };
  }
};
</script>

<style>
</style>