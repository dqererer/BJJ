<template>
  <div class="tab-list-content">
    <el-table
      :data="areaListData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      v-loading="loading"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="区域名称">
        <template slot-scope="scope">
          <div class="linStyle" @click="handleEdit(scope.row)">
            {{ scope.row.label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="code"
        label="区域编码"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="typeName"
        label="区域类型"
        width="120"
      ></el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>
      <el-table-column prop="name" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="primary"
            @click="handleAddLower(scope.row)"
            ><i class="el-icon-plus" style="margin-right:5px;"></i
            >添加下级区域</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { areaTreeNew, officeDelete } from "@/api/styem/dept";
import { MessageBox } from "element-ui";
import Bus from "@/utils/vueBus";
export default {
  data() {
    return {
      loading: true,
      total: 0,
      areaListData: undefined,
      geoCategoryParams: {
        pageNo: 1,
        pageSize: 15,
        geoCategory: undefined,
        name: undefined,
        dataType: undefined,
        version: undefined,
        year: undefined
      }
    };
  },
  created() {
     this.getAreaList();
  },
  methods: {
    async getAreaList() {
      const reponse = await areaTreeNew();
      this.areaListData = reponse.data;
      this.loading = false;
    },
    async load(tree, treeNode, resolve){
      const reponse = await areaTreeNew({parentId:tree.id});
      resolve(reponse.data)
    },
    handleEdit(row) {
      const { id } = row;
      Bus.$emit("outAreaComeId", {
        state: "amend",
        id
      });
      this.$emit("handleSeeAmend", { tabState: "amend", name: "add" });
    },
    handleDelete(row) {
      const { id } = row;
      MessageBox.confirm("是否要删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          officeDelete({ officeId: id }).then(reponse => {
            if (reponse.code == 200) {
              this.$emit("backHandle", "update");
            }
          });
        })
        .catch(e => e);
    },
    handleAddLower(row) {
      const { id } = row;
      Bus.$emit("outAreaComeId", {
        state: "addNext",
        id
      });
      this.$emit("handleSeeAmend", { tabState: "add", name: "add" });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-table .cell {
  display: flex;
}
</style>