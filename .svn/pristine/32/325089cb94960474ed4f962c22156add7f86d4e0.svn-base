<template>
  <div>
    <div class="tab-list-content">
      <div class="box-body">
        <el-form :model="queryParams" label-width="68px">
          <el-row>
            <el-form-item class="pull-right">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>

      <el-table
        :data="testTreeData"
        border
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="name" min-width="180px">
          <template v-slot="scope">
            <div
              class="linStyle"
              style="padding-left: 20px;"
              @click="handleEdit(scope.row)"
              min-width="180px"
            >
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="update_date"
          width="180px"
        ></el-table-column>
        <el-table-column
          prop="remarks"
          label="remarks"
          width="180px"
        ></el-table-column>
        <el-table-column label="操作" width="300">
          <template v-if="permissionBolean" slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleAddLower(scope.row)"
              ><i class="el-icon-plus" style="margin-right:5px;"></i
              >添加下级机构</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { dictListType } from "@/api/styem/dict/type.js";
import { testTreeList, testTreeDelete } from "@/api/case/tree";
import { MessageBox } from "element-ui";
import Bus from "@/utils/vueBus";
export default {
  data() {
    return {
      queryParams: {},
      testTreeData: [],
      delFlagArry: [],
      normalizer(node) {
        return {
          label: node.name
        };
      }
    };
  },
  created() {
    this.getList();
    this.getDictList();
  },
  mounted() {
    this.handlePermission(["tree:testTree:edit"]);
  },
  methods: {
    handlePermission(permissionsFlag) {
      const permissionBolean = this.hasPermission(permissionsFlag);
      this.permissionBolean = permissionBolean;
    },
    async getDictList() {
      const delFlagReponse = await dictListType({ type: "del_flag" });
      this.delFlagArry = delFlagReponse.data;
    },
    async getList() {
      this.loading = true;
      const reponse = await testTreeList();
      if (reponse.code === 500 && reponse.msg === "操作权限不足") {
        this.$emit("handleSeeAmend", { tabState: "noListLimits" });
        return;
      }
      this.$emit("handleSeeAmend", {
        tabState: "ListLimits",
        name: this.permissionBolean
      });
      if (!reponse.data) {
        this.testTreeData = [];
        return;
      }
      const menu = this.handleTree(
        reponse.data,
        "id",
        "parentId",
        "children",
        "0"
      );
      this.testTreeData = menu;
    },
    onSubmit() {
      this.queryParams.pageNo = 1;
      this.getList();
    },
    handleEdit(row) {
      const { id } = row;
      Bus.$emit("outComeId", {
        state: "amend",
        id,
        buttonShow: this.permissionBolean
      });
      this.$emit("handleSeeAmend", { tabState: "amend", name: "add" });
    },
    handleAddLower(row) {
      const { id } = row;
      Bus.$emit("outComeId", {
        state: "addNext",
        id
      });
      this.$emit("handleSeeAmend", { tabState: "add", name: "add" });
    },
    handleDelete(row) {
      const { id } = row;
      MessageBox.confirm("是否要删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        testTreeDelete({ id }).then(reponse => {
          if (reponse.code == 200) {
            this.queryParams.pageNo = 1;
            this.getList(this.queryParams);
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-table .cell {
  display: flex;
}
/deep/.el-table__expand-icon {
  margin-right: -20px !important;
}
</style>