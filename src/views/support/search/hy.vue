<template>
  <div class="hy">
    <section>
      <header>督察信息</header>
      <el-descriptions direction="vertical" :column="5" border>
        <el-descriptions-item label="督察类型"
          >{{ teamInfo.superviseOneName }} -
          {{ teamInfo.superviseName }}</el-descriptions-item
        >
        <el-descriptions-item label="督察轮次批次"
          >{{ teamInfo.roundName
          }}{{ teamInfo.batchName }}</el-descriptions-item
        >
        <el-descriptions-item label="督察组名称">{{
          teamInfo.name
        }}</el-descriptions-item>
        <el-descriptions-item label="开始时间">{{
          teamInfo.startDate
        }}</el-descriptions-item>
        <el-descriptions-item label="结束时间"
          >{{ teamInfo.endDate }}
        </el-descriptions-item>
      </el-descriptions>
    </section>
    <section>
      <header>会议信息</header>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="会议名称">{{
          meetInfo.meetName
        }}</el-descriptions-item>
        <el-descriptions-item label="会议主持人">{{
          meetInfo.host
        }}</el-descriptions-item>
        <el-descriptions-item label="会议时间">{{
          meetInfo.meetDate
        }}</el-descriptions-item>
        <el-descriptions-item label="会议地点">{{
          meetInfo.meetAddress
        }}</el-descriptions-item>
        <el-descriptions-item label="参与人员" :span="2">
          {{ meetInfo.attendees }}
        </el-descriptions-item>
        <el-descriptions-item label="会议纪要" :span="2">
          <div v-if="meetInfo.meetingMinutesFileIds">
            <a
              v-for="(item, index) in meetingMinutesList"
              v-bind:key="index"
              href="#"
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
              ><span v-if="index != meetingMinutesList.length - 1">、</span></a
            >
          </div>
          <span v-else>-</span>
        </el-descriptions-item>
        <el-descriptions-item label="汇报稿" :span="2">
          <div v-if="meetInfo.reportDraftFileIds">
            <a
              v-for="(item, index) in reportDraftList"
              v-bind:key="index"
              href="#"
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
              ><span v-if="index != reportDraftList.length - 1">、</span></a
            >
          </div>
          <span v-else>-</span>
        </el-descriptions-item>
        <el-descriptions-item label="照片" :span="2">
          <div v-if="meetInfo.photoFileIds">
            <a v-for="(item, index) in photoList" v-bind:key="index" href="#"
              >{{ item.name
              }}<a
                href="#"
                @click="handlePreviewClick(item.id, item.name)"
                style="margin-left: 10px; color: #409eff"
                >预览</a
              ><a
                href="#"
                style="margin-left: 10px; color: #409eff"
                @click="downloadFile(item.id)"
                >下载</a
              ><span v-if="index != photoList.length - 1">、</span></a
            >
          </div>
          <span v-else>-</span>
        </el-descriptions-item>
        <el-descriptions-item label="其他文件" :span="2">
          <div v-if="meetInfo.otherFiles">
            <a
              v-for="(item, index) in otherFileList"
              v-bind:key="index"
              href="#"
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
              ><span v-if="index != otherFileList.length - 1">、</span></a
            >
          </div>
          <span v-else>-</span>
        </el-descriptions-item>
      </el-descriptions>
    </section>
    <img-preview ref="imgPreview" :fileId="fileId"></img-preview>
  </div>
</template>
<script>
import { getMeetInfo } from "@/api/support/search";
import { getSingleInfo, filePreview } from "@/utils/styem";
import { getFileInfo } from "@/api/file";
import imgPreview from "@/components/imgPreview";
import { isImg } from "@/utils/validate";
export default {
  data() {
    return {
      id: "",
      teamInfo: {},
      meetInfo: {},
      handleInfo: {},
      meetingMinutesList: [],
      reportDraftList: [],
      photoList: [],
      otherFileList: [],
      fileId: "",
    };
  },
  components: {
    imgPreview,
  },
  computed: {},
  created() {
    this.id = this.$route.query.id;
    this.getinfo();
  },
  methods: {
    preview(ids) {
      filePreview(ids);
    },
    downloadFile: function (ids) {
      getSingleInfo(ids);
    },
    async handlePreviewClick(fileId, fileName) {
      this.fileId = fileId;
      if (isImg(fileName)) {
        this.$nextTick(() => {
          this.$refs.imgPreview.handleImgPreview();
        });
      }
    },
    getinfo: async function () {
      const res = await getMeetInfo({ id: this.id });
      this.teamInfo = res.data.teamInfo;
      this.meetInfo = res.data.meetInfo;
      let meetingMinutesList =
        res.data.meetInfo.meetingMinutesFileIds &&
        res.data.meetInfo.meetingMinutesFileIds.split(",");
      meetingMinutesList &&
        meetingMinutesList.forEach((item) => {
          item && this.getFileInfo(item, "meetingMinutesList");
        });
      let reportDraftList =
        res.data.meetInfo.reportDraftFileIds &&
        res.data.meetInfo.reportDraftFileIds.split(",");
      reportDraftList &&
        reportDraftList.forEach((item) => {
          item && this.getFileInfo(item, "reportDraftList");
        });
      let photoList =
        res.data.meetInfo.photoFileIds &&
        res.data.meetInfo.photoFileIds.split(",");
      photoList &&
        photoList.forEach((item) => {
          item && this.getFileInfo(item, "photoList");
        });
      let otherFileList =
        res.data.meetInfo.otherFiles && res.data.meetInfo.otherFiles.split(",");
      otherFileList &&
        otherFileList.forEach((item) => {
          item && this.getFileInfo(item, "otherFileList");
        });
    },

    getFileInfo: function (id, key) {
      this.fileList = [];
      getFileInfo({ ids: id }).then((res) => {
        let obj = {
          path: res.data[0].save_path,
          name: res.data[0].file_name,
          id,
        };
        this[key].push(obj);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.hy {
  padding: 20px;
  section {
    margin-bottom: 20px;
    header {
      height: 40px;
      line-height: 40px;
      background: #409eff;
      text-align: center;
      color: white;
    }
  }
}
</style>


