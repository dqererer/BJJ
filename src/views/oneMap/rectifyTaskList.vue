<template>
  <div>
    <div class="files-more">
      <div class="files-title">
        <h1 class="files-title-name">整改任务列表</h1>
      </div>
      <div class="files-inner">
        <div class="files-search">
          <el-input
            class="search-input"
            v-model="queryParams.rectifyContent"
            :placeholder="placeholder"
            @focus="blurSearchFor"
            @blur="blurSear"
            @change="handleSearchChange"
          ></el-input>
          <span class="serach-icon" @click="handleSearchChange"></span>
        </div>
        <div class="files-hit">
          共
          <span class="files-hit-all">{{ totalCount }}</span
          >件
          <template v-if="searchBoolean">
            ,为您找到
            <span class="files-hit-num">{{ count }}</span
            >件
          </template>
        </div>
      </div>
      <div class="files-content" style="overflow: auto">
        <ul
          class="middle-ul"
          v-infinite-scroll="load"
          infinite-scroll-distance="0"
          infinite-scroll-delay="400"
        >
          <li
            class="middle-item"
            v-for="(item, index) in archiveList"
            :key="index"
            @click="handleSee(item.id)"
          >
            <div class="middle-item-top">
              <i>{{ item.updateDate }}</i>
              <i>{{ item.writeCity }}</i>
            </div>
            <div class="middle-item-bottom">
              <p>{{ item.rectifyContent }}</p>
            </div>
            <span class="middle-allow"></span>
          </li>
        </ul>
        <p v-if="noMore" class="no-more-text">没有更多了</p>
      </div>

      <i class="ctop-border ctop-left-top"></i>
      <i class="ctop-border ctop-right-top"></i>
    </div>
    <el-dialog
      title="查看"
      v-if="check"
      :visible="true"
      width="100%"
      :before-close="handleDialogCheckClose"
      append-to-body
    >
      <Programer :id="taskid" />
    </el-dialog>
  </div>
</template>

