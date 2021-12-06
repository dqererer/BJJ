<template>
  <div class="tab-list-content">
    <div class="box-body">
      <el-form :model="geoCategoryParams" label-width="140px">
        <el-row>
          <el-col :span="9">
            <el-form-item label="字典类型：">
              <el-select
                v-model="geoCategoryParams.type"
                placeholder="请选择数据类型"
                filterable
              >
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="item in typeListArry"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="描述：">
              <el-input v-model="geoCategoryParams.description"></el-input>
            </el-form-item>
          </el-col>
          <el-form-item style="float:right">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <el-table
      :data="spaceTableData"
      v-loading="loading"
      border
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="value" label="键值"> </el-table-column>
      <el-table-column  label="标签" width="200">
        <template slot-scope="scope">
          <div class="linStyle" @click="handleEdit(scope.row)">
            {{ scope.row.label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="160">
        <template v-slot="scope">
          <div class="linStyle" @click="handleSort(scope.row)">
            {{ scope.row.type }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="160"
      ></el-table-column>
      <el-table-column prop="sort"  label="排序"></el-table-column>
      <el-table-column prop="name" label="操作" width="380">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
          <el-button size="mini" type="primary" @click="handleValueAdd(scope.row)"
            >添加键值</el-button
          >
          <el-button
            size="mini"
            type="primary"
            @click="handleAddLower(scope.row)"
            ><i class="el-icon-plus" style="margin-right:5px;"></i
            >添加下级键值</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { dictList, dictDelete, dictTypeList } from "@/api/styem/log";
import { MessageBox } from "element-ui";
import Bus from "@/utils/vueBus";
export default {
  data() {
    return {
      loading: true,
      spaceTableData: [],
      typeListArry:[],
      total: 0,
      geoCategoryParams: {
        pageNo: 1,
        pageSize: 15,
        type: undefined,
        description: undefined
      }
    };
  },
  created () {
    this.getSpaceList();
    this.getTypeList();
  },
  methods: {
    async getTypeList(){
      const reponse = await dictTypeList();
      this.typeListArry = reponse.data;
    },
    async getSpaceList() {
      this.loading = true;
      const reponse = await dictList(this.geoCategoryParams);
      const menu = this.handleTree(reponse.data || [], "id", "parentId", "children", "0");
      this.spaceTableData = menu;
      this.loading = false;
    },
    onSubmit() {
      this.geoCategoryParams.pageNo = 1;
      this.getSpaceList();
    },
    handleEdit(row) {
      const { id } = row;
      Bus.$emit("outComeId", {
        state: "amend",
        id
      });
      this.$emit("handleSeeAmend", { tabState: "amend", name: "add" });
    },
    handleSort(row){
      const { type } = row;
      this.geoCategoryParams.type = type;
      this.getSpaceList();
    },
    handleValueAdd(row){
      const { id } = row;
      Bus.$emit("outComeId", {
        state: "addKey",
        id
      });
      this.$emit("handleSeeAmend", { tabState: "add", name: "add" });
    },
    handleAddLower(row){
      const { id } = row;
      Bus.$emit("outComeId", {
        state:'addNext',
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
      })
        .then(() => {
          dictDelete({ dictId:id }).then(reponse => {
            if (reponse.code == 200) {
              this.geoCategoryParams.pageNo = 1;
              this.getSpaceList();
            }
          });
        })
        .catch(e => e);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
