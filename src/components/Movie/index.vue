<template>
  <div>
    <NavBar></NavBar>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  data() {
    return {
      title: "我是Movie"
    };
  },
  components: {
    NavBar
  }
};
</script>

<style>
</style>