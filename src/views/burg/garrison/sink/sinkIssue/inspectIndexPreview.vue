<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="previewIndexOpen"
      :before-close="handleDialogPreviewClose"
      width="80%"
      append-to-body
    >
      <div>
        <div class="print-box print-box-top">
          <div class="turn-dialog-top">
            <h1 class="turn-dialog-title">{{ userInfo.provinceName }}环境保护督察组调查询问笔录</h1>
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
                previewData.endTime.year
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
              <span class="turn-dialog-label">问询主题：</span>
              <span class="turn-dialog-underline">
                {{
                previewData.theme
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">问询人员：</span>
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
              <span class="turn-dialog-label">被询问人：</span>
              <span class="turn-dialog-underline">
                {{
                previewData.actualInterviewee
                }}
              </span>
              <span class="turn-dialog-label">身份证号码：</span>
              <span class="turn-dialog-underline">
                {{
                previewData.actualIntervieweeIdcard
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">年龄：</span>
              <span class="turn-dialog-underline">
                {{
                previewData.actualIntervieweeAge
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
              <span class="turn-dialog-label">邮编：</span>
              <span class="turn-dialog-underline">
                {{
                previewData.actualIntervieweePostcode
                }}
              </span>
              <span class="turn-dialog-label">手机号码：</span>
              <span class="turn-dialog-underline">
                {{
                previewData.actualIntervieweePhone
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
    },
    dialogTitle: {
      type: String,
      default: "取证笔录预览"
    }
  },
  data() {
    return {
      inspectName: undefined,
      previewData: {
        theme: undefined,
        actualInterviewee: undefined,
        actualIntervieweeAge: undefined,
        actualIntervieweeIdcard: undefined,
        actualIntervieweeUnit: undefined,
        actualIntervieweePost: undefined,
        city: undefined,
        county: undefined,
        actualAddress: undefined,
        actualIntervieweePostcode: undefined,
        actualIntervieweePhone: undefined,
        otherHander: undefined,
        actualSpeakerNmae: undefined,
        actualRecordName: undefined,
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
      this.previewData.theme = data.theme;
      this.previewData.actualInterviewee = data.actualInterviewee;
      this.previewData.actualIntervieweeAge = data.actualIntervieweeAge;
      this.previewData.actualIntervieweeIdcard = data.actualIntervieweeIdcard;
      this.previewData.actualIntervieweeUnit = data.actualIntervieweeUnit;
      this.previewData.actualIntervieweePost = data.actualIntervieweePost;
      this.previewData.city = data.city;
      this.previewData.county = data.county;
      this.previewData.actualAddress = data.actualAddress;
      this.previewData.actualIntervieweePostcode =
        data.actualIntervieweePostcode;
      this.previewData.actualIntervieweePhone = data.actualIntervieweePhone;
      this.previewData.otherHander = data.otherHander;
      this.previewData.actualSpeakerNmae = data.actualSpeaker;
      this.previewData.actualRecordName = data.actualRecord;
      this.previewData.recordList = data.recordList;
      this.previewData.showNum = data.showNum;
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