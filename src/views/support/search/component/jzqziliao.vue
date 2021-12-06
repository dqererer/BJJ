<template>
  <div class="ziliao">
    <section>
      <div class="title">进驻手册</div>
      <p>
        <span v-for="(item, index) in moveinNoticeFileIds" v-bind:key="index"
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
          ><span v-if="index != moveinNoticeFileIds.length - 1">、</span></span
        >
      </p>
    </section>
    <section>
      <div class="title">进驻培训会</div>
      <p>
        会议时间：<span>{{ meetDate }}</span>
      </p>
      <p>
        培训手册：<span
          v-for="(item, index) in trainingManualFileIds"
          v-bind:key="index"
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
          ><span v-if="index != trainingManualFileIds.length - 1"
            >、</span
          ></span
        >
      </p>
      <p>
        培训通知：<span
          v-for="(item, index) in trainingNoticeFileIds"
          v-bind:key="index"
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
          ><span v-if="index != trainingNoticeFileIds.length - 1"
            >、</span
          ></span
        >
      </p>
      <p>
        培训PPT：<span
          v-for="(item, index) in trainingPPTFileIds"
          v-bind:key="index"
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
          ><span v-if="index != trainingPPTFileIds.length - 1">、</span></span
        >
      </p>
      <p>
        培训总结：<span
          v-for="(item, index) in trainingSummaryFileIds"
          v-bind:key="index"
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
          ><span v-if="index != trainingSummaryFileIds.length - 1"
            >、</span
          ></span
        >
      </p>
      <p>
        现场照片：<span v-for="(item, index) in photoFileIds" v-bind:key="index"
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
          ><span v-if="index != photoFileIds.length - 1">、</span></span
        >
      </p>
    </section>
    <img-preview ref="imgPreview" :fileId="fileId"></img-preview>
  </div>
</template>
<script>
import { findTeamMeetList } from "@/api/support/search";
import { getFileInfo } from "@/api/file";
import { getSingleInfo, filePreview } from "@/utils/styem";
import imgPreview from "@/components/imgPreview";
import { isImg } from "@/utils/validate";
export default {
  data() {
    return {
      batchId: "",
      total: 0,
      moveinNoticeFileIds: [],
      trainingManualFileIds: [],
      trainingNoticeFileIds: [],
      trainingPPTFileIds: [],
      trainingSummaryFileIds: [],
      photoFileIds: [],
      meetDate: "",
      fileId:'',
    };
  },
  components: {
    imgPreview,
  },
  computed: {},
  created() {
    this.batchId = this.$route.query.batchId;
    this.getTeamMeetList();
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
    getTeamMeetList: function () {
      findTeamMeetList({
        type: 1,
        batchId: this.batchId,
      }).then((res) => {
        let info = res.data[0];
        this.meetDate = info.meetDate;
        let moveinNoticeFileIds = info.moveinNoticeFileIds.split(",");
        let trainingManualFileIds = info.trainingManualFileIds.split(",");
        let trainingNoticeFileIds = info.trainingNoticeFileIds.split(",");
        let trainingPPTFileIds = info.trainingPPTFileIds.split(",");
        let trainingSummaryFileIds = info.trainingSummaryFileIds.split(",");
        let photoFileIds = info.photoFileIds.split(",");
        moveinNoticeFileIds.forEach((item) => {
          this.getFileInfo(item, "moveinNoticeFileIds");
        });
        trainingManualFileIds.forEach((item) => {
          this.getFileInfo(item, "trainingManualFileIds");
        });
        trainingNoticeFileIds.forEach((item) => {
          this.getFileInfo(item, "trainingNoticeFileIds");
        });
        trainingPPTFileIds.forEach((item) => {
          this.getFileInfo(item, "trainingPPTFileIds");
        });
        trainingSummaryFileIds.forEach((item) => {
          this.getFileInfo(item, "trainingSummaryFileIds");
        });
        photoFileIds.forEach((item) => {
          this.getFileInfo(item, "photoFileIds");
        });
      });
    },
    getFileInfo: function (id, key) {
      getFileInfo({ ids: id }).then((res) => {
        let obj = {
          id,
          path: res.data[0].save_path,
          name: res.data[0].file_name,
        };
        this[key].push(obj);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ziliao {
  .title {
    border-left: 3px solid #2196f3;
    padding-left: 10px;
    font-weight: bold;
    margin: 20px 0;
  }
  p {
    padding-left: 10px;
    font-weight: 500;
    span,
    a {
      font-weight: 400;
    }
  }
  a {
    color: #2196f3;
  }
}
</style>


