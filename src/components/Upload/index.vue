<template>
  <div class="list-add-group">
    <el-upload
      ref="upload"
      multiple
      :limit="limit"
      :action="upload.url"
      :accept="accept"
      :headers="upload.headers"
      :uploadPath="upload.uploadPath"
      :disabled="upload.isUploading || uneditable"
      :on-progress="handleFileUploadProgress"
      :on-success="handleFileSuccess"
      :on-remove="handleFileRemove"
      :on-exceed="handleExceed"
      :auto-upload="true"
      :on-preview="handelPreviewClick"
      :file-list="fileList"
      :before-upload="beforeUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { deletefile, getFileInfo } from "@/api/file";
import { downLoadZip } from "@/utils/zipdownload";
import { getSingleInfo, getdownLoadZip } from "@/utils/styem";
export default {
  props: {
    limit: {
      type: Number,
      default: () => 5
    },
    accept: {
      type: String,
      default: () =>
        ".xlsx, .xls, .doc, .docx, .pdf, .mov, .rmvb, .rm, .mp4, .3gp, .jpg, jpeg, .png, .txt, .mp3, .mpeg, .wma"
    },
    params: {
      type: String
    },
    fileId: {
      type: [String, Array]
    },
    fromKey: {
      type: String,
      default: () => ""
    },
    uneditable: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      upload: {
        headers: { Authorization: getToken() },
        isUploading: false,
        uploadPath: "hzx",
        url: process.env.VUE_APP_BASE_API + "/center/file/uploadFile"
      },
      fileList: []
    };
  },
  methods: {
    handleExceed(files, fileList) {
      if (fileList.length >= this.limit) {
        this.$message.warning(
          `上传个数超过限制个数，最多上传${this.limit}个！！！`
        );
      }
    },
    async getFileMessageInfo() {
      if (this.fileId) {
        let ids;
        if (Array.isArray(this.fileId)) {
          ids = this.fileId.join(",");
        } else {
          ids = this.fileId;
        }
        const reponse = await getFileInfo({ ids });
        let fileList = [];
        for (const item in reponse.data) {
          const subject = reponse.data[item];
          const temp = {
            name: subject.file_name,
            url: subject.save_path,
            id: subject.id,
            state: subject.object_id
          };
          fileList.push(temp);
        }
        this.fileList = fileList;
      }
    },
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    async handleFileSuccess(response) {
      this.upload.isUploading = false;
      this.$message.success("上传成功");
      this.$emit("setUrlPath", {
        fromKey: this.fromKey,
        fileId: response.data.fileId,
        params: this.params
      });
    },
    async handleFileRemove(file) {
      const fileId =
        file.response == undefined ? file.id : file.response.data.fileId;
      this.$emit("deleteServeFile", {
        fromKey: this.fromKey,
        fileId,
        params: this.params
      });
    },
    handelPreviewClick(file) {
      if (file.response) {
        const fileId = file.response.data.fileId;
        getSingleInfo(fileId);
      } else {
        const fileUrl = file.url;
        const state = file.state;
        const fileName = file.name;
        if (state === "FASTDFS") {
          const fastInfo = localStorage.getItem("fastInfo");
          const fastSubject = JSON.parse(fastInfo);
          window.location.href =
            fastSubject.downloadUrl + fileUrl + "?fileName=" + fileName;
        } else {
          getdownLoadZip(fileUrl);
        }
      }
    },
    beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["pdf", "doc", "docx", "xls", "xlsx"];
      if (this.accept.indexOf(fileSuffix) === -1) {
        this.$message.error(`上传文件只能是${this.accept}格式`);
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 500;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 500MB");
        return false;
      }
    },
    handleClear() {
      this.$refs.upload.clearFiles();
    }
  }
};
</script>

<style lang="scss" scoped>
.list-add-group {
  display: flex;
  line-height: 30px;
  margin: 0px;
  div {
    width: 100%;
  }
  label {
    font-weight: normal;
    text-align: right;
    font-size: 14px;
  }
  .list-add-label {
    width: 80px;
  }
}
/deep/.el-upload-list__item {
  transition: none !important;
}
</style>