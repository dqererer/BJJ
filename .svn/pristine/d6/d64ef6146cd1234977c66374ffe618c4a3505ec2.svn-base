<template>
  <div class="information-inner information-change">
    <h1 class="information-title active">待转案件</h1>
    <div class="tab-list-content">
      <national-info :teamId.sync="queryParams.teamId" @nameChange="getList"></national-info>
      <div class="box-body" v-show="showSearch">
        <el-form :model="queryParams" label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="督察地市：">
                <el-select v-model="queryParams.city" filterable placeholder="请选择督察地市">
                  <el-option
                    v-for="item in areaArry"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="污染类型：">
                <el-select v-model="queryParams.pollutionLevelOne" placeholder="请选择污染类型">
                  <el-option
                    v-for="item in pollutantArry"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="举报类型：">
                <el-select v-model="queryParams.tipType" placeholder="请选择举报类型">
                  <el-option
                    v-for="item in tipArry"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="举报编号：">
                <el-input placeholder="请输入举报编号" v-model="queryParams.tipNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="举报时间：">
                <el-date-picker
                  v-model="queryParams.tipTime"
                  format="yyyy-MM-d"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择举报时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="受理编号：">
                <el-input placeholder="请输入受理编号" v-model="queryParams.acceptNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="受理时间：">
                <el-date-picker
                  v-model="queryParams.acceptDate"
                  format="yyyy-MM-d"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择受理时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="举报内容：">
                <el-input placeholder="请输入举报内容" v-model="queryParams.tipOffContent"></el-input>
              </el-form-item>
            </el-col>
            <el-form-item class="pull-right marginLeft0">
              <el-button type="primary" @click="onQuery">查询</el-button>
              <el-button type="primary" @click="onClear">清空</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <el-row :gutter="10" class="mb8">
        <div class="button-authority-style" v-if="buttonAuthority">
          <el-button size="small" @click="handleTurnClick" type="primary">转办</el-button>
          <el-button size="small" @click="handleImport" type="primary">导入央督清单</el-button>
          <el-button size="small" @click="handleLogClick" type="primary">导入日志</el-button>
        </div>

        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="List"
        border
        :stripe="true"
        @selection-change="handleSelectionChange"
        @select-all="selectAll"
      >
        <el-table-column type="selection" :selectable="checkSelectable" width="50"></el-table-column>
        <el-table-column type="index" label="序号" width="50">
          <template scope="scope">
            <span>
              {{
              (queryParams.pageNo - 1) * queryParams.pageSize + scope.$index + 1
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tipOffContent"
          :show-overflow-tooltip="true"
          label="举报主要内容"
          min-width="200px"
        ></el-table-column>
        <el-table-column prop="cityName" label="督察地市" width="120px"></el-table-column>
        <el-table-column prop="countyName" label="督察区县" width="180px"></el-table-column>
        <el-table-column prop="address" label="举报地址" width="240px"></el-table-column>
        <el-table-column prop="tipNumber" label="举报编号" width="160px"></el-table-column>
        <el-table-column prop="tipTime" label="举报时间" width="160px"></el-table-column>
        <el-table-column prop="acceptNum" label="受理编号" width="160px"></el-table-column>
        <el-table-column prop="acceptDate" label="受理时间" width="100px"></el-table-column>
        <el-table-column prop="pollutionType" label="污染类型" width="120px"></el-table-column>
        <el-table-column prop="tipTypeName" label="举报类型" width="120px"></el-table-column>
        <el-table-column label="重点关注" prop="importantFlagName" width="100px"></el-table-column>
        <!-- <el-table-column label="重复状态" prop="repeatFlagName" width="120px"></el-table-column>
        <el-table-column label="重复受理编号" prop="repeatAcceptNums" width="120px"></el-table-column>-->
        <el-table-column label="操作" width="80" fixed="right">
          <template slot-scope="scope" v-if="buttonAuthority">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :pageNo.sync="queryParams.pageNo"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>
    <el-dialog
      title="转办"
      :visible.sync="open"
      width="80%"
      :before-close="handleDialogClose"
      append-to-body
    >
      <div ref="print">
        <div class="turn-dialog-top">
          <h1 class="turn-dialog-title">{{ userInfo.provinceName }}环境保护督察组转办单</h1>
        </div>

        <div class="turn-dialog-box">
          <span class="turn-dialog-name">{{ examInfo.name }}</span>
          <span class="turn-dialog-number">环督【{{ shortenedName }}】转【自动生成】号</span>
        </div>
        <el-form
          ref="dialogForm"
          :model="dialogParams"
          :rules="dialogRules"
          label-width="80px"
          class="dialogForm"
        >
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="转往地市：">
                <!-- <el-input
                  readonly
                  class="dialog-city"
                  v-model="dialogParams.cityName"
                ></el-input>-->
                <p class="hit-message">
                  {{dialogParams.cityName}}协调联络组
                  <b class="hit-infuse"></b>
                </p>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="转办内容：">
                <span>
                  来电举报材料
                  <el-input class="dialog-materials" readonly v-model="dialogParams.phoneNum"></el-input>件,来信举报材料
                  <el-input class="dialog-materials" readonly v-model="dialogParams.letterNum"></el-input>件,请按规定处理。总体办理情况及标“*”问题查处情况请于10日内反馈督察组。
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="经办人：">{{ userInfo.name }}</el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="接收人：" prop="acceptPerson">
                <el-input
                  class="width220"
                  v-model.trim="dialogParams.acceptPerson"
                  placeholder="请输入接收人"
                  maxlength="10"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="转办日期：" prop="transferTime">
                <el-date-picker
                  class="width220"
                  v-model="dialogParams.transferTime"
                  format="yyyy-MM-d"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择转办日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="截止日期：" prop="handleDeadline">
                <el-date-picker
                  class="width220"
                  v-model="dialogParams.handleDeadline"
                  format="yyyy-MM-d"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择截止日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="dialogFormFooter">
            <el-button type="primary" @click="dailogSubmit">保存</el-button>
            <el-button type="primary" @click="handleDialogClose">关闭</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      title="央督清单导入"
      :visible.sync="importOpen"
      :before-close="handleImportDialogClose"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?inspectType=' + queryParams.inspectType+'&teamId=' + queryParams.teamId"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <!-- <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据 -->
          <!-- <el-link
            type="info"
            style="font-size:12px;color:#red;font-weight:bold;"
            @click="importTemplate"
            >下载转办清单导入说明</el-link
          >-->
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="handleImportDialogClose">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="日志记录"
      :visible.sync="logOpen"
      width="80%"
      :before-close="handleLogDialogClose"
      append-to-body
      class="information-inner"
    >
      <div class="box-body">
        <el-form :model="queryLogParams" label-width="100px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="导入时间：">
                <el-date-picker
                  v-model="issueDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="issueDateChange"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="操作用户：">
                <el-input v-model="queryLogParams.importUsername" placeholder="请输入操作用户"></el-input>
              </el-form-item>
            </el-col>
            <el-form-item class="pull-right marginLeft0">
              <el-button type="primary" @click="onLogQuery">查询</el-button>
              <el-button type="primary" @click="onLogClear">清空</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <el-table :data="logList" v-loading="logLoading" style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
          <template scope="scope">
            <span>
              {{
              (queryLogParams.pageNo - 1) * queryLogParams.pageSize +
              scope.$index +
              1
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="importUsername" label="操作用户" min-width="120px"></el-table-column>
        <el-table-column prop="inportTime" label="导入时间" width="180px"></el-table-column>
        <el-table-column prop="executionTime" label="执行时间" width="120px"></el-table-column>
        <el-table-column prop="totalNum" label="总条数" width="120px"></el-table-column>
        <el-table-column prop="successNum" label="成功条数" width="120px"></el-table-column>
        <el-table-column prop="failNum" label="失败条数" width="120px"></el-table-column>
        <el-table-column prop="repeatNum" label="重复条数" width="120px"></el-table-column>
      </el-table>
      <pagination
        v-show="logTotal > 0"
        :total="logTotal"
        :pageNo.sync="queryLogParams.pageNo"
        :limit.sync="queryLogParams.pageSize"
        @pagination="getSourceList"
      />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import nationalInfo from "@/components/nationalInfo";
import {
  turnList,
  turnSave,
  turnDelete,
  turnLogList
} from "@/api/national/casemanage";
import { dictListType, dictName } from "@/api/styem/dict/type";
import { getToken } from "@/utils/auth";
import { downLoadZip } from "@/utils/zipdownload";
export default {
  components: {
    nationalInfo
  },
  data() {
    return {
      showSearch: true,
      pollutantArry: [],
      tipArry: [],
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        city: undefined,
        pollutionLevelOne: undefined,
        tipType: undefined,
        tipNumber: undefined,
        tipTime: undefined,
        acceptNum: undefined,
        acceptDate: undefined,
        tipOffContent: undefined,
        inspectType: undefined,
        inspectTurnId: undefined,
        inspectBatchId: undefined,
        teamId: undefined
      },
      List: [],
      total: 0,
      loading: true,
      open: false,
      dialogParams: {
        tipIds: undefined,
        cityName: undefined,
        city: undefined,
        toUnit: undefined,
        phoneNum: 0,
        letterNum: 0,
        dealPerson: undefined,
        acceptPerson: undefined,
        transferTime: undefined,
        handleDeadline: undefined,
        uploadFlag: 0,
        dataType: undefined,
        superviseGroupId: undefined
      },
      dialogRules: {
        acceptPerson: [{ required: true, message: "请输入接收人" }],
        transferTime: [{ required: true, message: "请选择转办日期" }],
        handleDeadline: [{ required: true, message: "请选择截止日期" }]
      },
      logOpen: false,
      logList: [],
      logLoading: true,
      logTotal: 0,
      issueDate: undefined,
      queryLogParams: {
        pageNo: 1,
        pageSize: 10,
        importTimeStart: undefined,
        importTimeEnd: undefined,
        importUsername: undefined,
        inspectType: undefined
      },
      multipleSelection: [],
      shortenedName: undefined,
      showBtn: true,
      importOpen: false,
      upload: {
        isUploading: false,
        updateSupport: 0,
        headers: { Authorization: getToken() },
        url: process.env.VUE_APP_BASE_API + "/center/ttip/tInspectTip/importTip"
      },
      importDownUrl: "/template/转办清单导入说明.docx",
      buttonAuthority: true
    };
  },
  created() {
    if (this.inspectInfo.suite) {
      this.buttonAuthority = true;
      this.queryParams.inspectType = this.inspectInfo.suite.superviseType;
      this.queryLogParams.inspectType = this.inspectInfo.suite.superviseType;
    } else {
      this.buttonAuthority = false;
      const superviseSubject = JSON.parse(
        sessionStorage.getItem("superviseItem")
      );
      this.queryParams.inspectType = superviseSubject.code;
      this.queryParams.inspectTurnId = superviseSubject.roundId;
      this.queryParams.inspectBatchId = superviseSubject.batchId;
      this.queryLogParams.inspectType = superviseSubject.code;
    }

    this.getDictPollutant();
    this.getDictTip();
  },
  computed: {
    ...mapGetters(["inspectInfo", "examInfo", "userInfo", "areaArry"])
  },
  methods: {
    async getList() {
      this.loading = true;
      const reponse = await turnList(this.queryParams);
      reponse.data.list &&
        reponse.data.list.map(item => {
          return (item.checked = true);
        });
      this.List = reponse.data.list;
      this.total = reponse.data.count;
      this.loading = false;
    },
    async getDictPollutant() {
      const reponse = await dictListType({ type: "clue_pollution_type" });
      this.pollutantArry = reponse.data;
    },
    async getDictTip() {
      const reponse = await dictListType({ type: "tip_type" });
      this.tipArry = reponse.data;
    },
    onQuery() {
      this.getList();
      this.queryParams.pageNo = 1;
    },
    onClear() {
      this.queryParams.city = undefined;
      this.queryParams.pollutionLevelOne = undefined;
      this.queryParams.tipType = undefined;
      this.queryParams.tipNumber = undefined;
      this.queryParams.tipTime = undefined;
      this.queryParams.acceptNum = undefined;
      this.queryParams.acceptDate = undefined;
      this.queryParams.tipOffContent = undefined;
    },
    handleSelectionChange(data) {
      this.multipleSelection = data;
      if (data.length) {
        const { cityName, city } = data[0];
        this.dialogParams.city = city;
        this.dialogParams.cityName = cityName;
        this.dialogParams.toUnit = cityName + "协调联络组";
        this.List.map(item => {
          if (item.cityName !== cityName) {
            item.checked = false;
          }
          return item;
        });
      } else {
        this.List.map(item => {
          item.checked = true;
          return item;
        });
      }
    },
    checkSelectable(row) {
      if (row.checked == true) {
        return true;
      }
    },
    selectAll() {
      if (this.queryParams.city == undefined) {
        this.$refs.multipleTable.clearSelection();
      }
    },
    async handleTurnClick() {
      const data = this.multipleSelection;
      let phoneNum = 0;
      let letterNum = 0;
      if (data.length) {
        this.handleformClear();
        this.open = true;
        const reponse = await dictName({
          type: "province_brife",
          value: this.dialogParams.city
        });
        this.shortenedName = reponse.data.label;
        let tipIds = [];
        data.forEach(item => {
          tipIds.push(item.id);
          if (item.tipTypeName === "来电") {
            phoneNum++;
          } else {
            letterNum++;
          }
        });
        this.dialogParams.phoneNum = phoneNum;
        this.dialogParams.letterNum = letterNum;
        this.dialogParams.number = Number(letterNum) + Number(phoneNum);
        this.dialogParams.tipIds = tipIds;
        this.dialogParams.dealPerson = this.userInfo.name;
        this.dialogParams.dataType = this.queryParams.inspectType;
      } else {
        this.$message.error("请选择数据！");
      }
    },
    handleDialogClose() {
      this.open = false;
    },
    dailogSubmit() {
      this.$refs.dialogForm.validate(async valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在保存提交，请稍等...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.1)"
          });
          this.dialogParams.superviseGroupId = this.queryParams.teamId;
          const reponse = await turnSave(this.dialogParams);
          this.$message({
            message: "保存成功",
            type: "success"
          });
          loading.close();
          this.open = false;
          this.getList();
        }
      });
    },
    handleLogClick() {
      this.logOpen = true;
      this.getSourceList();
    },
    async getSourceList() {
      this.logLoading = true;
      const reponse = await turnLogList(this.queryLogParams);
      this.logList = reponse.data.list;
      this.logTotal = reponse.data.count;
      this.logLoading = false;
    },
    handleLogDialogClose() {
      this.logOpen = false;
    },
    onLogQuery() {
      this.getSourceList();
      this.queryLogParams.pageNo = 1;
    },
    onLogClear() {
      this.queryLogParams.importTimeStart = undefined;
      this.queryLogParams.importTimeEnd = undefined;
      this.queryLogParams.importUsername = undefined;
      this.issueDate = undefined;
    },
    handleDelete(data) {
      this.$confirm("是否要删除", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }).then(async () => {
        const { id } = data;
        const reponse = await turnDelete({ id });
        this.getList();
      });
    },
    issueDateChange(picker) {
      if (picker == null) {
        this.queryLogParams.importTimeStart = undefined;
        this.queryLogParams.importTimeEnd = undefined;
      } else {
        this.queryLogParams.importTimeStart = picker[0];
        this.queryLogParams.importTimeEnd = picker[1];
      }
    },
    handleformClear() {
      this.resetFieldsTap("dialogForm");
    },
    handleImport() {
      this.importOpen = true;
    },
    handleImportDialogClose() {
      this.importOpen = false;
    },
    importTemplate() {
      downLoadZip("/center/file/downloadFile", {
        savePath: this.importDownUrl
      });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$message.success(response.msg);
      this.handleImportDialogClose();
      this.importOpen = false;
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
      this.$nextTick(() => {
        this.getList();
      });
    }
  },
  activated() {
    this.getList();
  }
};
</script>
<style lang="scss" scoped>
.turn-dialog-top {
  position: relative;
  .turn-dialog-title {
    text-align: center;
    margin: 0;
    font-weight: normal;
    margin-bottom: 10px;
  }
  .dialog-top-btn {
    position: absolute;
    right: 0;
    top: 0;
  }
}

.turn-dialog-box {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #000;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.dialogForm {
  .el-form-item {
    /deep/.el-form-item__label {
      width: 16% !important;
    }
    /deep/.el-form-item__content {
      width: 60% !important;
      display: flex;
      .dialog-city {
        width: 100px;
      }
      .hit-message {
        margin: 0;
        line-height: 34px;
        margin-left: 6px;
        .hit-infuse {
          color: red;
          font-weight: normal;
          display: inline-block;
          margin-left: 10px;
        }
      }
      .dialog-materials {
        width: 100px;
        .el-input__inner {
          border: none;
          border-bottom: 1px solid #dcdfe6;
          text-align: center;
        }
      }
    }
  }
}
</style>