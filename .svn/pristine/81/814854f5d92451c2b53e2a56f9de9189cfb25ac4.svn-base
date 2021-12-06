<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="previewOpen"
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
            <span class="turn-dialog-number">{{ dialogRecordParams.showNum }}</span>
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
                dialogRecordParams.theme
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
                dialogRecordParams.actualInterviewee
                }}
              </span>
              <span class="turn-dialog-label">身份证号码：</span>
              <span class="turn-dialog-underline">
                {{
                dialogRecordParams.actualIntervieweeIdcard
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">年龄：</span>
              <span class="turn-dialog-underline">
                {{
                dialogRecordParams.actualIntervieweeAge
                }}
              </span>
              <span class="turn-dialog-label">职务：</span>
              <span class="turn-dialog-underline">
                {{
                dialogRecordParams.actualIntervieweePost
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">邮编：</span>
              <span class="turn-dialog-underline">
                {{
                dialogRecordParams.actualIntervieweePostcode
                }}
              </span>
              <span class="turn-dialog-label">手机号码：</span>
              <span class="turn-dialog-underline">
                {{
                dialogRecordParams.actualIntervieweePhone
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">工作单位：</span>
              <span class="turn-dialog-underline">
                {{
                dialogRecordParams.actualIntervieweeUnit
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">谈话地点：</span>
              <span class="turn-dialog-underline">
                {{ previewData.city }}{{ previewData.county
                }}{{ dialogRecordParams.actualAddress }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">其他参与人员：</span>
              <span class="turn-dialog-underline">
                {{
                dialogRecordParams.otherHander
                }}
              </span>
            </div>
          </div>
        </div>
        <div class="print-box">
          <div
            class="turn-dialog-content print-item"
            v-for="item in dialogRecordParams.recordList"
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
export default {
  props: {
    previewOpen: {
      type: Boolean
    },
    previewData: {
      type: Object
    },
    inspectName: {
      type: String
    },
    dialogRecordParams: {
      type: Object
    },
    dialogTitle: {
      type: String,
      default: "取证笔录预览"
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    handleDialogPreviewClose() {
      this.$emit("handlePreviewClose");
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-item-address {
  width: 900px !important;
}
.dialog-item-jilu {
  width: 405px !important;
}
.dialog-item-tall {
  width: 420px !important;
}
.dialog-item-unit {
  width: 442px !important;
}
.dialog-item-other {
  width: 830px !important;
}
.dialog-item-filla {
  width: 72px !important;
  text-align: center !important;
}
</style>