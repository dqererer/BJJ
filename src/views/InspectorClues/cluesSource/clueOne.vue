<template>
  <div>
    <div class="title">线索详细信息</div>
    <div class="clue-info">
      <div class="clue-item">
        <div class="clue-item-quare">
          <span class="clue-item-label">
            <i class="clue-import">*</i>线索名称：
          </span>
          <span class="clue-item-input">{{ manageInfo.clueName }}</span>
        </div>
      </div>
      <div class="clue-item two-clue-item">
        <div class="clue-item-quare">
          <span class="clue-item-label">
            <i class="clue-import">*</i>线索编号：
          </span>
          <span class="clue-item-input">{{ manageInfo.clueNum }}</span>
        </div>
        <div class="clue-item-quare">
          <span class="clue-item-label">
            <i class="clue-import">*</i>线索来源：
          </span>
          <span class="clue-item-input">{{ manageInfo.clueSourceName }}</span>
        </div>
      </div>
      <div class="clue-item two-clue-item">
        <div class="clue-item-quare">
          <span class="clue-item-label">
            <i class="clue-import">*</i>污染类型：
          </span>
          <span class="clue-item-input">{{ manageInfo.pollutionTypeName }}</span>
        </div>
        <div class="clue-item-quare">
          <span class="clue-item-label">
            <i class="clue-import">*</i>问题属性：
          </span>
          <span class="clue-item-input">{{ manageInfo.problemType }}</span>
        </div>
      </div>
      <div class="clue-item">
        <div class="clue-item-quare">
          <span class="clue-item-label">
            <i class="clue-import">*</i>线索所在地：
          </span>
          <span
            class="clue-item-input"
          >{{ manageInfo.city }}{{ manageInfo.county }}{{ manageInfo.town }}{{ manageInfo.address }}</span>
          <!-- <div class="clue-item-select">
            <span class="clue-item-select-city">{{ manageInfo.city }}</span>
            <span class="clue-item-select-city">{{ manageInfo.county }}</span>
            <span class="clue-item-select-city">{{ manageInfo.town }}</span>
            <span class="clue-item-select-address">{{ manageInfo.address }}</span>
          </div>-->
        </div>
      </div>
      <div class="clue-item">
        <div class="clue-item-quare">
          <span class="clue-item-label">
            <i class="clue-import">*</i>线索内容：
          </span>
          <span class="clue-item-input">{{ manageInfo.clueContent }}</span>
        </div>
      </div>
      <div class="clue-item two-clue-item">
        <div class="clue-item-quare">
          <span class="clue-item-label">
            <i class="clue-import">*</i>重点关注：
          </span>
          <span class="clue-item-input">{{ manageInfo.weatherFocus||'否' }}</span>
        </div>
      </div>
      <div class="clue-item clue-item-paper">
        <div class="clue-item-quare clue-item-inspect">
          <span class="clue-item-label">
            <i class="clue-import">*</i>线索相关材料：
          </span>
          <div class="clue-item-file">
            <!-- <span
              class="accounChunk"
              @click="handleDownLoadDoc(manageInfo.attachmentId)"
            >{{manageInfo.attachmentName}}</span>-->
            <div class="clue-item-file-group">
              <span class="accounChunk">{{manageInfo.attachmentName}}</span>
              <div class="button-box">
                <el-button
                  size="mini"
                  @click="handlePreviewClick(manageInfo.attachmentId,manageInfo.attachmentName)"
                >预览</el-button>
                <el-button
                  size="mini"
                  @click="handleDownLoadDoc(manageInfo.attachmentId)"
                  type="primary"
                >下载</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <img-preview ref="imgPreview" :fileId="fileId"></img-preview>
    <video-preview ref="videoPreview" :fileId="fileId"></video-preview>
    <audio-preview ref="audioPreview" :fileId="fileId"></audio-preview>
  </div>
</template>

<script>
import { getSingleInfo, filePreview } from "@/utils/styem";
import imgPreview from "@/components/imgPreview";
import videoPreview from "@/components/videoPreview";
import audioPreview from "@/components/audioPreview";
import { isImg, isVideo, isAudio } from "@/utils/validate";
export default {
  components: {
    imgPreview,
    videoPreview,
    audioPreview
  },
  props: {
    clueBaseInfo: {
      type: Object
    }
  },
  watch: {
    clueBaseInfo(data) {
      this.manageInfo = data;
      this.manageInfo.weatherFocus = data.weatherFocus == 1 ? "是" : "否";
    }
  },
  data() {
    return {
      manageInfo: {
        clueName: undefined,
        clueNum: undefined,
        clueSourceName: undefined,
        pollutionTypeName: undefined,
        problemType: undefined,
        cityCode: undefined,
        countyCode: undefined,
        townCode: undefined,
        address: undefined,
        clueContent: undefined,
        attachmentName: undefined,
        weatherFocus: undefined,
        longitude: undefined,
        latitude: undefined
      },
      fileId: undefined
    };
  },
  methods: {
    handleDownLoadDoc(fileId) {
      getSingleInfo(fileId);
    },
    handlePreviewClick(fileId, fileName) {
      this.fileId = fileId;
      if (isImg(fileName)) {
        this.$nextTick(() => {
          this.$refs.imgPreview.handleImgPreview();
        });
      } else if (isVideo(fileName)) {
        this.$nextTick(() => {
          this.$refs.videoPreview.handleVideoPreview();
        });
      } else if (isAudio(fileName)) {
        this.$nextTick(() => {
          this.$refs.audioPreview.handleAudioPreview();
        });
      } else {
        filePreview(fileId);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  height: 20px;
  border-left: 3px solid #2196f3;
  padding-left: 10px;
  font-size: 14px;
  font-weight: 500;
}
.clue-info {
  width: 100%;
  .clue-item {
    display: flex;
    margin-top: 16px;
    &.two-clue-item {
      .clue-item-quare {
        &:first-child {
          margin-right: 16px;
        }
      }
    }
    .clue-item-quare {
      flex: 1;
      display: flex;
      flex-direction: column;
      .clue-item-file {
        padding-left: 10px;
      }
      .clue-item-label {
        font-size: 14px;
        color: #333;
        margin-bottom: 10px;
        display: block;
        .clue-import {
          display: inline-block;
          margin-right: 4px;
          color: #f56c6c;
        }
      }
      .clue-item-input {
        width: 100%;
        min-height: 32px;
        line-height: 32px;
        font-size: 14px;
        border: 1px solid #eee;
        border-radius: 4px;
        padding-left: 10px;
        box-sizing: border-box;
        overflow: hidden;
      }
      .clue-item-select {
        display: flex;
        .clue-item-select-city {
          width: 11%;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          border: 1px solid #eee;
          margin-right: 16px;
          border-radius: 4px;
          padding-left: 10px;
          overflow: hidden;
        }
        .clue-item-select-address {
          flex: 1;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          border: 1px solid #eee;
          border-radius: 4px;
          padding-left: 10px;
          overflow: hidden;
        }
      }
    }
  }
}
.accounChunk {
  display: inline-block;
  padding: 4px 10px 4px 10px;
  background-color: #eee;
  margin-bottom: 4px;
  max-width: 500px;
}
</style>