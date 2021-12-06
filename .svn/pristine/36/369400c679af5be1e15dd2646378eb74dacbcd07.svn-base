<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="mediaOpen"
      :before-close="handleDialogClose"
      width="80%"
      append-to-body
      :close-on-click-modal="false"
    >
      <examineInfo />
      <div class="examineInfo">
        <h1 class="examineInfo-title">影像资料</h1>
      </div>
      <el-form
        ref="dialogForm"
        :model="dialogParams"
        :rules="dialogRules"
        label-width="80px"
        class="dialogForm twoLayoutForm"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="影像资料说明：" prop="mediaExplain">
              <el-input
                v-model="dialogParams.mediaExplain"
                placeholder="请输入影像资料说明"
                maxlength="120"
                show-word-limit
                class="input-limit"
                :disabled="curStatus == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="照片：" prop="photoFileIds">
              <upload
                ref="uploadFile1"
                accept=".jpg, jpeg, .png"
                :limit="5"
                :fileId="dialogParams.photoFileIds"
                fromKey="photoFileIds"
                @setUrlPath="setUrlPath"
                @deleteServeFile="deleteServeFile"
                :uneditable="curStatus == 'view'"
              ></upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="视频：" prop="mideaFileIds">
              <upload
                ref="uploadFile2"
                accept=".mov, .rmvb, .rm, .mp4, .3gp"
                :limit="5"
                :fileId="dialogParams.mideaFileIds"
                fromKey="mideaFileIds"
                @setUrlPath="setUrlPath"
                @deleteServeFile="deleteServeFile"
                :uneditable="curStatus == 'view'"
              ></upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="录音：" prop="soundFileIds">
              <upload
                ref="uploadFile3"
                accept=".mp3, .mpeg, .wma"
                :limit="5"
                :fileId="dialogParams.soundFileIds"
                fromKey="soundFileIds"
                @setUrlPath="setUrlPath"
                @deleteServeFile="deleteServeFile"
                :uneditable="curStatus == 'view'"
              ></upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子件：" prop="electFileIds">
              <upload
                accept=".doc, .docx, .pdf"
                ref="uploadFile4"
                :limit="1"
                :fileId="dialogParams.electFileIds"
                fromKey="electFileIds"
                @setUrlPath="setUrlPath"
                @deleteServeFile="deleteServeFile"
                :uneditable="curStatus == 'view'"
              ></upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="时间：" prop="mediaDate">
              <el-date-picker
                v-model="dialogParams.mediaDate"
                format="yyyy-MM-d"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间"
                :disabled="curStatus == 'view'"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="影像提供人：" prop="mediaPerson">
              <el-input
                v-model="dialogParams.mediaPerson"
                placeholder="请输入影像提供人"
                maxlength="60"
                show-word-limit
                class="input-limit"
                :disabled="curStatus == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="地点：" class="meet-address" prop="address">
              <el-select
                v-model="dialogParams.cityCode"
                filterable
                placeholder="请选择市"
                @change="handleCityChange"
                :disabled="curStatus == 'view'"
              >
                <el-option
                  v-for="item in areaArry"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select v-model="dialogParams.countyCode" :disabled="curStatus == 'view'" filterable placeholder="请选择区县">
                <el-option
                  v-for="item in countyArry"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-input
                v-model="dialogParams.address"
                placeholder="请输入详细地址"
                maxlength="120"
                show-word-limit
                class="input-limit"
                :disabled="curStatus == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="当事人/见证人：" prop="witness">
              <el-input
                v-model="dialogParams.witness"
                placeholder="请输入当事人/见证人"
                maxlength="60"
                show-word-limit
                class="input-limit"
                :disabled="curStatus == 'view'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dialogFormFooter" v-if="curStatus != 'view'">
          <el-button type="primary" @click="dailogSubmit">保存</el-button>
          <el-button type="primary" @click="handleDialogClose">关闭</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import examineInfo from "@/components/examineInfo";
