<template>
  <div>
    <el-dialog
      title="调取书证"
      :visible.sync="bookOpen"
      :before-close="handleDialogBookClose"
      width="80%"
      append-to-body
      class="information-inner"
    >
      <div class="box-body">
        <el-form :model="queryLogParams" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="资料名称：">
                <el-input v-model="queryLogParams.name" placeholder="请输入资料名称"></el-input>
              </el-form-item>
            </el-col>
            <el-form-item class="pull-right marginLeft0">
              <el-button type="primary" @click="onDialogQuery">查询</el-button>
              <el-button type="primary" @click="onDialogClear">清空</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <el-table :data="accounList" v-loading="dialogLoading" style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
          <template v-slot="scope">
            <span>
              {{
              (queryLogParams.pageNo - 1) * queryLogParams.pageSize + scope.$index + 1
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="160px"></el-table-column>
        <el-table-column prop="areaName" label="所属地区" min-width="100px"></el-table-column>
        <el-table-column prop="fromPerson" label="提供人" min-width="100px"></el-table-column>
        <el-table-column prop="sourceFromName" label="文件分类" width="120px"></el-table-column>
        <el-table-column prop="uploadTime" label="提供时间" width="120px"></el-table-column>
        <el-table-column label="操作" width="120px" fixed="right">
          <template v-slot="scope">
            <el-button
              type="primary"
              v-if="bookData.attachment.indexOf(scope.row.id)>-1"
              size="mini"
              @click="handleDeletePrintClick(scope.row)"
            >已添加</el-button>
            <el-button type="primary" v-else size="mini" @click="handleSeePrintClick(scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="dialogTotal > 0"
        :total="dialogTotal"
        :pageNo.sync="queryLogParams.pageNo"
        :limit.sync="queryLogParams.pageSize"
        @pagination="getSourceList"
      />
    </el-dialog>
  </div>
</template>

<script>
import { fullSearch } from "@/api/support/material";
export default {
  props: {
    bookOpen: {
      type: Boolean
    },
    list: {
      type: Array
    },
    tabIndex: {
      type: [String, Number]
    }
  },
  data() {
    return {
      queryLogParams: {
        pageNo: 1,
        pageSize: 10,
        name: undefined
      },
      dialogTotal: 0,
      dialogLoading: true,
      accounList: [],
      bookData: {
        attachment: [],
        name: []
      }
    };
  },
  created() {
    this.getSourceList();
  },
  methods: {
    handleWorkArry() {
      console.log(this.list);
      console.log(this.list[this.tabIndex].bookData);
      this.bookData = this.list[this.tabIndex].bookData;
    },
    async getSourceList() {
      this.dialogLoading = true;
      const reponse = await fullSearch(this.queryLogParams);
      this.dialogLoading = false;
      this.dialogTotal = reponse.data.count;
      this.accounList = reponse.data.list;
    },
    onDialogQuery() {
      this.queryLogParams.pageNo = 1;
      this.getSourceList();
    },
    onDialogClear() {
      this.queryLogParams.name = undefined;
    },
    handleSeePrintClick(data) {
      const { id, attachmentId, attachmentName } = data;
      this.bookData.attachment.push(id);
      this.bookData.name.push(attachmentName);
    },
    handleDeletePrintClick(data) {
      const index = this.bookData.attachment.indexOf(data.id);
      this.bookData.attachment.splice(index, 1);
      this.bookData.name.splice(index, 1);
      console.log(index);
    },
    handleDialogBookClose() {
      console.log(this.bookData);
      this.$emit("handleBookClose", this.bookData);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>