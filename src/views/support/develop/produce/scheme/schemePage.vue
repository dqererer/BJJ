<template>
  <div class="information-inner information-styem" ref="informationInner">
    <el-row :gutter="20" class="information-styme-row">
      <el-col :span="24" class="information-styme-col">
        <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
          <el-tab-pane label="生成方案列表" name="list">
            <scheme-list
              ref="dataList"
              @handleSeeAmend="handleSeeAmend"
              @backHandle="backHandle"
            ></scheme-list>
          </el-tab-pane>
          <el-tab-pane
            ref="amendList"
            :label="tabState == 'add' ? '生成方案添加' : '生成方案修改'"
            name="add"
          >
            <scheme-amend @backHandle="backHandle"></scheme-amend>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import schemeList from "./schemeList";
import schemeAmend from "./schemeAmend";
import { officeTreeData } from "@/api/styem/dept.js";
import Bus from "@/utils/vueBus";
export default {
  components: {
    schemeList,
    schemeAmend
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
        Bus.$emit("outComeId", "");
      }
    },
    handleSeeAmend(stateObj) {
      this.tabState = stateObj.tabState;
      this.activeName = stateObj.name;
    },
    backHandle(name) {
      this.activeName = "list";
      this.tabState = "add";
      if (name == "update") {
        this.$refs.dataList.getGenSchemeList();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tree-container {
  margin-top: 10px;
  overflow-y: scroll;
}
</style>