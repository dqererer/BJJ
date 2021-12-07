<template>
  <div class="app-wrapper">
    <div class="main-container">
      <sidebar class="sidebar-container"></sidebar>
      <app-main />
    </div>
    <div class="fixed-header">
      <nav-bar></nav-bar>
    </div>
  </div>
</template>

<script>
import { NavBar, Sidebar, AppMain } from "./components";
export default {
  name: "Layout",
  components: {
    NavBar,
    Sidebar,
    AppMain,
  },
  created: function () {
    this.$store
      .dispatch("getSystemMenu", '923947984784203841')
      .then((resource) => {
        router.addRoutes(resource);
        this.$router.push({ path: resource[0].path });
      });
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  display: flex;
  min-height: 100%;
  .main-container {
    min-height: 100%;
    width: 210px;
  }
}
.fixed-header {
  flex: 1;
}
</style>