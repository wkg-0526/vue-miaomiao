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
      
    };
  },
  components: {
    NavBar
  }
};
</script>

<style>
</style>