<template>
  <div class="see-content">
    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">用户名：</label>
          <span class="see-page-text">{{ spaceSeeData.user }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">部门：</label>
          <span class="see-page-text">{{ spaceSeeData.office }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">区域：</label>
          <span class="see-page-text">{{ spaceSeeData.area }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">名称：</label>
          <span class="see-page-text">{{ spaceSeeData.name }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">性别：</label>
          <span class="see-page-text">{{ spaceSeeData.sex }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">日期：</label>
          <span class="see-page-text">{{ spaceSeeData.inDate }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">file_info：</label>
          <span
            class="see-page-text linStyle"
            v-if="fileInfoList != undefined"
            @click="handleDownload(fileInfoList.url)"
            >{{ fileInfoList.name }}</span
          >
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="see-page-box">
          <label class="see-page-label">remarks：</label>
          <span class="see-page-text">{{ spaceSeeData.remarks }}</span>
        </div>
      </el-col>
    </el-row>

    <el-row class="out-see-line">
      <el-button @click="handleBackClick">返回</el-button>
    </el-row>
  </div>
</template>

<script>
import { testDataDemoSee } from "@/api/case/single";
import { getFileInfo } from "@/api/file";
import { downLoadZip } from "@/utils/zipdownload";
import Bus from "@/utils/vueBus";
export default {
  data() {
    return {
      spaceSeeData: {
        id: undefined,
        user: undefined,
        office: undefined,
        area: undefined,
        name: undefined,
        sex: undefined,
        inDate: undefined,
        fileInfo: undefined,
        createBy: undefined,
        createDate: undefined,
        updateBy: undefined,
        updateDate: undefined,
        remarks: undefined,
        delFlag: undefined
      },
      fileInfoList: undefined
    };
  },
  created() {
    Bus.$off("outComeSeeId");
  },
  mounted() {
    Bus.$on("outComeSeeId", id => {
      this.handleReset();
      this.getSpaceSee(id);
    });
  },
  methods: {
    async getSpaceSee(id) {
      const reponse = await testDataDemoSee({ id });
      this.spaceSeeData = reponse.data;
      this.spaceSeeData.user = reponse.data.user.name;
      this.spaceSeeData.office = reponse.data.office.name;
      this.spaceSeeData.area = reponse.data.area.name;
      const fileInfo = reponse.data.fileInfo;
      if (fileInfo) {
        this.getFileInfoMessage(fileInfo, "fileInfoList");
      } else {
        this.fileInfoList = undefined;
      }
    },
    async getFileInfoMessage(fileId, name) {
      const reponse = await getFileInfo({ ids: fileId });
      const subject = reponse.data;
      if (subject.length) {
        const temp = {
          name: subject[0].file_name,
          url: subject[0].save_path,
          id: fileId
        };
        this[name] = temp;
      }
    },
    handleDownload(fileId) {
      downLoadZip("/center/file/downloadFile", fileId);
    },
    handleBackClick() {
      this.$emit("backHandle", "back");
    },
    handleReset() {
      this.spaceSeeData = {
        id: undefined,
        user: undefined,
        office: undefined,
        area: undefined,
        name: undefined,
        sex: undefined,
        inDate: undefined,
        fileInfo: undefined,
        createBy: undefined,
        createDate: undefined,
        updateBy: undefined,
        updateDate: undefined,
        remarks: undefined,
        delFlag: undefined
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.see-content .see-page-box .see-page-label {
  width: 140px;
}
</style>