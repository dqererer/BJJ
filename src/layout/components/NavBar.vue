<template>
  <header>
    <el-header>
      <top-nav id="topmenu-container" class="topmenu-container" />
      <div class="option-area">
        <el-button
          icon="el-icon-back"
          size="mini"
          @click="goback"
          v-if="path != 'none'"
          >返回</el-button
        >

        <div class="avatar-wrapper">
          <img src="../../assets/images/user-icon.png" class="user-avatar" />
          <span class="manage-name" style="margin-left: 6px">{{
            userInfo.name
          }}</span>
        </div>
        <div class="exit" @click="logout">
          <img src="../../assets/images/platform/platform-exit.png" /><span
            >退出</span
          >
        </div>
      </div>
    </el-header>
  </header>
</template>

<script>
const avatar = require("@/assets/images/user-icon.png");
import { mapGetters } from "vuex";
import TopNav from "@/components/TopNav";
import { getItem } from "../../utils/storage";

export default {
  components: {
    TopNav,
  },
  data: function () {
    return {
      path: "",
      subName: '',
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created: function () {
    this.path = getItem("backPath");
    this.subName = getItem("subName");
  },
  methods: {
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store
          .dispatch("LogOut")
          .then(() => {
            location.reload();
          })
          .catch((err) => {
          });
      });
    },
    goback() {
      this.$router.push({ path: "/" + this.path });
    },
  },
};
</script>

<style lang="scss" scoped>
.option-area {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;

  .el-button {
    border: none;
    outline: none;
    color: white;
    font-size: 14px;
    background-color: transparent;
  }
}
.exit {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.avatar-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.exit {
  color: white;
  img {
    width: 20px;
    margin-right: 6px;
  }
}
.title {
  font-weight: bolder;
}
.subtitle {
  font-size: 13px;
}
</style>
