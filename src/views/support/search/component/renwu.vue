<template>
  <section>
    <div class="wenti">
      <div class="title">整改任务（{{ tableData.length }}条）</div>
      <el-table :data="tableData" border>
        <el-table-column
          type="index"
          label="序号"
          width="80px"
        ></el-table-column>

        <el-table-column prop="title" label="督察类型">
          <template v-slot="scope">
            <span>{{ scope.row.inspectTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="督察轮次、批次">
          <template v-slot="scope">
            <span>{{ scope.row.roundName }}、{{ scope.row.batchName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="地区">
          <template v-slot="scope">
            <span>{{ scope.row.writeCity }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="方案名称">
          <template v-slot="scope">
            <span>{{ scope.row.planName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="整改任务内容">
          <template v-slot="scope">
            <span>{{ scope.row.rectifyContent }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reportDate" label="整改目标"
          ><template v-slot="scope">
            <span>{{ scope.row.rectifyTarget }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reportDate" label="完成情况"
          ><template v-slot="scope">
            <span>{{ scope.row.finishSituationName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reportDate" label="完成时限"
          ><template v-slot="scope">
            <span>{{ scope.row.deadline }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reportDate" label="是否重点"
          ><template v-slot="scope">
            <span>{{ scope.row.isKeyTaskName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reportDate" label="大概位置"
          ><template v-slot="scope">
            <span
              >{{ scope.row.taskCityName }}{{ scope.row.taskCountyName
              }}{{ scope.row.taskAddress }}</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="fileTitle"
      :visible.sync="check"
      width="80%"
      :close-on-click-modal="false"
      append-to-body
    >
      <div v-for="(item, index) in fileList" v-bind:key="index">
        <a href="#" @click="downloadFile(item.path)">{{ item.name }}</a>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { getRectifyTaskByTeamId } from "@/api/support/search";
import { getFileInfo } from "@/api/file";
import { getdownLoadZip, getSingleInfo } from "@/utils/styem";

export default {
  data() {
    return {
      id: "",
      tableData: [],
      check: false,
      fileList: [],
    };
  },

  computed: {},
  created() {
    this.id = this.$route.query.id;
    this.getRectifyTaskByTeamId();
  },
  methods: {
    getRectifyTaskByTeamId: function () {
      getRectifyTaskByTeamId({
        id: this.id,
      }).then((res) => {

        this.tableData = res.data;
      });
    },
    checkFile: function (fileIds, title) {
      this.fileTitle = title;
      let fileIdList = [];
      if (fileIds) {
        fileIdList = fileIds.split(",");
      }
      fileIdList.forEach((item) => {
        this.getFileInfo(item);
      });
      this.check = true;
    },
    getFileInfo: function (id) {
      this.fileList = [];
      getFileInfo({ ids: id }).then((res) => {
        let obj = {
          path: res.data[0].save_path,
          name: res.data[0].file_name,
        };
        this.fileList.push(obj);
      });
    },
    downloadFile: function (path) {
      getdownLoadZip(path);
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
  /deep/ .el-table .cell {
    white-space: pre-wrap;
  }
}
</style>




