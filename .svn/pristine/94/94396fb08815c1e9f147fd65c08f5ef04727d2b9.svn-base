<template>
  <div class="zl">
    <section>
      <div class="title">资料提供（{{ total }}条）</div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="180"
        ></el-table-column>
        <el-table-column prop="infoListName" label="清单名称" width="180">
        </el-table-column>
        <el-table-column prop="infoName" label="资料名称"> </el-table-column>
        <el-table-column prop="fileNumber" label="文号"> </el-table-column>
        <el-table-column prop="fromUnit" label="提供单位"> </el-table-column>
        <el-table-column prop="updateDate" label="提供地区"> </el-table-column>
        <el-table-column prop="provideTime" label="提供时间"> </el-table-column>
        <el-table-column prop="accessCount" label="调阅次数"> </el-table-column>
        <el-table-column label="电子件"
          ><template slot-scope="scope">
            <a
              v-if="scope.row.attachmentId"
              @click="checkFile(scope.row.attachmentId, scope.column.label)"
              >电子件</a
            >
            <span v-else>-</span>
          </template></el-table-column
        >
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :pageNo.sync="pageNo"
        :limit.sync="pageSize"
        @pagination="getfindTeamInfoListPage"
      />
    </section>

    <el-dialog
      :title="fileTitle"
      :visible.sync="check"
      width="80%"
      :close-on-click-modal="false"
      append-to-body
    >
      <div v-for="(item, index) in fileList" v-bind:key="index">
        <span class="file-item" href="#" @click="downloadFile(item.path)"
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
  </div>
</template>
<script>
import { findTeamInfoListPage } from "@/api/support/search";
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
    this.getfindTeamInfoListPage();
  },
  methods: {
    preview(ids) {
      filePreview(ids);
    },
    downloadFile: function (ids) {
      getSingleInfo(ids);
    },
    getfindTeamInfoListPage: function () {
      findTeamInfoListPage({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        inspectId: this.id,
      }).then((res) => {
        res.data.list.forEach((item) => {
          item.szd = item.city + item.county + item.town + item.address;
        });
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
.zl {
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
.file-item {
  display: inline-block;
  margin-bottom: 10px;
}
/deep/ .el-table .cell {
  white-space: pre-wrap;
}
</style>


