<template>
  <div class="ducha">
    <div class="title">
      <el-link :type="dc" :underline="false" @click="getTable('dc')"
        >下沉督察（{{ dcNum }}条）</el-link
      >
      <div style="margin-right: 20px; margin-left: 10px">/</div>
      <el-link :type="hb" :underline="false" @click="getTable('hb')"
        >听取汇报（{{ hbNum }}条）</el-link
      >
    </div>
    <el-table :data="dcList" border style="width: 100%" v-if="dc == 'primary'" :key="timeStamp">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column label="下沉名称" prop="teamName"> </el-table-column>
      <el-table-column prop="sinkDate" label="日志时间"></el-table-column>
      <el-table-column prop="sinkPerson" label="下沉人员"></el-table-column>
      <el-table-column prop="xcCountyName" label="下沉旗县"></el-table-column>
    </el-table>
    <el-table :data="hbList" border style="width: 100%" v-if="hb == 'primary'">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="meetName" label="会议名称"></el-table-column>
      <el-table-column prop="host" label="会议主持人"></el-table-column>
      <el-table-column prop="meetDate" label="会议时间"></el-table-column>
      <el-table-column prop="meetAddress" label="会议地点">
        <template slot-scope="scope">
          {{ scope.row.meetCityName }}{{ scope.row.meetCountyName
          }}{{ scope.row.meetAddress }}
        </template>
      </el-table-column>
      <el-table-column prop="attendees" label="参会人员"></el-table-column>
      <el-table-column label="会议纪要">
        <template slot-scope="scope">
          <a
            v-if="scope.row.attachmentId"
            @click="checkFile(scope.row.attachmentId, scope.column.label)"
            >谈话记录</a
          >
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :pageNo.sync="pageNo"
      :limit.sync="pageSize"
      @pagination="getTable"
    />
    <el-dialog
      :title="fileTitle"
      :visible.sync="check"
      width="80%"
      :close-on-click-modal="false"
      append-to-bodc
    >
      <div v-for="(item, index) in fileList" v-bind:key="index">
        <a href="#" @click="downloadFile(item.path)">{{ item.name }}</a>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { tInspectSink, tInspectMeet } from "@/api/support/search";
import { getFileInfo } from "@/api/file";
import { getdownLoadZip, getSingleInfo } from "@/utils/styem";

export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      id: "",
      dcList: [],
      hbList: [],
      dc: "primary",
      hb: "info",
      dcNum: 0,
      hbNum: 0,
      check: false,
      fileList: [],
      timeStamp:'',
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.tInspectSink(); //下沉记录
    this.tInspectMeet('8');
  },
  methods: {
    getTable: function (type) {
      if (type == "dc") {
        this.dc = "primary";
        this.hb = "info";
        this.tInspectSink();
      } else if (type == "hb"){
        this.dc = "info";
        this.hb = "primary";
        this.tInspectMeet('8');
      }else{
        if(this.dc == 'primary'){
          this.tInspectSink();
        }else{
          this.tInspectMeet('8');
        }
      }
    },
    tInspectMeet: function (type) {
      tInspectMeet({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        inspectId: this.id,
        type,
      }).then((res) => {
        this.hbList = res.data.list;
        this.timeStamp = new Date()
        this.hbNum = res.data.count;
        if (this.hb == "primary") {
          this.total = res.data.count;
        }
      });
    },
    //下沉督察
    tInspectSink: function () {
      tInspectSink({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        inspectId: this.id,
      }).then((res) => {
        this.dcList = [];
        this.dcList = res.data.list;
        this.dcNum = res.data.count;
        if (this.dc == "primary") {
          this.total = res.data.count;
        }
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
.ducha {
  .title {
    border-left: 3px solid #2196f3;
    padding-left: 10px;
    font-weight: bold;
    margin: 20px 0;
    display: flex;
    align-items: center;
  }

  /deep/ .el-table .cell {
    white-space: pre-wrap;
    a {
      color: #2196f3;
    }
  }
}
</style>


