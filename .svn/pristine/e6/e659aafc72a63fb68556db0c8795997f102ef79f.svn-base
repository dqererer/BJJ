<template>
  <div class="files-more" v-if="middleMoreShowBoolean">
    <div class="files-title">
      <h1 class="files-title-name">信访件列表</h1>
      <span class="files-title-close" @click="handleMiddleDialogClose"></span>
    </div>
    <div class="files-inner">
      <div class="files-search">
        <el-input
          class="search-input"
          v-model="queryParams.tipOffContent"
          :placeholder="placeholder"
          @focus="blurSearchFor"
          @blur="blurSear"
          @change="handleSearchChange"
        ></el-input>
        <span class="serach-icon" @click="handleSearchChange"></span>
      </div>
      <div class="files-hit">
        共
        <span class="files-hit-all">{{ totalCount }}</span>件
        <template v-if="searchBoolean">
          ,为您找到
          <span class="files-hit-num">{{ count }}</span>件
        </template>
      </div>
    </div>
    <div class="files-content" ref="scollElement" style="overflow:auto">
      <ul
        class="middle-ul"
        v-infinite-scroll="load"
        infinite-scroll-distance="20"
        infinite-scroll-delay="400"
      >
        <li
          class="middle-item"
          v-for="(item, index) in archiveList"
          :key="index"
          @click="handleMiddleItemClick(item)"
        >
          <div class="middle-item-top">
            <i>{{ item.tipTime }}</i>
            <i>{{ item.cityReviewName }}</i>
          </div>
          <div class="middle-item-bottom">
            <p>{{ item.tipOffContent }}</p>
          </div>
          <span class="middle-allow"></span>
        </li>
      </ul>
      <p v-if="noMore" class="no-more-text">没有更多了</p>
    </div>
    <i class="ctop-border ctop-left-top"></i>
    <i class="ctop-border ctop-right-top"></i>
  </div>
</template>

<script>
import { bigMiddleDetailPage } from "@/api/bigScreen";
import { imgShow } from "@/utils/imgShow";
import Bus from "@/utils/vueBus";
export default {
  props: {
    batchId: {
      type: String
    },
    cityData: {
      type: Object
    }
  },
  data() {
    return {
      placeholder: "请输入要查询的关键字",
      firstLoad: true,
      middleMoreShowBoolean: false,
      archiveList: [],
      totalCount: 0,
      count: 0,
      searchBoolean: false,
      queryParams: {
        state: undefined,
        tipOffContent: undefined,
        pageNo: 1,
        pageSize: 20
      },
      noMore: false
    };
  },
  created() {
    Bus.$off("middleDetail");
  },
  mounted() {
    Bus.$on("middleDetail", state => {
      if (state === "close") {
        this.middleMoreShowBoolean = false;
      } else if (state === "null") {
        this.searchBoolean = false;
        this.queryParams.state = "2,5,6,7,8,9";
        this.middleMoreShowBoolean = true;
        this.$nextTick(() => {
          this.getBigMiddleDetailPage();
        });
      } else {
        this.queryParams.pageNo = 1;
        if (this.middleMoreShowBoolean == false) {
          this.middleMoreShowBoolean = true;
        }
        this.queryParams.state = state;
        this.searchBoolean = true;
        this.$nextTick(() => {
          this.getBigMiddleDetailPage();
        });
      }
      this.$nextTick(() => {
        if (this.$refs.scollElement) {
          this.$refs.scollElement.scrollTop = 0;
        }
      });
    });
  },
  methods: {
    blurSearchFor: function() {
      this.placeholder = "";
    },
    blurSear() {
      this.placeholder = "请输入要查询的关键字";
    },
    handleMiddleItemClick(item) {
      const { id } = item;
      Bus.$emit("middleLetter", id);
    },
    handleMiddleDialogClose() {
      this.middleMoreShowBoolean = false;
      this.queryParams.tipOffContent = undefined;
    },
    handleSearchChange() {
      if (
        this.queryParams.tipOffContent == "" ||
        this.queryParams.tipOffContent == undefined
      ) {
        this.searchBoolean = false;
      } else {
        this.searchBoolean = true;
      }
      this.queryParams.pageNo = 1;
      this.getBigMiddleDetailPage();
    },
    load() {
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
        this.getBigMiddleDetailPage();
      }
    },
    async getBigMiddleDetailPage() {
      const loading = this.$loading({
        lock: true,
        text: "正在加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)"
      });
      const archiveList = [];
      const reponse = await bigMiddleDetailPage({
        ...this.queryParams,
        batchId: this.batchId,
        cityCode: this.cityData.code
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
            tipTime: subject.tipTime,
            tipOffContent: subject.tipOffContent,
            cityReviewName: subject.cityReviewName
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
    }
  }
};
</script>

<style lang="scss" scoped>
.files-more {
  position: absolute;
  width: 20%;
  right: 1.5%;
  top: 98px;
  background-color: #082561;
  padding: 10px 0;
  border-radius: 6px;
  border: 1px solid #135074;
  box-sizing: border-box;
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
          background: url("~@/assets/images/search-igm.png") no-repeat 94%
            center #091140;
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
    height: calc(100vh - 224px);
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
      i {
        font-size: 14px;
        color: #bac3c4;
        font-style: normal;
        margin-right: 10px;
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
</style>