<template>
  <div id="main">
    <Header></Header>
    <div class="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
import Header from "@/components/Header";
export default {
  name: "home",
  components: {
    TabBar,
    Header
  }
};
</script>
<style scoped>
#main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: auto;
}
</style>
