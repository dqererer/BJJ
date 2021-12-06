<template>
  <div class="information-inner">
    <el-row :gutter="20">
      <el-col :span="4" style="overflow: hidden;">
        <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 10px"
          />
        </div>
        <div class="tree-container">
          <el-tree
            ref="tree"
            :data="deptList"
            :props="defaultProps"
            :expand-on-click-node="true"
            :highlight-current="true"
            :filter-node-method="filterNode"
            :default-expand-all="defaultExpand"
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="20" style="background-color:#fff">
        <personnel-list :deptId="deptId"></personnel-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import personnelList from "./personnelList";
import { officeTreeData } from "@/api/styem/dept.js";
export default {
  components: {
    personnelList
  },
  data() {
    return {
      deptName: undefined,
      deptList: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      defaultExpand: false,
      deptId: undefined
    };
  },
  created() {
    this.getofficeTreeData();
  },
  watch: {
    deptName(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    async getofficeTreeData() {
      const reponse = await officeTreeData({isAll:true});
      const menu = this.handleTree(reponse.data, "id");
      this.deptList = menu;
    },
    filterNode(val, data) {
      if (!val) return true;
      return data.name.indexOf(val) !== -1;
    },
    handleNodeClick(data) {
      const { id } = data;
      this.deptId = id;
    }
  }
};
</script>

<style lang="scss" scoped>
.information-inner{
  padding:10px;
}
.tree-container{
  height: calc(100vh - 60px);
  /deep/.el-tree {
    overflow: hidden;
  }
}
</style>