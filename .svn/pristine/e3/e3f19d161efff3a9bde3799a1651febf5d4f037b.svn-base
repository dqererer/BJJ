<template>
  <div class="pollution">
    <ComTitle :text="text" />
    <div class="card fitler">
      <div class="row">
        <CheckListGroup
          :completeArr="resourceList"
          type="roundIds"
          title="对接批次"
          @handleCheckChange="handleCheckChange"
        />
      </div>
      <div class="row">
        <CheckListGroup
          :completeArr="executionList"
          type="tipStates"
          title="完成情况"
          @handleCheckChange="handleCheckChange"
        />
      </div>
    </div>
    <div class="card content">
      <div class="data-info">
        <div id="bar"></div>
        <div class="table">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="" width="180">
            </el-table-column>
            <el-table-column
              :render-header="setTableHeader"
              :prop="item.code"
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
        <el-table-column prop="name" label="" width="180"> </el-table-column>
        <el-table-column
          :prop="item.name"
          :label="item.name"
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
  getDCPolllutionBarData,
  getDCPolllutionTableData,
  getDcPolllutionTableDetail,
  getRoundList,
  getTipStateDict,
} from "@/api/support/analyse";
import { dictListType } from "@/api/styem/dict/type";
import * as echarts from "echarts";
require("echarts/theme/macarons"); //引入主题
const BLZ = "办理中";
const JR = "接入";
const WBL = "未办理";
const YBJ = "已办结";
const barDataInit = function () {
  return {
    xData: [],
    yData1: [],
    yData2: [],
    yData3: [],
    yData4: [],
  };
};
export default {
  name: "RegionalDistribution",
  data() {
    return {
      text: "污染类型统计",
      resourceList: [],
      executionList: [],
      barCharts: null,
      barData: barDataInit(),
      queryParams: {
        tipStates: "",
        roundIds: "",
        inspectType: "C",
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
    this.getDCPolllutionBarData();
    this.getDCPolllutionTableData();
    dictListType({
      type: "clue_pollution_type",
    }).then((res) => {
      this.pollutionList = res.data;
    });
    getTipStateDict({
      inspectType: "C",
    }).then((res) => {
      let arr = res.data.map((item) => {
        return {
          value: item.value,
          label: item.name,
        };
      });
      this.executionList = arr;
    });
    getRoundList({
      type: "C",
    }).then((res) => {
      let arr = res.data.map((item) => {
        return {
          value: item.roundId,
          label: item.roundName,
        };
      });
      this.resourceList = arr;
    });
  },
  methods: {
    setTableHeader: function (h, { column }) {
      let _this = this;
      let label = column.label;
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
                _this.getDcPolllutionTableDetail(id, column.label);
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
      this.getDCPolllutionBarData();
      this.getDCPolllutionTableData();
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
        legend: {
          orient: "horizontal",
          left: "center",
          top: "bottom",
        },
        series: [
          {
            name: JR,
            type: "bar",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            data: this.barData.yData1,
          },
          {
            name: WBL,
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.barData.yData2,
          },
          {
            name: BLZ,
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.barData.yData3,
          },
          {
            name: YBJ,
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: this.barData.yData4,
          },
        ],
        color: [
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
          "#fc8452",
          "#9a60b4",
          "#ea7ccc",
        ],
      });
    },
    getDCPolllutionBarData: function () {
      getDCPolllutionBarData(this.queryParams).then((res) => {
        this.barData = barDataInit();
        res.data &&
          res.data.data &&
          res.data.data.forEach((item) => {
            this.barData.xData.push(item.pollutionName);
            this.barData.yData1.push(item[JR]);
            this.barData.yData2.push(item[WBL]);
            this.barData.yData3.push(item[BLZ]);
            this.barData.yData4.push(item[YBJ]);
          });
        console.log("after", this.barData);
        this.$nextTick(() => {
          this.drawBar();
        });
      });
    },
    getDCPolllutionTableData: function () {
      getDCPolllutionTableData(this.queryParams).then((res) => {
        this.tableData = res.data.data;
        this.tableHeader = res.data.tableHeader;
      });
    },
    getDcPolllutionTableDetail: function (id, name) {
      getDcPolllutionTableDetail({
        ...this.queryParams,
        pollutions: id,
      }).then((res) => {
        this.subTitel = name + " - 完成情况";
        this.detailTableData = res.data.data;
        this.detailTableHeader = res.data.tableHeader;
        console.log(this.detailTableData, this.detailTableHeader);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pollution {
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
</style>