<script>
import { findRectifyMainPage, rectifyInfoById } from "@/api/bigScreen";
import { dictListType } from "@/api/styem/dict/type";
import { getProgressList } from "@/api/change/dispatch";
import { getFileInfo } from "@/api/file";
import Bus from "@/utils/vueBus";
import Programer from "@/views/support/search/component/programer.vue";
const initMeasureDTOList = {
  measure: "",
  finishState: "",
  filler: "",
  fillerName: "",
  title: "措施1",
  name: "0",
  content: "Tab 1 content",
  progressDTOList: [],
};
const initRectifyVerify = {
  verfityTime: "",
  verifier: "",
  verifiername: "",
  verfitySuggestion: "",
  verfityContent: "",
  verfitySituation: "",
};
const initData = {
  levelType: undefined,
  levelTypeName: "",
  inspectType: undefined,
  inspectTypeName: "",
  roundName: "",
  roundId: "",
  batchId: undefined,
  batchName: "",
  planId: undefined,
  planName: "",
  writeCityCode: "",
  writeCity: "",
  rectifyContent: "",
  rectifyTarget: "",
  leadUnit: "", //牵头单位
  leadUnitName: "",
  supervisionUnit: "", //督导单位
  supervisionUnitName: "",
  responsibleUnit: "", //责任单位
  responsibleUnitName: "",
  taskTypeOne: [],
  taskTypeOne: "",
  taskTypeOneName: "",
  taskTypeTwo: [],
  taskTypeTwoName: [],
  finishSituation: "",
  finishSituationName: "",
  deadline: "",
  isKeyTask: "",
  isKeyTaskName: "",
  measureDTOList: [{ ...initMeasureDTOList }],
  rectifyVerify: { ...initRectifyVerify },
  taskCityCode: "",
  taskCityName: "",
  taskCountyCode: "",
  taskCountyName: "",
  taskAddress: "",
};
export default {
  props: {
    writeCityCode: {
      type: String,
    },
    finishSituation: {
      type: String,
    },
    inspectType: {
      type: String,
    },
  },
  data() {
    return {
      taskid: "",
      placeholder: "请输入要查询的关键字",
      taskText: "",
      firstLoad: true,
      archiveList: [],
      totalCount: 0,
      count: 0,
      searchBoolean: false,
      queryParams: {
        rectifyContent: undefined,
        pageNo: 1,
        pageSize: 20,
      },
      noMore: false,
      check: false,
      dialogParams: { ...initData },
      isHandleChange: false,
      sortNameArry: [
        "otherWater",
        "otherAir",
        "otherSoil",
        "otherOcean",
        "otherEcology",
        "otherRadiation",
        "otherNoise",
        "other",
      ],
      editableTabsValue: "0",
    };
  },
  created() {
    Bus.$off("middleDetail");
    this.getfinishSituationList();
  },
  components: {
    Programer,
  },
  watch: {
    writeCityCode() {
      this.noMore = false;
      this.queryParams.pageNo = 1;
      this.getfindRectifyMainPage();
    },
    inspectType() {
      this.noMore = false;
      this.queryParams.pageNo = 1;
      this.getfindRectifyMainPage();
    },
    finishSituation() {
      this.noMore = false;
      this.queryParams.pageNo = 1;
      this.getfindRectifyMainPage();
    },
    "dialogParams.finishSituation": {
      immediate: false,
      deep: true,
      handler: function (newV, oldV) {
        if (!this.isHandleChange) {
          return;
        }
        if (newV == "1") {
          let isAllFinished = true;
          this.dialogParams.measureDTOList.forEach((item) => {
            if (item.finishState != "1") {
              isAllFinished = false;
            }
          });
          if (!isAllFinished) {
            this.$alert("还有未完成的措施，请先完成所有措施", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$set(this.dialogParams, "finishSituation", oldV);
                this.isHandleChange = false;
              },
            });
          }
        }
      },
    },
  },
  methods: {
    blurSearchFor: function () {
      this.placeholder = "";
    },
    blurSear() {
      this.placeholder = "请输入要查询的关键字";
    },
    changeStatus: function () {
      this.isHandleChange = true;
    },
    handleSee(id) {
      this.taskid = id;
      this.check = true;
    },
    getfinishSituationList: function () {
      dictListType({
        type: "execution",
      }).then((res) => {
        this.finishSituationArry = res.data;
      });
    },
    handleDialogCheckClose() {
      this.check = false;
    },
    handleSearchChange() {
      if (
        this.queryParams.rectifyContent == "" ||
        this.queryParams.rectifyContent == undefined
      ) {
        this.searchBoolean = false;
      } else {
        this.searchBoolean = true;
      }
      this.queryParams.pageNo = 1;
      this.getfindRectifyMainPage();
    },
    load() {
      console.log(1111111);
      const count = this.searchBoolean ? this.count : this.totalCount;
      const pageNo = this.queryParams.pageNo;
      const pageCount = Math.ceil(count / 20);
      if (pageCount <= pageNo) {
        this.noMore = true;
        return;
      } else {
        if (this.firstLoad) {
          this.firstLoad = false;
        } else {
          this.queryParams.pageNo += 1;
        }
        this.noMore = false;
        this.getfindRectifyMainPage();
      }
    },
    async getfindRectifyMainPage() {
      const loading = this.$loading({
        lock: true,
        text: "正在加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)",
      });
      const archiveList = [];
      const reponse = await findRectifyMainPage({
        ...this.queryParams,
        writeCityCode: this.writeCityCode,
        finishSituation: this.finishSituation,
        inspectType: this.inspectType,
      });
      loading.close();
      this.totalCount = reponse.data.totalCount;
      this.count = reponse.data.page.count;
      const findArchiveData = reponse.data.page.list;
      if (findArchiveData) {
        for (const item in findArchiveData) {
          const subject = findArchiveData[item];
          const temp = {
            id: subject.id,
            updateDate: subject.updateDate,
            rectifyContent: subject.rectifyContent,
            writeCity: subject.writeCity,
          };
          archiveList.push(temp);
        }
      } else {
        this.archiveList = [];
        this.noMore = true;
      }
      if (this.queryParams.pageNo == 1) {
        this.archiveList = archiveList;
      } else {
        this.archiveList = this.archiveList.concat(archiveList);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.files-more {
  width: 100%;
  background-color: #082561;
  padding: 10px 0;
  border-radius: 6px;
  border: 1px solid #135074;
  box-sizing: border-box;
  position: relative;
  .files-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3.5%; //5.4%
    .files-title-name {
      font-size: 16px;
      font-family: Georgia, "Times New Roman", Times, serif;
      color: #0feef2;
      font-weight: normal;
      margin: 0;
    }
    .files-title-close {
      width: 13px;
      height: 13px;
      background: url("~@/assets/images/close-icon.png") no-repeat center center;
      cursor: pointer;
    }
  }
  .files-inner {
    padding: 0 5.4%;
    box-sizing: border-box;
    .files-search {
      margin-top: 10px;
      position: relative;
      .search-input {
        /deep/.el-input__inner {
          width: 100%;
          height: 32px;
          border: 1px solid #0e8583;
          border-radius: 25px;
          background-color: #091140;
          font-size: 14px;
          color: #fff;
        }
      }
      .serach-icon {
        width: 18px;
        height: 18px;
        display: block;
        background: url("~@/assets/images/search-igm.png") no-repeat center
          center;
        position: absolute;
        right: 6%;
        top: 6px;
        cursor: pointer;
      }
    }
    .files-hit {
      padding: 8px 0 8px 16px;
      background: url("~@/assets/images/dot-icon.png") no-repeat 6px center;
      font-size: 12px;
      color: #bac3c4;
      border-bottom: 1px solid #135074;
      .files-hit-all {
        color: #e8dc23;
      }
      .files-hit-num {
        color: #10cbd3;
      }
    }
  }
  .files-content {
    height: calc(100vh - 258px);
    overflow: hidden;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
      scrollbar-arrow-color: red;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
      scrollbar-arrow-color: red;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
    ul {
      padding: 0 5.4%;
    }
  }
  .ctop-border {
    width: 19px;
    height: 21px;
    display: block;
    position: absolute;
    &.ctop-left-top {
      left: -3px;
      top: -3px;
      background: url("~@/assets/images/ctop-left-top.png") no-repeat center
        center;
    }
    &.ctop-right-top {
      right: -3px;
      top: -3px;
      background: url("~@/assets/images/ctop-left-right.png") no-repeat center
        center;
    }
  }
}
.middle-ul {
  margin: 0;
  .middle-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    border: 1px solid #304876;
    padding: 0 6% 0 6%;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    .middle-allow {
      width: 12px;
      height: 15px;
      position: absolute;
      left: -11px;
      top: 12px;
      background: url("~@/assets/images/allow-icon.png") no-repeat center center;
    }
    .middle-item-top {
      width: 100%;
      display: flex;
      margin-top: 10px;
      align-items: center;
      i {
        font-size: 13px;
        color: #bac3c4;
        font-style: normal;
        margin-right: 10px;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
    .middle-item-bottom {
      width: 100%;
      p {
        font-size: 14px;
        color: #ffffff;
        margin: 0;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
    }
  }
}
.no-more-text {
  color: #fff;
  text-align: center;
  margin: 0;
  font-size: 14px;
  margin-top: 10px;
}
/deep/ .el-dialog {
  margin-top: 0 !important;
}
</style>