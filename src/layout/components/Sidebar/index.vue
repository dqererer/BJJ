<template>
  <div class="side-menu" v-if="menuShow">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        mode="vertical"
        :default-active="activeMenu"
        :collapse="false"
        :unique-opened="true"
        :collapse-transition="false"
        class="el-menu-vertical-demo"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters,mapMutations } from "vuex";
import SidebarItem from "./sidebarItem";
export default {
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters(["sidebarRouters"]),
    menuShow(){
      const sidebarRouters = this.sidebarRouters;
      if(sidebarRouters.length===1 && !sidebarRouters[0].children){
        this.$store.commit('SET_SIDEBARSHOW',false)
        return false
      }
      this.$store.commit('SET_SIDEBARSHOW',true)
      return true
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>