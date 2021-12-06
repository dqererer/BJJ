<template>
  <div>
    <div class="tab-list-content">
      <div class="box-body">
        <el-form ref="form" :model="geoCategoryParams" label-width="180px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="方案名称：">
                <el-input v-model="geoCategoryParams.nameLike"></el-input>
              </el-form-item>
            </el-col>
            <el-form-item class="pull-right">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>

      <el-table
        v-loading="loading"
        :data="businsessData"
        border
        style="width: 100%"
        :stripe="true"
      >
        <el-table-column label="方案名称">
          <template v-slot="scope">
            <div
              class="linStyle"
              style="padding-left: 20px;"
              @click="handleEdit(scope.row)"
            >
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="packageName" label="生成模块"></el-table-column>
        <el-table-column prop="moduleName" label="模块名"></el-table-column>
        <el-table-column prop="functionName" label="功能名"></el-table-column>
        <el-table-column
          prop="functionAuthor"
          label="功能作者"
        ></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :pageNo.sync="geoCategoryParams.pageNo"
        :limit.sync="geoCategoryParams.pageSize"
        @pagination="getGenSchemeList"
      />
    </div>
  </div>
</template>

<script>
import { genSchemeList, genSchemeDelete } from "@/api/styem/develop";
import { MessageBox } from "element-ui";
import Bus from "@/utils/vueBus";
export default {
  data() {
    return {
      geoCategoryParams: {
        nameLike: undefined,
        pageNo: 1,
        pageSize: 15
      },
      loading: true,
      businsessData: undefined,
      total: 0
    };
  },
  created() {
    this.getGenSchemeList();
  },
  methods: {
    async getGenSchemeList() {
      this.loading = true;
      const reponse = await genSchemeList(this.geoCategoryParams);
      this.businsessData = reponse.data.list;
      this.total = reponse.data.count;
      this.loading = false;
    },
    async onSubmit() {
      this.geoCategoryParams.pageNo = 1;
      this.getGenSchemeList(this.geoCategoryParams);
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
      }).then(() => {
        genSchemeDelete({ id }).then(reponse => {
          if (reponse.code == 200) {
            this.getGenSchemeList(this.geoCategoryParams);
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-form-item__content {
  justify-content: flex-end;
}
/deep/.el-link--inner {
  font-weight: bold;
  color: red;
}
</style>
