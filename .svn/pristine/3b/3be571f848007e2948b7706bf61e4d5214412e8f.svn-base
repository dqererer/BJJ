<template>
  <div class="information-inner information-styem" ref="informationInner">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        <!-- <div class="unfold-box">
          <el-button type="primary" size="mini" @click="unfoldClick" class="unfold-style">展开/关闭</el-button>
        </div>-->
        <div class="tree-container" :style="{ height: contentHeight + 'px' }">
          <el-tree
            :data="deptOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            :default-expand-all="defaultExpand"
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="20" style="background: #fff;
    padding-top: 10px;">
        <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
          <el-tab-pane label="用户列表" name="list">
            <user-manage-list
              ref="dataList"
              :deptId="deptId"
              :deptOptions="deptOptions"
              @handleSeeAmend="handleSeeAmend"
              @backHandle="backHandle"
            ></user-manage-list>
          </el-tab-pane>
          <el-tab-pane :label="tabState == 'add' ? '用户添加' : '用户修改'" name="add">
            <user-manage-amend :deptOptions="deptOptions" @backHandle="backHandle"></user-manage-amend>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userManageList from "./userManageList";
import userManageAmend from "./userManageAmend";
import { officeTreeData } from "@/api/styem/dept.js";
import Bus from "@/utils/vueBus";
export default {
  components: {
    userManageList,
    userManageAmend
  },
  data() {
    return {
      activeName: "list",
      tabState: "add",
      defaultExpand: true,
      deptName: undefined,
      deptId: undefined,
      deptOptions: [],
      contentHeight: "800",
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  created() {
    this.getofficeTreeData();
  },
  activated() {
    this.activeName = "list";
    this.tabState = "add";
  },
  watch: {
    deptName(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    async getofficeTreeData() {
      const reponse = await officeTreeData();
      const menu = this.handleTree(reponse.data, "id");
      this.deptOptions = menu;
    },
    handleNodeClick(value) {
      this.deptId = { value };
      this.activeName = "list";
      this.tabState = "add";
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    unfoldClick() {
      this.defaultExpand = !this.defaultExpand;
    },
    tabClick(tab) {
      if (tab.name === "list") {
        this.tabState = "add";
      } else if (tab.name === "add") {
        Bus.$emit("outUserComeId", "");
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
        this.$refs.dataList.getUserListb();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.head-container {
  .el-input {
    margin-bottom: 10px !important;
  }
}
.tree-container {
  margin-top: 10px;
  overflow-y: scroll;
}
.unfold-box {
  display: flex;
  justify-content: flex-end;
}
</style>