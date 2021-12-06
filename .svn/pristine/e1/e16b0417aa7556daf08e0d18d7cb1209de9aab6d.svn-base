<template>
  <div class="burg-pop" v-show="bugrPopBoolean">
    <span class="burg-pop-close" @click="handleBurgCloseClick"></span>
    <p class="burg-pop-line">
      <span class="pop-line-quare">
        <i class="line-name">轮次：</i>
        <b class="line-text">{{ manageInfo.inspectTurnName }}</b>
      </span>
      <span class="pop-line-quare">
        <i class="line-name">督察地区：</i>
        <b class="line-text">{{ manageInfo.inspectAreaName }}</b>
      </span>
    </p>
    <p class="burg-pop-line">
      <span class="pop-line-quare">
        <i class="line-name">举报编号：</i>
        <b class="line-text">{{ manageInfo.tipNumber }}</b>
      </span>
      <span class="pop-line-quare">
        <i class="line-name">举报类型：</i>
        <b class="line-text">{{ manageInfo.tipTypeName }}</b>
      </span>
    </p>
    <p class="burg-pop-line">
      <span class="pop-line-quare">
        <i class="line-name">举报人：</i>
        <b class="line-text">{{ manageInfo.tipBy }}</b>
      </span>
      <span class="pop-line-quare">
        <i class="line-name">举报时间：</i>
        <b class="line-text">{{ manageInfo.tipTime }}</b>
      </span>
    </p>
    <p class="burg-pop-line">
      <span class="pop-line-quare">
        <i class="line-name">来电显示号码：</i>
        <b class="line-text">{{ manageInfo.reporterPhoneShow }}</b>
      </span>
      <span class="pop-line-quare">
        <i class="line-name">行业类型：</i>
        <b class="line-text">{{ manageInfo.industryName }}</b>
      </span>
    </p>
    <p class="burg-pop-line">
      <span class="pop-line-quare">
        <i class="line-name">主要举报内容：</i>
        <b class="line-text">{{ manageInfo.tipOffContent }}</b>
      </span>
    </p>
    <p class="burg-pop-line">
      <span class="pop-line-quare">
        <i class="line-name">举报地址：</i>
        <b class="line-text">{{ manageInfo.tipAddress }}</b>
      </span>
    </p>
    <p class="burg-pop-line">
      <span class="pop-line-quare">
        <i class="line-name">经度：</i>
        <b class="line-text">{{ manageInfo.longitude }}</b>
      </span>
      <span class="pop-line-quare">
        <i class="line-name">纬度：</i>
        <b class="line-text">{{ manageInfo.latitude }}</b>
      </span>
    </p>
    <p class="burg-pop-line">
      <span class="pop-line-quare">
        <i class="line-name">污染类型：</i>
        <b class="line-text">{{ manageInfo.pollutionType }}</b>
      </span>
    </p>
    <p class="burg-pop-line" v-if="manageInfo.tipTypeName=='来信'">
      <span class="pop-line-quare">
        <i class="line-name">来信电子件：</i>
        <b class="line-text">
          <span
            style="cursor: pointer;"
            @click="handleKnowDownloadClick(item.id,item.save_path,item.file_name,item.object_id)"
            v-for="(item,index) in attachementArry"
            :key="index"
          >{{ item.file_name }}</span>
        </b>
      </span>
    </p>
    <p class="burg-pop-line">
      <span class="pop-line-quare">
        <i class="line-name">备注：</i>
        <b class="line-text">{{ manageInfo.remarks }}</b>
      </span>
    </p>
  </div>
</template>

