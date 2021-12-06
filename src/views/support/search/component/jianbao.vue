<template>
  <section>
    <div class="wenti">
      <div class="title">工作简报（{{ total }}条）</div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column
          prop="title"
          label="简报标题"
          min-width="200px"
          class="column-left"
        ></el-table-column>
        <el-table-column
          prop="issueNum"
          label="简报期号"
          width="140px"
        ></el-table-column>
        <el-table-column
          prop="reportDate"
          label="简报日期"
          width="200px"
        ></el-table-column>
        <el-table-column label="简报" width="260px">
          <template slot-scope="scope">
            <a
              v-if="scope.row.attachmentId"
              @click="checkFile(scope.row.attachmentId, scope.column.label)"
              >简报</a
            >
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createByName"
          label="上传人"
          width="140px"
        ></el-table-column>
        <el-table-column
          prop="createDate"
          label="上报日期"
          width="180px"
        ></el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :pageNo.sync="pageNo"
        :limit.sync="pageSize"
        @pagination="CommonNotice"
      />
    </div>
    <el-dialog
      :title="fileTitle"
      :visible.sync="check"
      width="80%"
      :close-on-click-modal="false"
      append-to-body
    >
      <div v-for="(item, index) in fileList" v-bind:key="index">
        <span
          >{{ item.name
          }}<a
            href="#"
            @click="preview(item.id)"
            style="margin-left: 10px; color: #409eff"
            >预览</a
          ><a
            href="#"
            style="margin-left: 10px; color: #409eff"
            @click="downloadFile(item.id)"
            >下载</a
          ></span
        >
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { CommonNotice } from "@/api/support/search";
import { getFileInfo } from "@/api/file";
import { getSingleInfo, filePreview } from "@/utils/styem";

export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      id: "",
      tableData: [],
      check: false,
      fileList: [],
    };
  },

  computed: {},
  created() {
    this.id = this.$route.query.id;
    this.CommonNotice();
  },
  methods: {
    preview(ids) {
      filePreview(ids);
    },
    downloadFile: function (ids) {
      getSingleInfo(ids);
    },
    CommonNotice: function () {
      CommonNotice({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        inspectTeam: this.id,
      }).then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.count;
      });
    },
    checkFile: function (fileIds, title) {
      this.fileTitle = title;
      let fileIdList = [];
      if (fileIds) {
        fileIdList = fileIds.split(",");
      }
      fileIdList.forEach((item) => {
        item && this.getFileInfo(item);
      });
      this.check = true;
    },
    getFileInfo: function (id) {
      this.fileList = [];
      getFileInfo({ ids: id }).then((res) => {
        let obj = {
          path: res.data[0].save_path,
          name: res.data[0].file_name,
          id,
        };
        this.fileList.push(obj);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wenti {
  .title {
    border-left: 3px solid #2196f3;
    padding-left: 10px;
    font-weight: bold;
    margin: 20px 0;
  }
  a {
    color: #2196f3;
  }
}
</style>




