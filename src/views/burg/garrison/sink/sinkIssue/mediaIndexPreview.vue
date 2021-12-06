<template>
  <div>
    <el-dialog
      title="多媒体记录查看"
      :visible.sync="mediaIndexOpen"
      width="80%"
      :before-close="handleDialogCheckClose"
      append-to-body
      class="manage-dialog"
    >
      <examineInfo />
      <div class="examineInfo">
        <h1 class="examineInfo-title">影像资料</h1>
      </div>
      <div class="manage-box">
        <div class="manage-info">
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">影像资料说明：</span>
              <span class="info-item-content">{{
                dialogParams.mediaExplain
              }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">照片：</span>
              <div class="info-item-content">
                <span
                  v-for="item in dialogParams.photoFileIds"
                  :key="item.path"
                  class="check-text accounChunk"
                  @click="handleKnowDownloadClick(item.id,item.save_path,item.file_name,item.object_id)"
                  >{{ item.file_name }}</span
                >
              </div>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">视频：</span>
              <div class="info-item-content">
                <span
                  v-for="item in dialogParams.mideaFileIds"
                  :key="item.path"
                  class="check-text accounChunk"
                  @click="handleKnowDownloadClick(item.id,item.save_path,item.file_name,item.object_id)"
                  >{{ item.file_name }}</span
                >
              </div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">录音：</span>
              <div class="info-item-content">
                <span
                  v-for="item in dialogParams.soundFileIds"
                  :key="item.path"
                  class="check-text accounChunk"
                  @click="handleKnowDownloadClick(item.id,item.save_path,item.file_name,item.object_id)"
                  >{{ item.file_name }}</span
                >
              </div>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">地点：</span>
              <span class="info-item-content"
                >{{ dialogParams.city }}{{ dialogParams.county
                }}{{ dialogParams.address }}</span
              >
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">时间：</span>
              <span class="info-item-content">{{
                dialogParams.mediaDate
              }}</span>
            </div>
            <div class="info-item-quare">
              <span class="info-item-title">影像提供人：</span>
              <span class="info-item-content">{{
                dialogParams.mediaPerson
              }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">当事人/见证人：</span>
              <span class="info-item-content">{{ dialogParams.witness }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-quare">
              <span class="info-item-title">电子件：</span>
              <div class="info-item-content">
                <span
                  v-for="item in dialogParams.electFileIds"
                  :key="item.path"
                  class="check-text accounChunk"
                  @click="handleKnowDownloadClick(item.id,item.save_path,item.file_name,item.object_id)"
                  >{{ item.file_name }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { issueMediaInfo } from "@/api/burg/garrison";
import examineInfo from "@/components/examineInfo";
import { getFileInfo } from "@/api/file";
import { getKnownSingleInfo } from "@/utils/styem";
export default {
  props: {
    mediaIndexId: {
      type: String
    },
    mediaIndexOpen: {
      type: Boolean
    }
  },
  components: {
    examineInfo
  },
  data() {
    return {
      dialogParams: {
        id: undefined,
        mediaExplain: undefined,
        photoFileIds: [],
        mideaFileIds: [],
        soundFileIds: [],
        city: undefined,
        county: undefined,
        address: undefined,
        mediaDate: undefined,
        mediaPerson: undefined,
        witness: undefined,
        electFileIds: []
      }
    };
  },
  methods: {
    handleDialogCheckClose() {
      this.$emit("handleMediaIndexClose");
    },
    handleEdit() {
      const id = this.mediaIndexId;
      this.getDialogInfo(id);
    },
    async getDialogInfo(id) {
      const reponse = await issueMediaInfo({ id });
      const subject = reponse.data;
      this.dialogParams.id = subject.id;
      this.dialogParams.mediaExplain = subject.mediaExplain;
      this.dialogParams.photoFileIds = this.getSingleMessagInfo(
        subject.photoFileIds,
        "photoFileIds"
      );
      this.dialogParams.mideaFileIds = this.getSingleMessagInfo(
        subject.mideaFileIds,
        "mideaFileIds"
      );
      this.dialogParams.soundFileIds = this.getSingleMessagInfo(
        subject.soundFileIds,
        "soundFileIds"
      );
      this.dialogParams.city = subject.city||undefined;
      this.dialogParams.county = subject.county||undefined;
      this.dialogParams.address = subject.address;
      this.dialogParams.mediaDate = subject.mediaDate;
      this.dialogParams.mediaPerson = subject.mediaPerson;
      this.dialogParams.witness = subject.witness;
      this.dialogParams.electFileIds = this.getSingleMessagInfo(
        subject.electFileIds,
        "electFileIds"
      );
    },
    async getSingleMessagInfo(fileId, name) {
      const reponse = await getFileInfo({ ids: fileId });
      if (reponse.data && reponse.data.length) {
        this.dialogParams[name] = reponse.data;
      }
    },
    handleKnowDownloadClick(fileId, fileUrl, fileName, state) {
      console.log(fileId, fileUrl, fileName, state);
      getKnownSingleInfo(fileId, fileUrl, fileName, state);
    }
  }
};
</script>

<style lang="scss" scoped>
.accounChunk{
  display: block;
}
</style>