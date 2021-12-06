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
              <testDataDemo-list
                ref="dataList"
                @handleSeeAmend="handleSeeAmend"
              ></testDataDemo-list>
            </el-tab-pane>
            <el-tab-pane
              ref="amendList"
              :label="tabState == 'add' ? '测试添加' : '测试修改'"
              name="add"
            >
              <testDataDemo-amend @backHandle="backHandle"></testDataDemo-amend>
            </el-tab-pane>
            <el-tab-pane label="测试查看" name="see">
              <testDataDemo-see @backHandle="backHandle"></testDataDemo-see>
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
import testDataDemoList from "./testDataDemoList";
import testDataDemoAmend from "./testDataDemoAmend";
import testDataDemoSee from "./testDataDemoSee";
import Bus from "@/utils/vueBus";
export default {
  components: {
    testDataDemoList,
    testDataDemoAmend,
    testDataDemoSee
  },
  data() {
    return {
      activeName: "list",
      tabState: "add",
      noListLimits: true,
      disabledBoolean: false
    };
  },
  created() {
    this.tabControlHide(2);
  },
  methods: {
    tabClick(tab) {
      if (this.disabledBoolean) {
        this.tabControlHide(1);
        this.tabControlHide(2);
        return;
      }
      if (tab.name === "list") {
        this.tabState = "add";
        this.tabControlShow(1);
        this.tabControlHide(2);
      } else if (tab.name === "add") {
        Bus.$emit("outComeId", "");
      }
    },
    handleSeeAmend(stateObj) {
      const tabState = stateObj.tabState;
      const name = stateObj.name;
      this.activeName = name;
      if (tabState == "amend" && name == "add") {
        this.tabState = tabState;
      } else if (tabState == "see" && name == "see") {
        this.tabControlShow(2);
        this.tabControlHide(1);
      } else if (tabState == "noListLimits") {
        this.noListLimits = false;
      } else if (tabState == "ListLimits") {
        this.noListLimits = true;
        this.activeName = "list";
        if (name == false) {
          this.tabControlHide(1);
          this.disabledBoolean = true;
        }
      }
    },
    backHandle(name) {
      this.activeName = "list";
      this.tabState = "add";
      this.tabControlShow(1);
      this.tabControlHide(2);
      if (name == "update") {
        this.$refs.dataList.queryParams.pageNo = 1;
        this.$refs.dataList.getList();
      }
    }
  }
};
</script>