<template>
  <div class="information-inner information-styem" ref="informationInner">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick" ref="tabs" class="information-styem-tab">
      <el-tab-pane label="字典列表" name="list">
        <diction-manage-list
          ref="dataList"
          @handleSeeAmend="handleSeeAmend"
        ></diction-manage-list>
      </el-tab-pane>
      <el-tab-pane
        :label="tabState == 'add' ? '字典添加' : '字典修改'"
        name="add"
      >
        <diction-manage-amend
          @backHandle="backHandle"
        ></diction-manage-amend>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import dictionManageList from "./dictionManageList";
import dictionManageAmend from "./dictionManageAmend";
import bus from "@/utils/vueBus";
export default {
  components: {
    dictionManageList,
    dictionManageAmend
  },
  data() {
    return {
      activeName: "list",
      tabState: "add",
    };
  },
  methods: {
    tabClick(tab) {
      if (tab.name === "list") {
        this.tabState = "add";
      } else if (tab.name === "add") {
        bus.$emit("outComeId", "");
      }
    },
    handleSeeAmend(stateObj) {
      const tabState = stateObj.tabState;
      const name = stateObj.name;
      if (tabState == "amend" && name == "add") {
        this.tabState = tabState;
        this.activeName = name;
      } else if (tabState == "add" && name == "add") {
        this.activeName = name;
      }
    },
    backHandle(name) {
      this.activeName = "list";
      this.tabState = "add";
      if (name == "update") {
        this.$refs.dataList.geoCategoryParams.pageNo = 1;
        this.$refs.dataList.getSpaceList();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>