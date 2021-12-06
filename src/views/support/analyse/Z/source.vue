<template>
  <div class="source">
    <ComTitle :text="text" />
    <div class="card fitler">
      <div class="row">
        <CheckListGroup
          :completeArr="resourceList"
          type="roundIds"
          title = '问题来源'
          @handleCheckChange="handleCheckChange"
        />
      </div>
      <div class="row">
        <CheckListGroup
          :completeArr="pollutionList"
          type="pollutes"
          title = '污染类型'
          @handleCheckChange="handleCheckChange"
        />
      </div>
      <div class="row">
        <CheckListGroup
          :completeArr="cityList"
          type="cityCodes"
          title = '地区'
          @handleCheckChange="handleCheckChange"
        />
      </div>
    </div>
    <div class="card content">
      <div class="data-info">
        <div id="bar"></div>
        <div class="table">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="cityName" label="" width="180">
            </el-table-column>
            <el-table-column
              :render-header="setTableHeader"
              :prop="item.name"
              :label="item.name"
              width="180"
              v-for="(item, index) in tableHeader"
              v-bind:key="index"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog
      :title="subTitel"
      :visible="true"
      v-if="open"
      width="80%"
      :before-close="handleDialogClose"
      append-to-body
    >
      <el-table :data="detailTableData" border style="width: 100%">
        <el-table-column prop="cityName" label="" width="180">
        </el-table-column>
        <el-table-column
          :prop="item"
          :label="item"
          width="180"
          v-for="(item, index) in detailTableHeader"
          v-bind:key="index"
        >
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import ComTitle from "../title";
import CheckListGroup from "../checkListGroup.vue";
import {
  getPolluteBarData,
  getPolluteTableData,
  getPolluteTableDataByPoByPolluteType,
  getRoundList,
  getAreaList,
} from "@/api/support/analyse";
import { dictListType } from "@/api/styem/dict/type";
import * as echarts from "echarts";
require("echarts/theme/macarons"); //引入主题
const SWQD = "尚未启动";
const YWC = "已完成";
const YXH = "已销号";
const WDJD = "未达序时进度";
const CQ = "超期未完成";
const DDJD = "达到序时进度";
const barDataInit = function () {
  return {
    xData: [],
    yData1: [],
    yData2: [],
    yData3: [],
    yData4: [],
    yData5: [],
    yData6: [],
  };
};
export default {
  name: "RegionalDistribution",
  data() {
    return {
      text: "办理情况统计",
      resourceList: [],
      cityList: [],
      pollutionList: [],
      barCharts: null,
      barData: {
        xData: [],
        yData1: [],
        yData2: [],
        yData3: [],
        yData4: [],
        yData5: [],
        yData6: [],
      },
      queryParams: {
        pollutes:'',
        cityCodes: "",
        roundIds: "",
      },
      tableData: [],
      tableHeader: [],
      open: false,
      subTitel: "",
      detailTableData: [],
      detailTableHeader: [],
    };
  },
  computed: {},
  components: {
    ComTitle,
    CheckListGroup,
  },
  created() {
    this.getPolluteBarData();
    this.getPolluteTableData();
    dictListType({
      type: "clue_pollution_type",
    }).then((res) => {
      this.pollutionList = res.data;
    });
    getRoundList().then((res) => {
      let arr = res.data.map((item) => {
        return {
          value: item.roundId,
          label: item.roundName,
        };
      });
      this.resourceList = arr;
    });
    getAreaList().then((res) => {
      let arr = res.data.map((item) => {
        return {
          value: item.code,
          label: item.name,
        };
      });
      this.cityList = arr;
    });
  },
  methods: {
    setTableHeader: function (h, { column }) {
      let _this = this;
      let label = column.property;
      let id = 0;
      this.tableHeader.some((item) => {
        if (item.name == label) {
          id = item.code;
        }
      });
      return h("span", {}, [
        h(
          "span",
          {
            on: {
              click: function () {
                _this.getPolluteTableDataByPoByPolluteType(id);
                _this.open = true;
              },
            },
          },
          column.label
        ),
      ]);
    },
    handleDialogClose: function () {
      this.open = false;
    },
    handleCheckChange: function (type, checkList) {
      this.queryParams[type] = checkList;
      this.getPolluteBarData();
      this.getPolluteTableData();
    },
    drawBar: function () {
      this.barCharts = echarts.init(document.getElementById("bar"), "macarons");
      this.barCharts.clear();
      this.barCharts.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: this.barData.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: SWQD,
            type: "bar",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            data: this.barData.yData1,
          },
          {
            name: YWC,
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.barData.yData2,
          },
          {
            name: YXH,
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.barData.yData3,
          },
          {
            name: WDJD,
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.barData.yData4,
          },
          {
            name: CQ,
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.barData.yData5,
          },
          {
            name: DDJD,
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.barData.yData6,
          },
        ],
      });
    },
    getPolluteBarData: function () {
      getPolluteBarData(this.queryParams).then((res) => {
        this.barData = barDataInit();
        res.data && res.data.data && res.data.data.forEach((item) => {
          this.barData.xData.push(item.polluteType);
          this.barData.yData1.push(item[SWQD]);
          this.barData.yData2.push(item[YWC]);
          this.barData.yData3.push(item[YXH]);
          this.barData.yData4.push(item[WDJD]);
          this.barData.yData5.push(item[CQ]);
          this.barData.yData6.push(item[DDJD]);
        });
        this.$nextTick(() => {
          this.drawBar();
        });
      });
    },
    getPolluteTableData: function () {
      getPolluteTableData(this.queryParams).then((res) => {
        this.tableData = res.data.data;
        this.tableHeader = res.data.tableHeader;
      });
    },
    getPolluteTableDataByPoByPolluteType: function (id) {
      getPolluteTableDataByPoByPolluteType({
        ...this.queryParams,
        polluteType: id,
      }).then((res) => {
        this.subTitel = res.data.tableHeader[0] + " - 完成情况";
        res.data.tableHeader.splice(0, 1);
        this.detailTableData = res.data.data;
        this.detailTableHeader = res.data.tableHeader;
        console.log(this.detailTableData, this.detailTableHeader);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.source {
  height: 100%;
  padding: 20px;
  .card {
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    .row {
      padding-bottom: 20px;
    }
  }
  .fitler {
    margin-bottom: 10px;
    padding: 20px;
  }
  .content {
    #bar {
      width: 100%;
      height: 400px;
    }
    .table {
      padding: 20px;
    }
  }
}
/deep/ .el-table thead{
  cursor: pointer;
}
</style>


