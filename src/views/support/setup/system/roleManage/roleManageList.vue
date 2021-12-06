<template>
  <div class="tab-list-content">
    <el-table
      :data="roleListData"
      v-loading="loading"
      border
      style="width: 100%"
      :stripe="true"
    >
      <el-table-column label="角色名称">
        <template slot-scope="scope">
          <div class="linStyle" @click="handleEdit(scope.row)">
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="enname"
        label="英文名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="officeName"
        label="归属机构"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="dataScopeName"
        label="数据范围"
        width="200"
      ></el-table-column>
      <el-table-column prop="name" label="操作" width="210">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleAddLower(scope.row)"
            >分配</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
          
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { roleList, roleDelete } from "@/api/styem/role";
import { MessageBox } from "element-ui";
import Bus from "@/utils/vueBus";
export default {
  data() {
    return {
      loading: true,
      total: 0,
      roleListData:undefined
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList(){
      const reponse = await roleList();
      this.roleListData = reponse.data;
      this.loading = false
    },
    handleEdit(row) {
      const { id } = row;
      Bus.$emit("outComeId", id);
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
          roleDelete({ id }).then(reponse => {
            if (reponse.code == 200) {
              this.$emit("backHandle", "update");
            }
          });
        })
        .catch(e => e);
    },
    handleAddLower(row){
      const { id } = row;
      Bus.$emit("outComeAllotId", id);
      this.$emit("handleSeeAmend", { tabState: "see", name: "see" });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-table .cell {
  display: flex;
}
</style>