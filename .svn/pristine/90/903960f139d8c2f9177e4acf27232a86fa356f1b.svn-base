<template>
  <div class="information-inner information-change">
    <h1 class="information-title active">督察转段会</h1>
    <div class="tab-list-content">
      <national-info
        :teamId.sync="queryParams.teamId"
        :areaCode.sync="queryParams.inspectAreaCode"
        :areaName.sync="queryParams.inspectAreaName"
        @nameChange="getList"
      ></national-info>
      <div class="box-body" v-show="showSearch">
        <el-form :model="queryParams" label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="会议名称：">
                <el-input v-model="queryParams.meetName" placeholder="请输入会议名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="会议主持人：">
                <el-input v-model="queryParams.host" placeholder="请输入会议主持人"></el-input>
              </el-form-item>
            </el-col>
            <el-form-item class="pull-right">
              <el-button type="primary" @click="onQuery">查询</el-button>
              <el-button type="primary" @click="onClear">清空</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <el-row :gutter="10" class="mb8">
        <div class="button-authority-style" v-if="buttonAuthority">
          <el-button size="small" @click="handleNewly" type="primary">新增</el-button>
        </div>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
      <el-table v-loading="loading" :data="List" border :stripe="true">
        <el-table-column width="50" label="序号">
          <template scope="scope">
            <span>
              {{
              (queryParams.pageNo - 1) * queryParams.pageSize + scope.$index + 1
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="会议名称" :show-overflow-tooltip="true" min-width="200px">
          <template v-slot="scope">
            <span class="accounChunk" @click="handleSee(scope.row)">
              {{
              scope.row.meetName
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="host" label="会议主持人" :show-overflow-tooltip="true" width="120px"></el-table-column>
        <el-table-column prop="meetDate" label="会议时间" width="120px"></el-table-column>
        <el-table-column label="会议地点" :show-overflow-tooltip="true" width="240px">
          <template slot-scope="scope">
            {{ scope.row.meetCityName }}{{ scope.row.meetCountyName
            }}{{ scope.row.meetAddress }}
          </template>
        </el-table-column>
        <el-table-column prop="attendees" label="参会人员" :show-overflow-tooltip="true" width="200px"></el-table-column>
        <el-table-column label="会议纪要" :show-overflow-tooltip="true" width="200px">
          <template slot-scope="scope">
            <span
              class="accounChunk"
              @click="handlePreviewClick(scope.row.attachmentId)"
            >{{scope.row.attachmentName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template slot-scope="scope" v-if="buttonAuthority">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">修改</el-button>
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
      :title="dialogTitle"
      :visible.sync="open"
      :before-close="handleDialogClose"
      width="80%"
      append-to-body
      :close-on-click-modal="false"
    >
      <examineInfo />
      <div class="examineInfo">
        <h1 class="examineInfo-title">会议信息</h1>
      </div>
      <el-form
        ref="dialogForm"
        :model="dialogParams"
        :rules="dialogRules"
        label-width="80px"
        class="dialogForm twoLayoutForm mt22"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="会议名称：" prop="meetName">
              <el-input
                maxlength="120"
                show-word-limit
                class="input-limit"
                v-model="dialogParams.meetName"
                placeholder="请输入会议名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="会议主持人：" prop="host">
              <el-input
                maxlength="60"
                show-word-limit
                class="input-limit"
                v-model="dialogParams.host"
                placeholder="请输入会议主持人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会议时间：" prop="meetDate">
              <el-date-picker
                v-model="dialogParams.meetDate"
                format="yyyy-MM-d"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请输入会议时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="参会人员：" prop="attendees">
              <el-input
                v-model="dialogParams.attendees"
                placeholder="请输入参会人员"
                maxlength="120"
                show-word-limit
                class="input-limit"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="会议地点：" class="meet-address" prop="meetAddress">
              <el-select
                v-model="dialogParams.meetCity"
                filterable
                placeholder="请选择市"
                @change="handleCityChange"
              >
                <el-option
                  v-for="item in areaArry"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select v-model="dialogParams.meetCounty" filterable placeholder="请选择区县">
                <el-option
                  v-for="item in countyArry"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-input
                v-model="dialogParams.meetAddress"
                placeholder="请输入详细地址"
                maxlength="120"
                show-word-limit
                class="input-limit"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="会议纪要:" prop="meetingMinutesFileIds">
              <upload
                ref="uploadFile1"
                accept=".doc, .docx, .pdf"
                :limit="1"
                :fileId="dialogParams.meetingMinutesFileIds"
                fromKey="meetingMinutesFileIds"
                @setUrlPath="setUrlPath"
                @deleteServeFile="deleteServeFile"
              ></upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="汇报稿：" prop="reportDraftFileIds">
              <upload
                ref="uploadFile2"
                accept=".doc, .docx, .pdf"
                :limit="5"
                :fileId="dialogParams.reportDraftFileIds"
                fromKey="reportDraftFileIds"
                @setUrlPath="setUrlPath"
                @deleteServeFile="deleteServeFile"
              ></upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="照片：" prop="photoFileIds">
              <upload
                ref="uploadFile3"
                accept=".jpg, jpeg, .png"
                :limit="5"
                :fileId="dialogParams.photoFileIds"
                fromKey="photoFileIds"
                @setUrlPath="setUrlPath"
                @deleteServeFile="deleteServeFile"
              ></upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他资料：" prop="otherFiles">
              <upload
                ref="uploadFile4"
                accept=".xlsx, .xls, .doc, .docx, .pdf, .txt"
                :limit="5"
                :fileId="dialogParams.otherFiles"
                fromKey="otherFiles"
                @setUrlPath="setUrlPath"
                @deleteServeFile="deleteServeFile"
              ></upload>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dialogFormFooter">
          <el-button type="primary" @click="dailogSubmit">保存</el-button>
          <el-button type="primary" @click="handleDialogClose">关闭</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      title="查看督察转段会"
      :visible.sync="lookOpen"
      width="80%"
      :before-close="handleDialogLookClose"
      append-to-body
    >
      <examineInfo />
      <div class="examineInfo">
        <h1 class="examineInfo-title">会议信息</h1>
      </div>
      <div class="manage-info">
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">会议名称：</span>
            <span class="info-item-content">{{ manageInfo.meetName }}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">会议主持人：</span>
            <span class="info-item-content">{{ manageInfo.host }}</span>
          </div>
          <div class="info-item-quare">
            <span class="info-item-title">会议时间：</span>
            <span class="info-item-content">{{ manageInfo.meetDate }}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">参会人员：</span>
            <span class="info-item-content">{{ manageInfo.attendees }}</span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">会议地点：</span>
            <span class="info-item-content">
              {{
              manageInfo.address
              }}
            </span>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">会议纪要：</span>
            <div class="info-item-content">
              <span
                class="accounChunk"
                @click="handleKnowDownloadClick(item.id,item.save_path,item.file_name,item.object_id)"
                v-for="(item,index) in manageInfo.meetingMinutesFileArray"
                :key="index"
              >{{item.file_name}}</span>
            </div>
          </div>
          <div class="info-item-quare">
            <span class="info-item-title">汇报稿：</span>
            <div class="info-item-content">
              <span
                class="accounChunk"
                @click="handleKnowDownloadClick(item.id,item.save_path,item.file_name,item.object_id)"
                v-for="(item,index) in manageInfo.reportDraftFileArray"
                :key="index"
              >{{item.file_name}}</span>
            </div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-quare">
            <span class="info-item-title">照片：</span>
            <div class="info-item-content">
              <span
                class="accounChunk"
                @click="handleKnowDownloadClick(item.id,item.save_path,item.file_name,item.object_id)"
                v-for="(item,index) in manageInfo.photoFileArray"
                :key="index"
              >{{item.file_name}}</span>
            </div>
          </div>
          <div class="info-item-quare">
            <span class="info-item-title">其他资料：</span>
            <div class="info-item-content">
              <span
                class="accounChunk"
                @click="handleKnowDownloadClick(item.id,item.save_path,item.file_name,item.object_id)"
                v-for="(item,index) in manageInfo.otherFileArray"
                :key="index"
              >{{item.file_name}}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="附件查看"
      :visible.sync="fileOpen"
      width="80%"
      append-to-body
      :before-close="handleFileDialogClose"
    >
      <div>
        <span
          class="accounChunk file-item"
          v-for="item in fileArry"
          :key="item.id"
        >{{ item.file_name }}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  trainList,
  trainSave,
  trainSee,
  trainDelete
} from "@/api/burg/prepare";
import nationalInfo from "@/components/nationalInfo";
import { dictListType } from "@/api/styem/dict/type";
import examineInfo from "@/components/examineInfo";
import { getKnownSingleInfo, filePreview } from "@/utils/styem";
import { getFileInfo } from "@/api/file";
import { mapGetters } from "vuex";
import { areaTreeNew } from "@/api/styem/dept";
export default {
  components: {
    nationalInfo,
    examineInfo
  },
  data() {
    return {
      dialogTitle: "新增督察转段会",
      showSearch: true,
      queryParams: {
        pageNo: 1,
        pageSize: 10,
        type: 6,
        inspectTeamName: undefined,
        clueName: undefined,
        inspectType: undefined,
        inspectTurnId: undefined,
        batchId: undefined,
        teamId: undefined,
        inspectAreaCode: undefined,
        inspectAreaName: undefined
      },
      List: [],
      total: 0,
      loading: true,
      open: false,
      dialogParams: {
        id: undefined,
        type: 6,
        teamId: undefined,
        cityCode: undefined,
        city: undefined,
        batchId: undefined,
        meetName: undefined,
        host: undefined,
        meetDate: undefined,
        meetCity: undefined,
        meetCounty: undefined,
        meetAddress: undefined,
        attendees: undefined,
        reportDraftFileIds: [],
        photoFileIds: [],
        meetingMinutesFileIds: [],
        otherFiles: []
      },
      dialogRules: {
        meetName: [{ required: true, message: "请输入会议名称" }],
        host: [{ required: true, message: "请输入会议主持人" }],
        meetDate: [{ required: true, message: "请输入会议时间" }],
        meetAddress: [{ required: true, message: "请输入会议地点" }],
        attendees: [{ required: true, message: "请输入参会人员" }],
        reportDraftFileIds: [{ required: true, message: "请上传汇报稿" }],
        photoFileIds: [{ required: true, message: "请上传照片" }],
        meetingMinutesFileIds: [{ required: true, message: "请上传会议纪要" }],
        otherFiles: [{ required: true, message: "请上传其他资料" }]
      },
      countyArry: [],
      fileOpen: false,
      fileArry: [],
      buttonAuthority: true,
      lookOpen: false,
      manageInfo: {
        meetName: undefined,
        host: undefined,
        meetDate: undefined,
        attendees: undefined,
        address: undefined,
        meetingMinutesFileArray: [],
        reportDraftFileArray: [],
        photoFileArray: [],
        otherFileArray: []
      }
    };
  },
  created() {
    if (this.inspectInfo.suite) {
      this.buttonAuthority = true;
    } else {
      this.buttonAuthority = false;
      const superviseSubject = JSON.parse(
        sessionStorage.getItem("superviseItem")
      );
      this.queryParams.inspectType = superviseSubject.code;
      this.queryParams.inspectTurnId = superviseSubject.roundId;
      this.queryParams.batchId = superviseSubject.batchId;
    }
    this.getList();
  },
  computed: {
    ...mapGetters(["areaArry", "inspectInfo", "userInfo"])
  },
  methods: {
    async getList() {
      this.loading = true;
      const reponse = await trainList(this.queryParams);
      this.List = reponse.data.list;
      this.total = reponse.data.count;
      this.loading = false;
    },
    onQuery() {
      this.getList();
      this.queryParams.pageNo = 1;
    },
    onClear() {
      this.queryParams.meetName = undefined;
      this.queryParams.host = undefined;
    },
    async handleFileDialog(id, name) {
      this.fileOpen = true;
      const reponse = await trainSee({ id });
      const subjet = reponse.data;
      this.getSingleMessagInfo(subjet[name]);
    },
    async getSingleMessagInfo(fileId) {
      const reponse = await getFileInfo({ ids: fileId });
      if (reponse.data && reponse.data.length) {
        this.fileArry = reponse.data;
      }
    },
    handleFileDialogClose() {
      this.fileOpen = false;
      this.fileArry = [];
    },
    handleNewly() {
      this.open = true;
      this.dialogTitle = "新增督察转段会";
      this.dialogParams.id = undefined;
      this.handleformClear("dialogForm");
    },
    handleDialogClose() {
      this.open = false;
      this.dialogParams.meetCity = undefined;
      this.dialogParams.meetCounty = undefined;
      for (const item in this.$refs) {
        this.$refs[item].handleClear && this.$refs[item].handleClear();
      }
    },
    async handleCityChange(code) {
      this.countyArry = [];
      this.dialogParams.meetCounty = undefined;
      const reponse = await areaTreeNew({ parentId: code });
      this.countyArry = reponse.data;
    },
    async handleCityChangeb(code) {
      this.countyArry = [];
      const reponse = await areaTreeNew({ parentId: code });
      this.countyArry = reponse.data;
    },
    dailogSubmit() {
      this.$refs.dialogForm.validate(async valid => {
        if (valid) {
          this.dialogParams.reportDraftFileIds = this.dialogParams.reportDraftFileIds.join(
            ","
          );
          this.dialogParams.meetingMinutesFileIds = this.dialogParams.meetingMinutesFileIds.join(
            ","
          );
          this.dialogParams.photoFileIds = this.dialogParams.photoFileIds.join(
            ","
          );
          this.dialogParams.otherFiles = this.dialogParams.otherFiles.join(",");
          this.dialogParams.teamId = this.queryParams.teamId;
          this.dialogParams.city = this.queryParams.inspectAreaName;
          this.dialogParams.cityCode = this.queryParams.inspectAreaCode;
          this.dialogParams.batchId = this.inspectInfo.suite.batchId;
          const loading = this.$loading({
            lock: true,
            text: "正在保存提交，请稍等...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.1)"
          });
          const reponse = await trainSave(this.dialogParams);
          loading.close();
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.open = false;
          this.handleDialogClose();
          this.getList();
        }
      });
    },
    handleEdit({ id }) {
      this.open = true;
      this.dialogTitle = "修改督察转段会";
      this.getDialogInfo(id);
    },
    async getDialogInfo(id) {
      const reponse = await trainSee({ id });
      const subject = reponse.data;
      this.dialogParams.id = subject.id;
      this.dialogParams.meetName = subject.meetName;
      this.dialogParams.host = subject.host;
      this.dialogParams.meetDate = subject.meetDate;
      this.dialogParams.meetCity = subject.meetCity;
      this.dialogParams.meetCounty = subject.meetCounty;
      this.dialogParams.meetAddress = subject.meetAddress;
      this.dialogParams.attendees = subject.attendees;
      this.dialogParams.reportDraftFileIds = subject.reportDraftFileIds.split(
        ","
      );
      this.dialogParams.meetingMinutesFileIds = subject.meetingMinutesFileIds.split(
        ","
      );
      this.dialogParams.photoFileIds = subject.photoFileIds.split(",");
      this.dialogParams.otherFiles = subject.otherFiles.split(",");
      this.handleCityChangeb(subject.meetCity);
      this.$nextTick(() => {
        for (const item in this.$refs) {
          this.$refs[item].getFileMessageInfo &&
            this.$refs[item].getFileMessageInfo();
        }
      });
    },
    async handleSee({ id }) {
      this.lookOpen = true;
      const reponse = await trainSee({ id });
      const subject = reponse.data;
      this.manageInfo.meetName = subject.meetName;
      this.manageInfo.host = subject.host;
      this.manageInfo.meetDate = subject.meetDate;
      this.manageInfo.attendees = subject.attendees;
      this.manageInfo.address =
        subject.meetCityName + subject.meetCityName + subject.meetAddress;
      subject.meetingMinutesFileIds &&
        this.getMetSingleMessagInfo(
          subject.meetingMinutesFileIds,
          "meetingMinutesFileArray"
        );
      subject.reportDraftFileIds &&
        this.getMetSingleMessagInfo(
          subject.reportDraftFileIds,
          "reportDraftFileArray"
        );
      subject.photoFileIds &&
        this.getMetSingleMessagInfo(subject.photoFileIds, "photoFileArray");
      subject.otherFiles &&
        this.getMetSingleMessagInfo(subject.otherFiles, "otherFileArray");
    },
    async getMetSingleMessagInfo(fileId, name) {
      const reponse = await getFileInfo({ ids: fileId });
      if (reponse.data && reponse.data.length) {
        this.manageInfo[name] = reponse.data;
      }
    },
    handleDialogLookClose() {
      this.lookOpen = false;
      this.manageInfo.meetingMinutesFileArray = undefined;
      this.manageInfo.reportDraftFileArray = undefined;
      this.manageInfo.photoFileArray = undefined;
      this.manageInfo.otherFileArray = undefined;
    },
    handleDelete(data) {
      this.$confirm("是否要删除", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }).then(async () => {
        const { id } = data;
        const reponse = await trainDelete({ id });
        this.getList();
      });
    },
    handleformClear(formName) {
      this.$nextTick(() => {
        this.resetFieldsTap(formName);
      });
    },
    setUrlPath(file) {
      this.dialogParams[file.fromKey].push(file.fileId);
    },
    deleteServeFile(file) {
      const fromKeyVal = this.dialogParams[file.fromKey];
      const fileId = file.fileId;
      const fromKey = file.fromKey;
      const index = fromKeyVal.indexOf(fileId);
      this.dialogParams[file.fromKey].splice(index, 1);
    },
    handleKnowDownloadClick(fileId, fileUrl, fileName, state) {
      const teamId = this.queryParams.teamId;
      getKnownSingleInfo(fileId, fileUrl, fileName, state, teamId);
    },
    handlePreviewClick(fileId) {
      const teamId = this.queryParams.teamId;
      filePreview(fileId, teamId);
    }
  }
};
</script>
<style lang="scss" scoped>
.twoLayoutForm {
  .meet-address {
    .el-form-item__content {
      .el-select {
        width: 19%;
      }
      .el-input {
        width: 62%;
      }
    }
  }
}
.file-item {
  display: block;
  margin-top: 10px;
}
</style>