<template>
  <div>
    <el-dialog
      title="勘察笔录预览"
      :visible.sync="previewOpen"
      :before-close="handleDialogPreviewClose"
      width="80%"
      append-to-body
    >
      <div>
        <div class="print-box print-box-top">
          <div class="turn-dialog-top">
            <h1 class="turn-dialog-title">
              {{ userInfo.provinceName }}环境保护督察组现场勘察笔录
            </h1>
          </div>
          <div class="turn-dialog-box">
            <span class="turn-dialog-name">{{ inspectName }}</span>
            <span class="turn-dialog-number">{{ dialogParams.showNum }} </span>
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
              <span class="turn-dialog-label">地点：</span>
              <span class="turn-dialog-underline">
                {{ previewData.city }}{{ previewData.county
                }}{{ dialogParams.actualAddress }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">勘察人员：</span>
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
              <span class="turn-dialog-label">被勘察人：</span>
              <span class="turn-dialog-underline">
                {{
                dialogParams.actualInterviewee
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">现场负责人：</span>
              <span class="turn-dialog-underline">
                {{
                dialogParams.siteLeader
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">邮编：</span>
              <span class="turn-dialog-underline">
                {{
                dialogParams.actualIntervieweePostcode
                }}
              </span>
              <span class="turn-dialog-label">手机号码：</span>
              <span class="turn-dialog-underline">
                {{
                dialogParams.actualIntervieweePhone
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">身份证号码：</span>
              <span class="turn-dialog-underline">
                {{
                dialogParams.actualIntervieweeIdcard
                }}
              </span>
              <span class="turn-dialog-label">年龄：</span>
              <span class="turn-dialog-underline">
                {{
                dialogParams.actualIntervieweeAge
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">工作单位：</span>
              <span class="turn-dialog-underline">
                {{
                dialogParams.actualIntervieweeUnit
                }}
              </span>
              <span class="turn-dialog-label">职务：</span>
              <span class="turn-dialog-underline">
                {{
                dialogParams.actualIntervieweePost
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">其他参与人员：</span>
              <span class="turn-dialog-underline">
                {{
                dialogParams.otherHander
                }}
              </span>
            </div>
            <div class="turn-dialog-line">
              <span class="turn-dialog-label">现场情况：</span>
              <span class="turn-dialog-underline">
                {{
                dialogParams.siteCondition
                }}
              </span>
            </div>
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
    dialogParams: {
      type: Object
    },
    inspectName: {
      type: String
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
</style>