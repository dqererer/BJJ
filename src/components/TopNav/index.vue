<template>
  <el-menu :default-active="activeMenu" mode="horizontal" @select="handleSelect">
    <template v-for="(item, index) in topMenus">
      <el-menu-item :index="item.path" :key="index" v-if="index < visibleNumber">
        <!-- <svg-icon :icon-class="item.meta.icon" /> -->
        <i class="menu-img" :class="item.meta.class"></i>
        <span class="menu-text">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>

    <el-submenu index="more" v-if="topMenus.length > visibleNumber">
      <template slot="title">更多菜单</template>
      <template v-for="(item, index) in topMenus">
        <el-menu-item :index="item.path" :key="index" v-if="index >= visibleNumber">
          <!-- <svg-icon :icon-class="item.meta.icon" /> -->
          {{ item.meta.title }}
        </el-menu-item>
      </template>
    </el-submenu>
  </el-menu>
</template>
<script>
import { constantRoutes } from "@/router";
export default {
  data() {
    return {
      visibleNumber: 7,
      isFrist: false,
      currentIndex: undefined
    };
  },
  computed: {
    topMenus() {
      const topMenus = [];
      console.log(this.routers)
      debugger
      this.routers.map(menu => {
        if (menu.hidden !== true) {
          if (menu.path === "/") {
            topMenus.push(menu.children[0]);
          } else {
            topMenus.push(menu);
          }
        }
      });
      return topMenus;
    },
    routers() {
      debugger
      return this.$store.state.permission.topbarRouters;
    },
    childrenMenus() {
      var childrenMenus = [];
      this.routers.map(router => {
        for (var item in router.children) {
          if (router.children[item].parentPath === undefined) {
            if (router.path === "/") {
              router.children[item].path =
                "/redirect/" + router.children[item].path;
            } else {
              if (!this.ishttp(router.children[item].path)) {
                router.children[item].path =
                  router.path + "/" + router.children[item].path;
              }
            }
            router.children[item].parentPath = router.path;
          }

          childrenMenus.push(router.children[item]);
        }
      });
      return constantRoutes.concat(childrenMenus);
    },
    activeMenu() {
      const path = this.$route.path;
      let activePath = this.routers[0].path;
      if (path.lastIndexOf("/") > 0) {
        const tmpPath = path.substring(1, path.length);
        activePath = "/" + tmpPath.substring(0, tmpPath.indexOf("/"));
      } else if ("/index" == path || "" == path) {
      }
      var routes = this.activeRoutes(activePath);
      if (routes.length === 0) {
        activePath = this.currentIndex || this.routers[0].path;
        this.activeRoutes(activePath);
      }
      return activePath;
    }
  },
  beforeMount() {
    window.addEventListener("resize", this.setVisibleNumber);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setVisibleNumber);
  },
  mounted() {
    //this.setVisibleNumber();
  },
  methods: {
    setVisibleNumber() {
      const width = document.body.getBoundingClientRect().width;
      this.visibleNumber = parseInt(width / 110);
    },
    // 菜单选择事件
    handleSelect(key, keyPath) {
      this.currentIndex = key;
      if (this.ishttp(key)) {
        window.open(key, "_blank");
      } else if (key.indexOf("/redirect") !== -1) {
        this.$router.push({ path: key.replace("/redirect", "") });
      } else if (key.indexOf("redirect") !== -1) {
      } else {
        var routes = this.activeRoutes(key);
        var pathb = "";
        if (routes[0]) {
          pathb = routes[0].path;
          if (routes[0].children) {
            pathb += "/" + routes[0].children[0].path;
          }
        }
        this.$router.replace({ path: pathb });
      }
    },
    activeRoutes(key) {
      var routes = [];
      if (this.childrenMenus && this.childrenMenus.length > 0) {
        this.childrenMenus.map(item => {
          if (key == item.parentPath || (key == "index" && "" == item.path)) {
            routes.push(item);
          }
        });
      }
      if (routes.length > 0) {
        this.$store.commit("SET_SIDEBAR_ROUTERS", routes);
      }
      return routes;
    },
    ishttp(url) {
      return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
    }
  }
};
</script>

<style lang="scss" scoped>
.burg-home {
  background: url("~@/assets/images/burg-home.png") no-repeat center center;
}
.burg-prepare {
  background: url("~@/assets/images/burg-prepare.png") no-repeat center center;
}
.burg-garrison {
  background: url("~@/assets/images/burg-garrison.png") no-repeat center center;
}
.burg-examineReport {
  background: url("~@/assets/images/burg-examineReport.png") no-repeat center center;
}
.support-inspectorate {
  background: url("~@/assets/images/support-inspectorate.png") no-repeat center center;
}
.support-personnel {
  background: url("~@/assets/images/support-personnel.png") no-repeat center center;
}
.support-material {
  background: url("~@/assets/images/support-material.png") no-repeat center center;
}
.support-notification {
  background: url("~@/assets/images/support-notification.png") no-repeat center center;
}
.support-search {
  background: url("~@/assets/images/support-search.png") no-repeat center center;
}
.support-analyse {
  background: url("~@/assets/images/support-analyse.png") no-repeat center center;
}
.national-casemanage{
  background: url("~@/assets/images/national-casemanage.png") no-repeat center center;
}
.national-transact{
  background: url("~@/assets/images/national-transact.png") no-repeat center center;
}
.national-consult{
  background: url("~@/assets/images/national-consult.png") no-repeat center center;
}
.national-bulletin{
  background: url("~@/assets/images/national-bulletin.png") no-repeat center center;
}
.implement-dispatch{
  background: url("~@/assets/images/implement-dispatch.png") no-repeat center center;
}
.thread-icon{
  background: url("~@/assets/images/thread-icon.png") no-repeat center center;
}
.styem-exploit{
  background: url("~@/assets/images/styem-exploit.png") no-repeat center center;
}
.styem-apply{
  background: url("~@/assets/images/styem-apply.png") no-repeat center center;
}
.styem-set{
  background: url("~@/assets/images/styem-set.png") no-repeat center center;
}
</style>