import { issueMediaSave, issueMediaInfo } from "@/api/burg/garrison";
import { mapGetters } from "vuex";
import { areaTreeNew } from "@/api/styem/dept";
export default {
  props: {
    mediaOpen: {
      type: Boolean
    },
    mediaInfoId: {
      type: String
    },
    mediaInfoIndex: {
      type: [String,Number]
    },
    mediaArry: {
      type: Array
    },
    list:{
      type:Array
    },
    tabIndex:{
      type:[String,Number]
    },
    curStatus: {
      type: String
    }
  },
  components: {
    examineInfo
  },
  data() {
    return {
      dialogTitle: "添加现场多媒体证据",
      dialogParams: {
        id: undefined,
        mediaExplain: undefined,
        photoFileIds: [],
        mideaFileIds: [],
        soundFileIds: [],
        cityCode: undefined,
        countyCode: undefined,
        address: undefined,
        mediaDate: undefined,
        mediaPerson: undefined,
        witness: undefined,
        electFileIds: []
      },
      dialogRules: {
        mediaExplain: [{ required: true, message: "请输入影像资料说明" }],
        photoFileIds: [{ required: true, message: "请上传照片" }],
        mideaFileIds: [{ required: true, message: "请上传视频" }],
        soundFileIds: [{ required: true, message: "请上传录音" }],
        address: [{ required: true, message: "请输入详细地址" }],
        mediaDate: [{ required: true, message: "请选择时间" }],
        mediaPerson: [{ required: true, message: "请输入影像提供人" }],
        witness: [{ required: true, message: "请输入当事人/见证人" }],
        electFileIds: [{ required: true, message: "请上传电子件" }]
      },
      sinkAllArry: [],
      countyArry: [],
      mediaArryOther: [],
      stateText: undefined
    };
  },
  computed: {
    ...mapGetters(["areaArry", "inspectInfo"])
  },
  methods: {
    handleInspectArry() {
      this.dialogTitle = "添加现场多媒体证据";
      this.dialogParams.id = undefined;
      this.handleformClear("dialogForm");
      // this.mediaArryOther = this.mediaArry;
      console.log(this.list);
      console.log(this.tabIndex);
      this.mediaArryOther = this.list[this.tabIndex].mediaArry;
    },
    async handleCityChange(code) {
      this.countyArry = [];
      this.dialogParams.countyCode = undefined;
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
          const loading = this.$loading({
            lock: true,
            text: "正在保存提交，请稍等...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.1)"
          });
          this.dialogParams.photoFileIds = this.dialogParams.photoFileIds.join(
            ","
          );
          this.dialogParams.mideaFileIds = this.dialogParams.mideaFileIds.join(
            ","
          );
          this.dialogParams.soundFileIds = this.dialogParams.soundFileIds.join(
            ","
          );
          this.dialogParams.electFileIds = this.dialogParams.electFileIds.join(
            ","
          );
          const reponse = await issueMediaSave(this.dialogParams);
          const subject = reponse.data;
          if (this.stateText === "修改") {
            this.mediaArryOther.splice(this.mediaInfoIndex, 1);
          }
          this.mediaArryOther.push({
            id: subject.id,
            mediaExplain: subject.mediaExplain + "现场多媒体证据"
          });
          loading.close();
          this.handleDialogClose();
        }
      });
    },
    handleEdit() {
      const id = this.mediaInfoId;
      this.dialogTitle = "修改现场多媒体证据";
      this.stateText = "修改";
      if(this.curStatus == "view"){
        this.dialogTitle = "查看现场多媒体证据";
      }
      this.mediaArryOther = this.list[this.tabIndex].mediaArry;
      this.handleDialogInfo(id);
    },
    async handleDialogInfo(id) {
      const reponse = await issueMediaInfo({ id });
      const subject = reponse.data;
      this.dialogParams.id = subject.id;
      this.dialogParams.mediaExplain = subject.mediaExplain;
      this.dialogParams.photoFileIds = subject.photoFileIds.split(",");
      this.dialogParams.mideaFileIds = subject.mideaFileIds.split(",");
      this.dialogParams.soundFileIds = subject.soundFileIds.split(",");
      this.dialogParams.cityCode = subject.cityCode;
      this.dialogParams.countyCode = subject.countyCode;
      this.dialogParams.address = subject.address;
      this.dialogParams.mediaDate = subject.mediaDate;
      this.dialogParams.mediaPerson = subject.mediaPerson;
      this.dialogParams.witness = subject.witness;
      this.dialogParams.electFileIds = subject.electFileIds.split(",");
      this.handleCityChangeb(subject.cityCode);
      this.$nextTick(() => {
        for (const item in this.$refs) {
          this.$refs[item].getFileMessageInfo &&
            this.$refs[item].getFileMessageInfo();
        }
      });
    },
    handleDialogClose() {
      this.handleformClear("dialogForm");
      for (const item in this.$refs) {
        this.$refs[item].handleClear && this.$refs[item].handleClear();
      }
      this.dialogParams.cityCode = undefined;
      this.dialogParams.countyCode = undefined;
      this.$emit("handleMediaClose", this.mediaArryOther);
      this.mediaArryOther = [];
      this.stateText = undefined;
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
.twoLayoutForm {
  .el-form-item {
    /deep/.el-form-item__label {
      width: 124px !important;
    }
  }
}
</style>