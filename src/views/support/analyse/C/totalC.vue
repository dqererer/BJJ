<template>
  <div class="total">
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
    </div>

    <div class="card">
      <div class="title">对接中央信访件信息</div>
      <div class="data-info">
        <div class="data-info-item">
          <p>
            <span class="text">接收央督信访件：</span>
            <span class="num">{{ info.jrNum | 1000 }}</span
            ><span class="unit">件</span>
          </p>
        </div>
        <div class="data-info-item">
          <p>
            <span class="text">未办理：</span>
            <span class="num">{{ info.wblnum | 1000 }}</span
            ><span class="unit">件</span><span> | </span
            ><span class="num">{{ info.wblpercen }}%</span>
          </p>
        </div>
        <div class="data-info-item">
          <p>
            <span class="text">办理中：</span>
            <span class="num">{{ info.blzNum | 1000 }}</span
            ><span class="unit">件</span><span> | </span
            ><span class="num">{{ info.blzpercen }}%</span>
          </p>
        </div>
        <div class="data-info-item">
          <p>
            <span class="text">已办结：</span>
            <span class="num">{{ info.ybjNum | 1000 }}</span
            ><span class="unit">件</span><span> | </span
            ><span class="num">{{ info.ybjpercen }}%</span>
          </p>
        </div>
      </div>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%" show-summary>
          <el-table-column prop="cityName" label="地区" width="160">
          </el-table-column>
          <el-table-column prop="办理数量" label="办理数量" width="130">
          </el-table-column>
          <el-table-column label="已办结（件）" width="130">
            <el-table-column prop="已办结属实" label="属实" width="130">
            </el-table-column>
            <el-table-column prop="已办结不属实" label="不属实" width="130">
            </el-table-column>
            <el-table-column prop="已办结合计" label="合计" width="130">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="责令整改" label="责令整改（家）" width="130">
          </el-table-column>
          <el-table-column prop="立案处罚" label="立案处罚（家）" width="130">
          </el-table-column>
          <el-table-column prop="罚款金额" label="罚款金额（万元）" width="130">
          </el-table-column>
          <el-table-column prop="立案侦查" label="立案侦查（件）" width="130">
          </el-table-column>
          <el-table-column label="拘留（人）">
            <el-table-column prop="拘留行政" label="行政" width="130">
            </el-table-column>
            <el-table-column prop="拘留刑事" label="刑事" width="130">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="约谈" label="约谈（人）" width="130">
          </el-table-column>
          <el-table-column prop="问责" label="问责（人）" width="130">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="card">
      <div class="title">各污染占比</div>
      <div class="content">
        <div class="left">
          <div
            class="chart-num"
            v-for="(item, index) in pieData"
            v-bind:key="index"
          >
            <i class="el-icon-pie-chart"></i> {{ index }}：{{ item }}
          </div>
        </div>
        <div class="right">
          <div
            :id="'circleChart' + index"
            style="width: 200px; height: 200px; float: left"
            v-for="(item, key, index) in pieData"
            v-bind:key="index"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComTitle from "../title";
import CheckListGroup from "../checkListGroup";
import {
  getDCPollutePieData,
  getDCTableData,
  getRoundList,
  getDCZTTipData,
} from "@/api/support/analyse";
import { handlePieData } from "../../../../utils/util";
import * as echarts from "echarts";
require("echarts/theme/macarons"); //引入主题
export default {
  name: "Total",
  data() {
    return {
      resourceList: [],
      info: {},
      text: "总体情况",
      queryParams: {
        roundIds: "",
        inspectType: "C",
      },
      tableData: [],
      pieData: {},
    };
  },
  components: {
    ComTitle,
    CheckListGroup,
  },
  created() {
    this.getRoundList();
    this.getDCZTTipData();
    this.getDCPollutePieData();
    this.getDCTableData();
  },
  methods: {
    getRoundList: function () {
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
    handleCheckChange: function (type, checkList) {
      this.queryParams[type] = checkList;
      this.getDCZTTipData();
      this.getDCPollutePieData();
      this.getDCTableData();
    },
    getDCZTTipData: function () {
      getDCZTTipData(this.queryParams).then((res) => {
        this.info = res.data;
      });
    },
    getDCPollutePieData: function () {
      getDCPollutePieData(this.queryParams).then((res) => {
        this.pieData = res.data;
        let idx = 0;
        this.$nextTick(() => {
          for (let i in res.data) {
            let id = "circleChart" + idx;
            this.drawPieChart(id, handlePieData(i, res.data[i]), [
              "#409EFF",
              "#909399",
            ]);
            idx++;
          }
        });
      });
    },
    drawPieChart(id, arr, color) {
      this.circleCharts = echarts.init(
        document.getElementById(id),
        "macarons",
        {
          width: 200,
          height: 200,
        }
      );
      console.log(this.circleCharts);
      this.circleCharts.setOption({
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            radius: ["30%", "60%"],
            data: arr,
            label: {
              position: "inner",
              fontSize: 10,
            },
            tooltip: {
              trigger: "item",
              formatter: "{b} : ({d}%)",
            },
            color,
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
      });
    },
    getDCTableData: function () {
      getDCTableData(this.queryParams).then((res) => {
        this.tableData = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.total {
  height: 100%;
  padding: 20px;
  .card {
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    margin-bottom: 20px;
    .title {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #ebebeb;
      padding: 0 20px;
      font-weight: 500;
    }
  }
}
.fitler {
  margin-bottom: 10px;
  padding: 20px;
}

.data-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  .text {
    color: gray;
    font-size: 13px;
  }
  .num {
    font-size: 18px;
    font-weight: 500;
  }
  .unit {
    font-size: 12px;
  }
}
.table {
  padding: 0 20px 20px;
  /deep/ .el-table {
    display: flex;
    flex-direction: column;
  }
  /deep/ .el-table__body-wrapper {
    order: 1;
  }
}
.content {
  display: flex;
  padding: 20px 20px 20px 60px;
  .left {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .chart-num {
      height: 60px;
      line-height: 60px;
      i {
        color: #409eff;
      }
    }
  }
  .right {
  }
}
</style>


