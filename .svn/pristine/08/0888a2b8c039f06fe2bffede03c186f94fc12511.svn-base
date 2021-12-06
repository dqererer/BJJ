<template>
  <div class="styem-body" :style="{ height: styemHeight + 'px' }">
    <div class="styem-header">
      <div class="styem-header-left">
        <span class="header-left-state header-left-date">{{ dateShow }}</span>
        <span class="header-left-state header-left-name">{{
          userInfo.name
        }}</span>
      </div>
      <span class="styem-header-right" @click="loginMap">进入系统</span>
      <div class="styem-nav">
        <span
          class="nav-item nav-item-special"
          :class="isActive == 1 ? 'active' : ''"
          @click="handleNavItemClick('1')"
          >线索专题</span
        >
        <span
          class="nav-item nav-item-national"
          :class="isActive == 2 ? 'active' : ''"
          @click="handleNavItemClick('2')"
          >对接中央专题</span
        >
        <span
          class="nav-item nav-item-rectify"
          :class="isActive == 4 ? 'active' : ''"
          @click="handleNavItemClick('4')"
          >整改落实专题</span
        >
        <span
          class="nav-item nav-item-burg"
          :class="isActive == 3 ? 'active' : ''"
          @click="handleNavItemClick('3')"
          >自治区督察专题</span
        >
      </div>
    </div>
    <burg-screen v-if="isActive==3"></burg-screen>
    <rectify-screen v-if="isActive==4"></rectify-screen>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import burgScreen from "./burgScreen";
import rectifyScreen from "./rectifyScreen";
import { mapGetters } from "vuex";
export default {
  name: "oneMap",
  components: {
    burgScreen,
    rectifyScreen
  },
  data() {
    return {
      styemHeight: 0,
      dateShow: undefined,
      isActive: 3
    };
  },
  created() {
    this.getStyemHeight();
    this.getDate();
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions["PlatformRouters"],
    getStyemHeight() {
      const windowH = window.innerHeight;
      this.styemHeight = windowH;
    },
    getDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const day = date.getDate();
      const dateShow = year + "-" + month + "-" + day;
      this.dateShow = dateShow;
    },
    handleNavItemClick(value){
      this.isActive = value
    },
    loginMap() {
      this.$router.push({ path: "/platform" });
      this.$store.dispatch("PlatformRouters");
    },
    exitMap() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.reload();
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.styem-body {
  background: url("~@/assets/images/styem-bg.jpg") no-repeat center center;
  background-size: cover;
  .styem-header {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 90px;
    background: url("~@/assets/images/styem-header.png") no-repeat center center;
    .styem-header-left {
      position: absolute;
      left: 1.7%;
      top: 12px;
      .header-left-state {
        height: 16px;
        line-height: 16px;
        padding-left: 24px;
        font-size: 14px;
        color: #fff;
        margin-top: 8px;
        display: block;
        &.header-left-date {
          background: url("~@/assets/images/styem-time.png") no-repeat left
            center;
        }
        &.header-left-name {
          background: url("~@/assets/images/styem-person.png") no-repeat left
            center;
        }
      }
    }
    .styem-header-right {
      position: absolute;
      right: 1.7%;
      top: 24px;
      font-size: 18px;
      color: #fff;
      padding-left: 28px;
      display: block;
      cursor: pointer;
      background: url("~@/assets/images/styem-intro.png") no-repeat left center;
      font-family: Georgia, "Times New Roman", Times, serif;
    }
    .styem-nav {
      width: 1312px;
      height: 34px;
      line-height: 34px;
      margin: 54px auto 0 auto;
      .nav-item {
        cursor: pointer;
        display: inline-block;
        text-align: center;
        width: 146px;
        height: 34px;
        font-size: 18px;
        color: #00f0ff;
        background: url("~@/assets/images/styem-tab-bg.png") no-repeat center
          center;
        font-family: Georgia, "Times New Roman", Times, serif;
        &.nav-item-special {
        }
        &.nav-item-national {
          margin-left: 46px;
        }
        &.nav-item-burg {
          float: right;
          margin-right: 46px;
        }
        &.nav-item-rectify {
          float: right;
        }
        &.active {
          background: url("~@/assets/images/styem-tab-bga.png") no-repeat center
            center;
          color: #fcee21;
        }
      }
    }
  }
}
</style>