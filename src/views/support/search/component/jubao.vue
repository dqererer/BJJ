<template>
  <div class="jubao">
    <div class="title">
      <el-link :type="jb" :underline="false" @click="getTable('jb')"
        >信访举报（{{ jubaoNum }}条）</el-link
      >
      <div style="margin-right: 20px; margin-left: 10px">/</div>
      <el-link :type="wz" :underline="false" @click="getTable('wz')"
        >信访问责（{{ askNum }}条）</el-link
      >
    </div>
    <el-table
      :data="jubaoList"
      border
      style="width: 100%"
      v-if="jb == 'primary'"
    >
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="tipOffContent" label="举报主要内容" width="400px">
      </el-table-column>
      <el-table-column prop="countyName" label="旗县"> </el-table-column>
      <el-table-column prop="address" label="举报地址"> </el-table-column>
      <el-table-column prop="pollutionType" label="污染类型"> </el-table-column>
      <el-table-column prop="tipTypeName" label="举报类型"> </el-table-column>
      <el-table-column prop="tipNumber" label="举报编号"> </el-table-column>
      <el-table-column prop="tipTime" label="举报时间"> </el-table-column>
      <el-table-column prop="acceptNum" label="受理编号"> </el-table-column>
      <el-table-column prop="acceptDate" label="受理时间"> </el-table-column>
      <el-table-column prop="handleDeadline" label="办理时限">
      </el-table-column>
      <el-table-column prop="toUnit" label="责任单位"> </el-table-column>
      <el-table-column prop="transfetNumber" label="转办编号">
      </el-table-column>
      <el-table-column prop="transferTime" label="转办时间"> </el-table-column>
      <el-table-column prop="handleStateName" label="转办状态">
      </el-table-column>
      <el-table-column prop="handleTime" label="办理时间"> </el-table-column>
      <el-table-column prop="accountNum" label="问责信息"> </el-table-column>
      <el-table-column prop="finishFlagName" label="办结状态">
      </el-table-column>
    </el-table>
    <el-table :data="askList" border style="width: 100%" v-if="wz == 'primary'">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="cityName" label="督察地市"> </el-table-column>
      <el-table-column prop="acceptNum" label="受理编号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="unit" label="单位"> </el-table-column>
      <el-table-column prop="levelName" label="级别"> </el-table-column>
      <el-table-column prop="accountTime" label="责任追究时间">
      </el-table-column>
      <el-table-column prop="accountWayName" label="处理方式">
      </el-table-column>
      <el-table-column prop="staffTypeName" label="人员分类"> </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :pageNo.sync="pageNo"
      :limit.sync="pageSize"
      @pagination="getTable"
    />
  </div>
</template>
<script>
import { getRegisterList, getAskList } from "@/api/support/search";

export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      id: "",
      jubaoList: [],
      askList: [],
      jb: "primary",
      wz: "info",
      jubaoNum: 0,
      askNum: 0,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getRegisterList();
    this.getAskList();
  },
  methods: {
    getTable: function (type) {
      if (type == "jb") {
        this.jb = "primary";
        this.wz = "info";
        this.getRegisterList();
      } else if (type == "wz") {
        this.jb = "info";
        this.wz = "primary";
        this.getAskList();
      } else {
        if (this.jb == "primary") {
          this.getRegisterList();
        } else if (this.wz == "primary") {
          this.getAskList();
        }
      }
    },
    getAskList: function () {
      getAskList({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        teamId: this.id,
        type: 1,
      }).then((res) => {
        this.askList = res.data.list;
        this.askNum = res.data.count;
        if (this.wz == "primary") {
          this.total = res.data.count;
        }
      });
    },
    getRegisterList: function () {
      getRegisterList({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        teamId: this.id,
      }).then((res) => {
        this.jubaoList = res.data.list;
        this.jubaoNum = res.data.count;
        if (this.jb == "primary") {
          this.total = res.data.count;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.jubao {
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
  }
}
</style>


