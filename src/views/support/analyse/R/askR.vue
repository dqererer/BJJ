<template>
  <div class="ask">
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
          :completeArr="cityList"
          type="cityCodes"
          title="地区"
          @handleCheckChange="handleCheckChange"
        />
      </div>
    </div>
    <div class="card content">
      <div class="chart">
        <div id="bar"></div>
        <div class="pie-list">
          <div id="circleChart1"></div>
          <div id="circleChart2"></div>
        </div>
      </div>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            :prop="item"
            :label="item"
            width="180"
            v-for="(item, index) in tableHeader"
            v-bind:key="index"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import ComTitle from "../title";
import CheckListGroup from "../checkListGroup.vue";
import {
  getDCWZBarData,
  getDCWZPieData,
  getDCWZTableData,
  getRoundList,
  getAreaList,
} from "@/api/support/analyse";
import * as echarts from "echarts";
require("echarts/theme/macarons"); //引入主题
const barDataInit = function () {
  return {
    xData: [],
    yData: [],
  };
};
export default {
  name: "RegionalDistribution",
  data() {
    return {
      total: 0,
      text: "问责情况统计",
      resourceList: [],
      cityList: [],
      barCharts: null,
      barData: barDataInit(),
      queryParams: {
        roundIds: "",
        cityCodes: "",
        inspectType: "R",
      },
      tableData: [],
      tableHeader: [],
    };
  },
  components: {
    ComTitle,
    CheckListGroup,
  },
  created() {
    getRoundList({
        type: 'R'
      }).then((res) => {
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
    this.search();
  },
  methods: {
    search: function () {
      this.getDCWZBarData();
      this.getDCWZTableData();
      this.getDCWZPieData("1");
      this.getDCWZPieData("2");
    },

    handleDialogClose: function () {
      this.open = false;
    },
    handleCheckChange: function (type, checkList) {
      this.queryParams[type] = checkList;
      this.search();
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
          orient: "vertical",
          left: "center",
          top: "bottom",
        },
        series: [
          {
            name: "问责人数",
            type: "bar",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            data: this.barData.yData,
          },
        ],
      });
    },
    getDCWZBarData: function () {
      getDCWZBarData(this.queryParams).then((res) => {
        this.barData = barDataInit();
        res.data && res.data.data && res.data.data.forEach((item) => {
          this.barData.xData.push(item.cityName);
          this.barData.yData.push(item.num);
        });
        this.$nextTick(() => {
          this.drawBar();
        });
      });
    },
    getDCWZTableData: function () {
      getDCWZTableData(this.queryParams).then((res) => {
        this.tableData = res.data.data;
        this.tableHeader = res.data.header;
      });
    },
    getDCWZPieData: function (type) {
      getDCWZPieData({ ...this.queryParams, type }).then((res) => {
        let total = 0;
        let pieData = res.data && res.data.map((item) => {
          total += item.num;
          return {
            name: item.name,
            value: item.num,
          };
        });
        this.total = total;
        let id = type == "1" ? "circleChart1" : "circleChart2";
        this.drawPieChart(id, pieData, type);
      });
    },
    drawPieChart(id, arr, type) {
      this.circleCharts = echarts.init(
        document.getElementById(id),
        "macarons",
        {
          width: 400,
          height: 240,
        }
      );
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
          top: "middle",
        },
        series: [
          {
            type: "pie",
            data: arr,
            label: {
              position: "inner",
              fontSize: 10,
            },
            tooltip: {
              trigger: "item",
              formatter: "{b} : {c}人 ({d}%)",
            },
            labelLine: {
              show: false,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      if (type == "1") {
        option.graphic = [
          {
            type: "text",
            left: "center",
            top: "45%",
            style: {
              text: "共" + this.total + "人",
              textAlign: "center",
              fill: "gray",
              width: 30,
              height: 30,
              fontSize: 14,
            },
          },
        ];
        option.series[0].radius = ["40%", "70%"];
      }
      this.circleCharts.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.ask {
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
    .chart {
      display: flex;
      #bar {
        flex: 1;
        height: 460px;
      }
      .pie-list {
        width: 500px;
        #circleChart1,
        #circleChart2 {
          height: 230px;
        }
      }
    }

    .table {
      padding: 20px;
    }
  }
}
</style>


