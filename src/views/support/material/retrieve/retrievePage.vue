<template>
  <div class="zh-search">
    <div class="search-wrap">
      <el-input
        placeholder="请输入内容"
        v-model="queryParams.name"
        class="input-with-select"
        @keyup.enter.native="handleSearchClick"
      >
        <el-button slot="append" icon="el-icon-search" @click="handleSearchClick">检索</el-button>
      </el-input>
    </div>
    <div class="result" v-if="count > 0">
      <p class="top">
        共为您检索到：
        <span class="record-nub">{{ count }}</span>个相关记录
      </p>
      <div class="ul">
        <div class="li" v-for="item in retrieveList" :key="item.id">
          <h1 class="title">{{ item.name }}</h1>
          <div class="retrieve-state">
            <span class="state-item" v-if="item.areaName">
              所属地区：
              <b class="state-text">{{ item.areaName }}</b>
            </span>
            <span class="state-item" v-if="item.businessTypeName">
              文件类型：
              <b class="state-text">{{ item.businessTypeName }}</b>
            </span>
            <span class="state-item" v-if="item.fromPerson">
              提供人：
              <b class="state-text">{{ item.fromPerson }}</b>
            </span>
            <span class="state-item" v-if="item.uploadTime">
              提供时间：
              <b class="state-text">{{ item.uploadTime }}</b>
            </span>
          </div>
          <p class="content">简介： {{ item.content }}</p>
          <div></div>
          <el-button
            size="mini"
            type="primary"
            @click="handlePreviewClick(item.attachmentId,item.attachmentName)"
          >查看文件</el-button>
          <el-button size="mini" @click="handleDownloadClick(item.attachmentId)" type="primary">下载</el-button>
        </div>
        <div class="page">
          <pagination
            v-show="count > 0"
            :total="count"
            :pageNo.sync="queryParams.pageNo"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
    <img-preview ref="imgPreview" :fileId="fileId"></img-preview>
    <video-preview ref="videoPreview" :fileId="fileId"></video-preview>
    <audio-preview ref="audioPreview" :fileId="fileId"></audio-preview>
  </div>
</template>

<script>
import { fullSearch } from "@/api/support/material";
import { getSingleInfo, filePreview } from "@/utils/styem";
import { getFileInfo } from "@/api/file";
import { imgShow } from "@/utils/imgShow";
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
  data() {
    return {
      queryParams: {
        name: undefined,
        pageNo: 1,
        pageSize: 10
      },
      retrieveList: undefined,
      count: undefined,
      fileId: undefined,
      videoSrc: undefined,
      audioSrc: undefined
    };
  },
  methods: {
    async getList() {
      const loading = this.$loading({
        lock: true,
        text: "正在搜索...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)"
      });
      const reponse = await fullSearch(this.queryParams);
      this.retrieveList = reponse.data.list;
      this.count = reponse.data.count;
      loading.close();
    },
    async handleSearchClick() {
      if (!this.queryParams.name) {
        this.$message({
          message: "搜索内容不能为空",
          type: "warning"
        });
        return;
      }
      this.getList();
    },
    handleDownloadClick(fileId) {
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
.zh-search {
  width: 100%;
  background: white;
  min-height: 100%;
  padding-bottom: 30px;
  .search-wrap {
    width: 600px;
    margin: 0 auto;
    padding: 30px 0;
    .el-select {
      width: 100px;
    }
    /deep/ .el-input-group__append {
      background: #116ecb;
      color: white;
      border: 1px solid #116ecb;
      width: 120px;
      text-align: center;
    }
  }
  .filter {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    .el-checkbox-group {
      display: inline-block;
    }
  }
  .result {
    .top {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0 20px 0;
      font-size: 16px;
      .record-nub {
        color: red;
        font-size: 16px;
        margin-right: 4px;
      }
    }
    .ul {
      background: #f7f7f7;
      margin: 0 40px;
      .li {
        padding: 20px 0;
        margin: 0 30px;
        border-bottom: 1px #116ecb dashed;
        color: #3e3c3c;

        .title {
          font-weight: 500;
          padding-bottom: 10px;
          color: #116ecb;
          font-size: 16px;
          margin: 0;
        }
        .retrieve-state {
          display: flex;
          flex-wrap: wrap;
          .state-item {
            font-size: 16px;
            margin-right: 24px;
          }
          .state-text {
            font-size: 16px;
            font-weight: normal;
          }
        }
        .content {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          cursor: pointer;

          font-size: 14px;
        }
      }
      .page {
        height: 100px;
        padding: 20px 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .empty {
    margin-top: 100px;
  }
}
</style>