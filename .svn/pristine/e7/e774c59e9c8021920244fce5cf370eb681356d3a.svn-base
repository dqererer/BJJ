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
      <header>谈话安排信息</header>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="谈话时间">{{
          tInspectTalk.arrangeTime
        }}</el-descriptions-item>
        <el-descriptions-item label="谈话领导">{{
          tInspectTalk.arrangeSpeaker
        }}</el-descriptions-item>
        <el-descriptions-item label="被谈话人">{{
          tInspectTalk.arrangeInterviewee
        }}</el-descriptions-item>
        <el-descriptions-item label="被谈话人职务">{{
          tInspectTalk.arrangeIntervieweePost
        }}</el-descriptions-item>
        <el-descriptions-item label="谈话地点" :span="2">
          {{ tInspectTalk.arrangeCityName }}，{{
            tInspectTalk.arrangeCountyName
          }}，{{ tInspectTalk.arrangeAddress }}
        </el-descriptions-item>
      </el-descriptions>
    </section>
    <section>
      <header>相关线索信息</header>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="已有线索信息" :span="2">
          <div class="info-item-content">
            <ul class="info-item-list">
              <li
                class="info-item-item"
                v-for="(item, index) in tInspectTalk.existClueList"
                :key="item.clueId"
              >
                <span>{{ index + 1 }}、{{ item.clueName }}</span>
                <a
                  href="#"
                  @click="preview(item.clueId)"
                  style="margin-left: 10px; color: #409eff"
                  >预览</a
                ><a
                  href="#"
                  style="margin-left: 10px; color: #409eff"
                  @click="downloadFile(item.clueId)"
                  >下载</a
                >
              </li>
            </ul>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="新增线索信息" :span="2">
          <div class="info-item-content">
            <ul class="info-item-list">
              <li
                class="info-item-item"
                v-for="(item, index) in tInspectTalk.newClueList"
                :key="item.clueId"
              >
                <span>{{ index + 1 }}、{{ item.clueName }}</span>
                <a
                  href="#"
                  @click="preview(item.clueId)"
                  style="margin-left: 10px; color: #409eff"
                  >预览</a
                ><a
                  href="#"
                  style="margin-left: 10px; color: #409eff"
                  @click="downloadFile(item.clueId)"
                  >下载</a
                >
              </li>
            </ul>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </section>
    <section>
      <header>谈话记录</header>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="谈话时间"
          >{{ tInspectTalk.startTime }} -
          {{ tInspectTalk.endTime }}</el-descriptions-item
        >
        <el-descriptions-item label="谈话人员">{{
          tInspectTalk.actualSpeaker
        }}</el-descriptions-item>
        <el-descriptions-item label="记录人员">{{
          tInspectTalk.actualRecord
        }}</el-descriptions-item>
        <el-descriptions-item label="被谈话人">{{
          tInspectTalk.actualInterviewee
        }}</el-descriptions-item>
        <el-descriptions-item label="单位">
          {{ tInspectTalk.actualIntervieweeUnit }}
        </el-descriptions-item>
        <el-descriptions-item label="职务">
          {{ tInspectTalk.actualIntervieweePost }}
        </el-descriptions-item>
        <el-descriptions-item label="谈话地点" :span="2">
          {{ tInspectTalk.actualCityName }}，{{
            tInspectTalk.actualCountyName
          }}，{{ tInspectTalk.actualAddress }}
        </el-descriptions-item>
        <el-descriptions-item label="其他参与人员" :span="2">
          {{ tInspectTalk.otherHander }}
        </el-descriptions-item>
      </el-descriptions>
    </section>
    <section class="talk">
      <header>谈话内容</header>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          v-for="(item, index) in tInspectTalk.recordList"
          v-bind:key="index"
          :label="'问题' + item.no"
          :span="2"
        >
          <p>{{ item.question }}</p>
          <p>{{ item.answer }}</p>
        </el-descriptions-item>
        <el-descriptions-item label="电子件">
          <div v-if="electricList">
            <span
              v-for="(item, index) in electricList"
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
              ><span v-if="index != electricList.length - 1">、</span></span
            >
          </div>
          <span v-else>-</span>
        </el-descriptions-item>
        <el-descriptions-item label="录音文件">
          <div v-if="audioList">
            <a
              v-for="(item, index) in audioList"
              v-bind:key="index"
              @click="handlePreviewClick(item.id, item.name)"
              href="#"
              >{{ item.name
              }}<span v-if="index != audioList.length - 1">、</span></a
            >
          </div>
          <span v-else>-</span>
        </el-descriptions-item>
      </el-descriptions>
    </section>
    <audio-preview ref="audioPreview" :fileId="fileId"></audio-preview>
  </div>
</template>
<script>
import { getTalkInfo } from "@/api/support/search";
import { getSingleInfo, filePreview } from "@/utils/styem";
import { getFileInfo } from "@/api/file";
import audioPreview from "@/components/audioPreview";
import { isAudio } from "@/utils/validate";

export default {
  data() {
    return {
      id: "",
      teamInfo: {},
      tInspectTalk: {},
      electricList: [],
      audioList: [],
      fileId: "",
    };
  },
  components: {
    audioPreview,
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
      if (isAudio(fileName)) {
        this.$nextTick(() => {
          this.$refs.audioPreview.handleAudioPreview();
        });
      }
    },
    getinfo: async function () {
      const res = await getTalkInfo({ id: this.id });
      this.teamInfo = res.data.teamInfo;
      this.tInspectTalk = res.data.tInspectTalk;
      let electricList =
        res.data.tInspectTalk.attachmentId &&
        res.data.tInspectTalk.attachmentId.split(",");
      electricList &&
        electricList.forEach((item) => {
          item && this.getFileInfo(item, "electricList");
        });
      let audioList =
        res.data.tInspectTalk.audioId &&
        res.data.tInspectTalk.audioId.split(",");
      audioList &&
        audioList.forEach((item) => {
          item && this.getFileInfo(item, "audioList");
        });
    },

    getFileInfo: function (id, key) {
      this.fileList = [];
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
    ul {
      margin: 0;
      padding: 0;
    }
  }
  .talk /deep/ th {
    width: 80px;
  }
}
li {
  display: block;
}
</style>


