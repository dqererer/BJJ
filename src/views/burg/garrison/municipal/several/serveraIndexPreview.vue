<template>
  <div>
    <el-dialog
      title="个别谈话预览"
      :visible.sync="previewIndexOpen"
      :before-close="handleDialogPreviewClose"
      width="80%"
      append-to-body
    >
      <div>
        <div class="print-box print-box-top">
          <div class="turn-dialog-top">
            <h1 class="turn-dialog-title">{{ userInfo.provinceName }}环境保护督察组个别谈话记录</h1>
          </div>
          <div class="turn-dialog-box">
            <span class="turn-dialog-name">{{ inspectName }}</span>
            <span class="turn-dialog-number">{{ previewData.showNum }}</span>
          </div>
          <div class="turn-dialog-content">
            <div class="turn-dialog-line turn-dialog-line-date">
              <span class="turn-dialog-label">谈话时间：</span>
              <span class="turn-dialog-underline">
                {{
                previewData.startTime.year
                }}
              </span>
              <span class="turn-dialog-text">年</span>
              <span class="turn-dialog-underline">
                {{
                previewData.startTime.month
                }}
              </span>
              <span class="turn-dialog-text">月</span>
              <span class="turn-dialog-underline">
                {{
                previewData.startTime.day
                }}
              </span>
              <span class="turn-dialog-text">日</span>
              <span class="turn-dialog-underline">
                {{
                previewData.startTime.hour
                }}
              </span>
              <span class="turn-dialog-text">时</span>
              <span class="turn-dialog-underline">
                {{
                previewData.startTime.min
                }}
              </span>
              <span class="turn-dialog-text">分至</span>
              <span class="turn-dialog-underline">
                {{
                previewData.startTime.year
                }}
              </span>
              <span class="turn-dialog-text">年</span>
              <span class="turn-dialog-underline">
                {{
                previewData.endTime.month
                }}
              </span>
              <span class="turn-dialog-text">月</span>
              <span class="turn-dialog-underline">
                {{
                previewData.endTime.day
                }}
              </span>
              <span class="turn-dialog-text">日</span>
              <span class="turn-dialog-underline">
                {{
                previewData.endTime.hour
                }}
              </span>
              <span class="turn-dialog-text">时</span>
              <span class="turn-dialog-underline">
                {{
                previewData.endTime.min
                }}
              </span>
              <span class="turn-dialog-text">分</span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">谈话人员：</span>
              <span class="turn-dialog-underline">
                {{
                previewData.actualSpeakerNmae
                }}
              </span>
              <span class="turn-dialog-label">记录人员：</span>
              <span class="turn-dialog-underline">
                {{
                previewData.actualRecordName
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">被谈话人：</span>
              <span class="turn-dialog-underline">
                {{
                previewData.actualInterviewee
                }}
              </span>
              <span class="turn-dialog-label">职务：</span>
              <span class="turn-dialog-underline">
                {{
                previewData.actualIntervieweePost
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">工作单位：</span>
              <span class="turn-dialog-underline">
                {{
                previewData.actualIntervieweeUnit
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">谈话地点：</span>
              <span class="turn-dialog-underline">
                {{ previewData.city }}{{ previewData.county
                }}{{ previewData.actualAddress }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">其他参与人员：</span>
              <span class="turn-dialog-underline">
                {{
                previewData.otherHander
                }}
              </span>
            </div>
          </div>
        </div>
        <div class="print-box">
          <div
            class="turn-dialog-content print-item"
            v-for="item in previewData.recordList"
            :key="item.id"
          >
            <p class="turn-dialog-item">问题：{{ item.question }}</p>
            <p class="turn-dialog-item">答案：{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { severalSee } from "@/api/burg/garrison";
import { teamInfoAmend } from "@/api/support/inspectorate";
export default {
  props: {
    previewIndexOpenId: {
      type: String
    },
    previewIndexOpen: {
      type: Boolean
    }
  },
  data() {
    return {
      inspectName: undefined,
      previewData: {
        actualSpeakerNmae: undefined,
        actualRecordName: undefined,
        actualInterviewee: undefined,
        actualIntervieweeUnit: undefined,
        actualIntervieweePost: undefined,
        city: undefined,
        county: undefined,
        actualAddress: undefined,
        recordList: undefined,
        showNum: undefined,
        startTime: {
          year: undefined,
          month: undefined,
          day: undefined,
          hour: undefined,
          min: undefined
        },
        endTime: {
          year: undefined,
          month: undefined,
          day: undefined,
          hour: undefined,
          min: undefined
        }
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    handleDialogPreviewClose() {
      this.$emit("handleInspectIndexPreviewClose");
    },
    async handleEdit() {
      const id = this.previewIndexOpenId;
      const reponse = await severalSee({ id });
      const subject = reponse.data;
      this.getReacodEditInfo(subject);
    },
    getReacodEditInfo(data) {
      console.log(data);
      this.previewData.actualSpeakerNmae = data.actualSpeaker;
      this.previewData.actualRecordName = data.actualRecord;
      this.previewData.actualInterviewee = data.actualInterviewee;
      this.previewData.actualIntervieweeUnit = data.actualIntervieweeUnit;
      this.previewData.actualIntervieweePost = data.actualIntervieweePost;
      this.previewData.city = data.actualCityName;
      this.previewData.county = data.actualCountyName;
      this.previewData.actualAddress = data.actualAddress;
      this.previewData.recordList = data.recordList;
      this.previewData.showNum = data.showNum;
      this.previewData.otherHander = data.otherHander;
      this.previewData.startTime = this.getTimeValue(data.startTime);
      this.previewData.endTime = this.getTimeValue(data.endTime);
      this.getInspectInfo(data.inspectId);
    },
    async getInspectInfo(id) {
      const reponse = await teamInfoAmend({ id });
      const subject = reponse.data;
      this.inspectName = subject.name;
    },
    getTimeValue(time) {
      const timeArry = time.split(" ");
      const yearArry = timeArry[0].split("-");
      const secondArry = timeArry[1].split(":");
      return {
        year: yearArry[0],
        month: yearArry[1],
        day: yearArry[2],
        hour: secondArry[0],
        min: secondArry[1]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>