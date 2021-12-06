<template>
  <div class="middle-map" v-if="mapBoolean" id="map">
    <span class="content-center-address">{{ cityData.name }}</span>
    <div class="middle-back-map" @click="handleMapBack">
      <span style="color:white; font-size:24px">返回本批次</span>
    </div>
    <div class="content-center-show middle-map-import">
      <span class="show-text">重点关注件数</span>
      <span class="show-number">{{ middleNum.keyTipNum }}</span>
    </div>
    <div class="content-center-show middle-map-number">
      <span class="show-text">抽查件数</span>
      <span class="show-number">{{ middleNum.spotTipNum }}</span>
    </div>
    <div class="middle-legend">
      <el-checkbox-group
        class="middle-legend-group"
        @change="handleMiddleLegendChange"
        v-model="state"
      >
        <el-checkbox label="2" checked class="middle-legend-noAccept" @change="mapChange(2)">不受理</el-checkbox>
        <el-checkbox label="3" checked class="middle-legend-did" @change="mapChange(3)">不转办</el-checkbox>
        <el-checkbox label="5,6" checked class="middle-legend-deal" @change="mapChange('5,6')">未办理</el-checkbox>
        <el-checkbox label="7" checked class="middle-legend-phase" @change="mapChange(7)">未办结</el-checkbox>
        <el-checkbox label="8" checked class="middle-legend-been" @change="mapChange(8)">阶段办结</el-checkbox>
        <el-checkbox label="9" checked class="middle-legend-done" @change="mapChange(9)">已办结</el-checkbox>
      </el-checkbox-group>
      <span class="middle-legend-btn" @click="handleMiddleDetailClick">详细</span>
    </div>
  </div>
</template>

<script>
import { bigMiddleDataPoint, bigMiddleDetailData } from "@/api/bigScreen";
import Bus from "@/utils/vueBus";
import { module } from "@/utils/map";
export default {
  props: {
    batchId: {
      type: String
    },
    cityData: {
      type: Object
    },
    mapBoolean: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      middleNum: {
        keyTipNum: undefined,
        spotTipNum: undefined
      },
      state: []
    };
  },
  methods: {
    async getMiddleDataPoint() {
      const reponse = await bigMiddleDataPoint({
        cityCode: this.cityData.code,
        batchId: this.batchId
      });
    },
    async getMiddleDetailData() {
      const reponse = await bigMiddleDetailData({
        cityCode: this.cityData.code,
        batchId: this.batchId
      });
      this.middleNum = reponse.data;
    },
    handleMiddleLegendChange() {
      console.log(this.state);
      const state = this.state.join(",");
      Bus.$emit("middleDetail", state);
    },
    handleMapBack() {
      this.state = [];
      this.$emit("handleBigMapClose");
      Bus.$emit("middleDetail", "close");
    },
    handleMiddleDetailClick() {
      let state;
      if (this.state.length == 0) {
        state = "null";
      } else {
        state = this.state.join(",");
      }
      Bus.$emit("middleDetail", state);
    },
    mapChange(index) {
      module.editPointLayer(index, event.target.checked);
    }
  }
};
</script>

<style lang="scss" scoped>
.middle-map {
  margin-top: 10px;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #082561;
  z-index: 99999;
}
.content-center-address {
  position: absolute;
  display: block;
  height: 23px;
  line-height: 23px;
  font-size: 16px;
  color: #0feef2;
  padding-left: 30px;
  font-family: Georgia, "Times New Roman", Times, serif;
  background: url("~@/assets/images/styem-address.png") no-repeat left center;
  left: 2%;
  top: 10px;
  z-index: 99999;
}
.middle-back-map {
  position: absolute;
  right: 2%;
  top: 10px;
  width: 160px;
  height: 92px;
  border: 1px solid #124d70;
  cursor: pointer;
  background: url("~@/assets/images/styem-small-map.png") no-repeat center
    center;
  background-size: cover;
  z-index: 99999;
  padding: 26px 0 0 20px;
}
.content-center-show {
  position: absolute;
  right: 2%;
  width: 130px;
  height: 62px;
  background: url("~@/assets/images/styem-show-bg.png") no-repeat left center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2%;
  box-sizing: border-box;
  z-index: 99999;
  &.middle-map-import {
    top: 114px;
  }
  &.middle-map-number {
    top: 190px;
  }
  .show-text {
    font-size: 14px;
    color: #fff;
    display: block;
  }
  .show-number {
    font-size: 16px;
    color: #0feef2;
    display: block;
    margin-top: 12px;
  }
}
.middle-legend {
  position: absolute;
  right: 1%;
  bottom: 40px;
  width: 146px;
  height: 238px;
  border: 1px solid #124d70;
  background-color: #0b3b70;
  z-index: 9999;
  .middle-legend-group {
    display: flex;
    flex-direction: column;
    padding: 6px 0 0 28px;
    /deep/.el-checkbox {
      margin-top: 10px;
      .el-checkbox__input {
        .el-checkbox__inner {
          background: none;
          border: 1px solid #0e8583;
        }
      }
      .el-checkbox__label {
        color: #fff;
        padding-left: 26px;
      }
      &.middle-legend-noAccept {
        .el-checkbox__label {
          background: url("~@/assets/images/legend-stat1.png") no-repeat 10px
            center;
        }
      }
      &.middle-legend-did {
        .el-checkbox__label {
          background: url("~@/assets/images/legend-stat2.png") no-repeat 10px
            center;
        }
      }
      &.middle-legend-deal {
        .el-checkbox__label {
          background: url("~@/assets/images/legend-stat3.png") no-repeat 10px
            center;
        }
      }
      &.middle-legend-phase {
        .el-checkbox__label {
          background: url("~@/assets/images/legend-stat4.png") no-repeat 10px
            center;
        }
      }
      &.middle-legend-been {
        .el-checkbox__label {
          background: url("~@/assets/images/legend-stat5.png") no-repeat 10px
            center;
        }
      }
      &.middle-legend-done {
        .el-checkbox__label {
          background: url("~@/assets/images/legend-stat6.png") no-repeat 10px
            center;
        }
      }
    }
  }
  .middle-legend-btn {
    display: inline-block;
    width: 82px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #3ae6d2;
    font-size: 14px;
    border: 1px solid #0e8583;
    background-color: rgba(53, 255, 201, 0.1);
    margin-left: 28px;
    margin-top: 10px;
    cursor: pointer;
  }
}
.burg-pop {
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
      .line-name {
        font-size: 14px;
        color: #23fffc;
        font-style: normal;
      }
      .line-text {
        font-size: 14px;
        color: #fff;
        font-weight: normal;
      }
    }
  }
}
@media screen and (min-width: 1700px) {
  .content-center-show {
    right: 2%;
    width: 186px;
    height: 82px;
    &.middle-map-import {
      top: 114px;
    }
    &.middle-map-number {
      top: 210px;
    }
    .show-text {
      font-size: 16px;
    }
    .show-number {
      font-size: 20px;
      margin-top: 12px;
    }
  }
}
</style>