<script>
import Bus from "@/utils/vueBus";
import { acceptSee } from "@/api/burg/garrison";
import { getKnownSingleInfo } from "@/utils/styem";
import { getFileInfo } from "@/api/file";
export default {
  name: "burgLetterPop",
  data() {
    return {
      bugrPopBoolean: false,
      manageInfo: {
        inspectTurnName: undefined,
        inspectAreaName: undefined,
        tipNumber: undefined,
        tipTypeName: undefined,
        tipBy: undefined,
        tipTime: undefined,
        reporterPhoneShow: undefined,
        industryName: undefined,
        tipOffContent: undefined,
        tipAddress: undefined,
        pollutionType: undefined,
        remarks: undefined,
        longitude: undefined,
        latitude: undefined
      },
      attachementArry: []
    };
  },
  created() {
    Bus.$off("middleLetter");
  },
  mounted() {
    Bus.$on("middleLetter", id => {
      this.bugrPopBoolean = true;
      this.$nextTick(() => {
        this.getRegisterFile(id);
      });
    });
  },
  methods: {
    handleBurgCloseClick() {
      this.bugrPopBoolean = false;
      this.handleClearFrom();
    },
    handleClearFrom() {
      this.manageInfo.inspectTurnName = undefined;
      this.manageInfo.inspectAreaName = undefined;
      this.manageInfo.tipNumber = undefined;
      this.manageInfo.tipTypeName = undefined;
      this.manageInfo.tipBy = undefined;
      this.manageInfo.tipTime = undefined;
      this.manageInfo.reporterPhoneShow = undefined;
      this.manageInfo.tipOffContent = undefined;
      this.manageInfo.remarks = undefined;
      this.manageInfo.tipAddress = undefined;
      this.manageInfo.pollutionType = undefined;
      this.manageInfo.industryName = undefined;
      this.manageInfo.longitude = undefined;
      this.manageInfo.latitude = undefined;
      this.manageInfo.attachementArry = undefined;
    },
    async getRegisterFile(id) {
      const reponse = await acceptSee({ id });
      const subject = reponse.data;
      this.manageInfo = subject;
      this.manageInfo.inspectTurnName = subject.inspectTurnName;
      this.manageInfo.inspectAreaName = subject.inspectAreaName;
      this.manageInfo.tipNumber = subject.tipNumber;
      this.manageInfo.tipTypeName = subject.tipTypeName;
      this.manageInfo.tipBy = subject.tipBy;
      this.manageInfo.tipTime = subject.tipTime;
      this.manageInfo.reporterPhoneShow = subject.reporterPhoneShow;
      this.manageInfo.tipOffContent = subject.tipOffContent;
      this.manageInfo.remarks = subject.remarks;
      this.manageInfo.tipAddress = subject.addressReview
        ? subject.cityReviewName +
          subject.countyRevireName +
          subject.addressReview
        : subject.cityName + subject.countyName + subject.address;
      this.manageInfo.pollutionType = subject.pollutionLevelOneReviewName
        ? subject.pollutionLevelOneReviewName
        : subject.pollutionType;
      this.manageInfo.industryName = subject.industryTypeReviewName
        ? subject.industryTypeReviewName
        : subject.industryName;
      this.manageInfo.longitude = subject.longitudeReview
        ? subject.longitudeReview
        : subject.longitude;
      this.manageInfo.latitude = subject.latitudeReview
        ? subject.latitudeReview
        : subject.latitude;
      subject.attachmentId && this.getSingleMessagInfo(subject.attachmentId);
    },
    async getSingleMessagInfo(fileId) {
      const reponse = await getFileInfo({ ids: fileId });
      this.attachementArry = reponse.data;
    },
    handleKnowDownloadClick(fileId, fileUrl, fileName, state) {
      getKnownSingleInfo(fileId, fileUrl, fileName, state);
    }
  }
};
</script>

<style lang="scss" scoped>
.burg-pop {
  .manage-title {
    font-size: 24px;
    color: #fff;
    font-weight: normal;
    margin: 0;
    margin-bottom: 6px;
  }
  width: 720px;
  height: 400px;
  border: 1px solid #23fffc;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 9999999999;
  background-color: #050b47;
  box-shadow: 1px 1px 10px rgba(35, 255, 252, 0.43);
  padding: 20px;
  .burg-pop-close {
    width: 24px;
    height: 24px;
    background: url("~@/assets/images/close-iconb.png") no-repeat center center;
    position: absolute;
    right: 10px;
    top: 10px;
    display: inline-block;
    cursor: pointer;
    background-size: cover;
  }
  .burg-pop-line {
    line-height: 36px;
    margin: 0;
    display: flex;
    .pop-line-quare {
      flex: 1;
      width: 100%;
      display: flex;
      overflow: hidden;
      .line-name {
        font-size: 14px;
        color: #23fffc;
        font-style: normal;
      }
      .line-text {
        font-size: 14px;
        color: #fff;
        font-weight: normal;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>