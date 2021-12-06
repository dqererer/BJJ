<template>
  <div class="information-inner" ref="informationInner">
    <div v-show="noListLimits">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-tabs
            v-model="activeName"
            type="card"
            ref="tabs"
            @tab-click="tabClick"
          >
            <el-tab-pane label="测试列表" name="list">
              <testTree-list
                ref="dataList"
                @handleSeeAmend="handleSeeAmend"
              ></testTree-list>
            </el-tab-pane>
            <el-tab-pane
              ref="amendList"
              :label="tabState == 'add' ? '测试添加' : '测试修改'"
              name="add"
            >
              <testTree-amend @backHandle="backHandle"></testTree-amend>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <div v-show="!noListLimits">
      <h1>没有权限</h1>
    </div>
  </div>
</template>

<script>
import testTreeList from "./testTreeList";
import testTreeAmend from "./testTreeAmend";
import Bus from "@/utils/vueBus";
export default {
  components: {
    testTreeList,
    testTreeAmend
  },
  data() {
    return {
      activeName: "list",
      tabState: "add",
      noListLimits: true,
      disabledBoolean: false
    };
  },
  methods: {
    tabClick(tab) {
      if (this.disabledBoolean) {
        this.tabControlHide(1);
        return;
      }
      if (tab.name === "list") {
        this.tabState = "add";
        this.tabControlShow(1);
      } else if (tab.name === "add") {
        Bus.$emit("outComeId", "");
      }
    },
    handleSeeAmend(stateObj) {
      const tabState = stateObj.tabState;
      const name = stateObj.name;
      this.tabState = tabState;
      this.activeName = name;
      if (this.tabState == "noListLimits") {
        this.noListLimits = false;
      } else if (this.tabState == "ListLimits") {
        this.noListLimits = true;
        this.activeName = "list";
        this.tabState = "add";
        if (stateObj.name == false) {
          this.tabControlHide(1);
          this.disabledBoolean = true;
        }
      }
    },
    backHandle(name) {
      this.activeName = "list";
      if (this.disabledBoolean) {
        this.tabControlHide(1);
        return;
      }
      this.tabState = "add";
      this.tabControlShow(1);
      if (name == "update") {
        this.$refs.dataList.queryParams.pageNo = 1;
        this.$refs.dataList.getList();
      }
    }
  }
};
</script>