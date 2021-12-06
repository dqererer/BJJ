<template>
  <div>
    <div class="burg-home">
      <div class="burg-home-left">
        <div class="home-box manage-box">
          <div class="manage-inner-more" v-if="manageShowBoolean">
            <div class="manage-left">对接中央信访件总{{ manageCount }}件</div>
            <div class="manage-right">
              <div
                class="manage-item"
                :class="manageIndex == index ? 'active' : undefined"
                @click="handleManageClick(index)"
                v-for="(item, index) in manageList"
                :key="index"
              >
                <span class="manage-item-name">
                  {{ item.inspectTypeName }}{{ item.turnName
                  }}{{ item.batchName }}
                </span>
                <span class="manage-item-number">{{ item.value }}件</span>
              </div>
            </div>
          </div>
          <div class="manage-inner-more manage-inner-one" v-else>
            <div class="manage-item active" v-for="(item, index) in manageList" :key="index">
              <span class="manage-item-name">
                {{ item.inspectTypeName }}{{ item.turnName
                }}{{ item.batchName }}
              </span>
              <span class="manage-item-number">{{ item.value }}件</span>
            </div>
          </div>
        </div>
        <div class="home-box bulletin-box">
          <div class="home-box-top">
            <h1 class="home-box-top-title">转办情况</h1>
          </div>
          <div class="home-box-bottom">
            <div id="mapEchart" class="work-echart" v-show="mapBoolean"></div>
            <div class="work-echart-content" v-show="!mapBoolean">暂无数据</div>
          </div>
        </div>
      </div>
      <div class="burg-home-right">
        <div class="home-box work-box">
          <div class="home-box-top">
            <h1 class="home-box-top-title">任务类型分布情况</h1>
          </div>
          <div class="home-box-bottom">
            <div id="burgWorkEchart2" class="work-echart" v-show="meetBoolean"></div>
            <div class="work-echart-content" v-show="!meetBoolean">暂无数据</div>
          </div>
        </div>
        <div class="home-box tip-box">
          <div class="home-box-top">
            <h1 class="home-box-top-title">办理情况统计</h1>
          </div>
          <div class="home-box-bottom">
            <div id="tipEchart" class="work-echart" v-show="tipBoolean"></div>
            <div class="work-echart-content" v-show="!tipBoolean">暂无数据</div>
          </div>
        </div>
        <div class="region-box">
          <div class="district-box">
            <div class="home-box-top">
              <h1 class="home-box-top-title">问责情况地区统计</h1>
            </div>
            <div class="home-box-bottom">
              <div id="districtEchart" class="work-echart" v-show="districtBoolean"></div>
              <div class="work-echart-content" v-show="!districtBoolean">暂无数据</div>
            </div>
          </div>
          <div class="remind-box">
            <div class="home-box-top">
              <h1 class="home-box-top-title">督办提醒</h1>
            </div>
            <div class="home-box-bottom">
              <el-table v-loading="loading" :data="List" border :stripe="true">
                <el-table-column width="50" label="序号">
                  <template scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="acceptNum"
                  label="受理编号"
                  min-width="100px"
                  :show-overflow-tooltip="true"
                ></el-table-column>
                <el-table-column label="完成状态" width="100px">
                  <template v-slot="scope">
                    <span
                      class="complete-box"
                      :class="
                        scope.row.status == '超时未完成'
                          ? 'nocomplete'
                          : 'complete'
                      "
                    >{{ scope.row.status }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="handleDeadline"
                  label="截止时间"
                  width="100px"
                  :show-overflow-tooltip="true"
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  homeTipCounts,
  homeAccountCountByArea,
  homeTipTopFive,
  homeTransferByCity
} from "@/api/national/home";
import { mapGetters } from "vuex";
import axios from "axios";
import echarts from "echarts";
import world from "echarts/map/json/world.json";
import neimenggu from "@/assets/neimenggu.json";

export default {
  data() {
    return {
      manageShowBoolean: true,
      manageIndex: 0,
      manageCount: 0,
      manageList: undefined,

      tipParams2: {
        type: 2
      },
      tipParams3: {
        type: 3
      },
      basicQueryParams: {
        inspectType: undefined,
        turnId: undefined,
        batchId: undefined
      },
      tipParams: {
        inspectType: undefined,
        turnId: undefined,
        batchId: undefined
      },
      mapBoolean: false,
      taskCount: undefined,
      meetBoolean: false,
      taskObj: {
        taskKey: undefined,
        taskValue: undefined
      },

      tipBoolean: false,
      tipObj: {
        tipCity: undefined,
        noTimeCompltet: undefined,
        noTimeNoCompltet: undefined,
        TimeCompltet: undefined,
        TimeNoCompltet: undefined
      },
      districtBoolean: false,
      accountObj: {
        accountKey: undefined,
        accountValue: undefined
      },
      loading: true,
      List: [],
      chart: undefined,
      mapData: undefined,
      fairlyArry:[]
    };
  },
  created() {
    this.getTipCounts1();
  },
  activated() {
    this.manageIndex= 0;
    this.getTipCounts1();
  },
  computed: {
    ...mapGetters(["inspectInfo"])
  },
  methods: {
    async getTipCounts1() {
      const reponse = await homeTipCounts({ type: 1 });
      if (reponse.data) {
        const subject = reponse.data[0];
        this.manageCount = subject.total;
        this.manageList = reponse.data;
        this.basicQueryParams.inspectType = subject.inspectTypeCode;
        this.basicQueryParams.turnId = subject.turnId;
        this.basicQueryParams.batchId = subject.batchId;
        this.handleMethods();
        this.manageList.length > 1
          ? (this.manageShowBoolean = true)
          : (this.manageShowBoolean = false);
      } else {
        this.mapBoolean = false;
        this.meetBoolean = false;
        this.tipBoolean = false;
        this.districtBoolean = false;
        this.List = [];
      }
    },
    handleManageClick(index) {
      this.manageIndex = index;
      const subject = this.manageList[index];
      console.log(subject);
      this.basicQueryParams.inspectType = subject.inspectTypeCode;
      this.basicQueryParams.turnId = subject.turnId;
      this.basicQueryParams.batchId = subject.batchId;
      this.handleMethods();
    },
    handleMethods() {
      const loading = this.$loading({
        lock: true,
        text: "正在加载",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)"
      });
      this.getTipCounts2();
      this.getTipCounts3();
      this.gethomeAccountCountByArea();
      this.getHomeTipTopFive();
      this.getHomeTransferByCity();
      loading.close();
    },
    async getTipCounts2() {
      const reponse = await homeTipCounts({
        ...this.tipParams2,
        ...this.basicQueryParams
      });
      const reponseData = reponse.data;
      if (reponseData) {
        const taskKey = ["总量"];
        const taskValue = [];
        const taskValueSortArry = [];
        this.meetBoolean = true;
        taskValue[0] = reponseData[0].total;
        for (const item in reponseData) {
          const subject = reponseData[item];
          taskKey.push(subject.name);
          taskValue.push(subject.value);
        }
        this.taskObj.taskKey = taskKey;
        this.taskObj.taskValue = taskValue;
        const fairlyArryTwoValue = reponseData[0].total - taskValue[1]
        const fairlyArry = [0];
        for(const item in taskValue){
          if(item==0){
            continue;
          }else if(item == 1){
            fairlyArry.push(reponseData[0].total-taskValue[item])
          }else{
            fairlyArry.push(fairlyArry[item-1]-taskValue[item])
          }
        }
        this.fairlyArry = fairlyArry
      } else {
        this.meetBoolean = false;
      }
      this.$nextTick(function() {
        this.meetBoolean && this.workChart2();
      });
    },
    async getTipCounts3() {
      const reponse = await homeTipCounts({
        ...this.tipParams3,
        ...this.basicQueryParams
      });
      const reponseData = reponse.data;
      if (reponseData) {
        this.tipBoolean = true;
        const tipCity = [];
        const noTimeCompltet = [];
        const noTimeNoCompltet = [];
        const TimeCompltet = [];
        const TimeNoCompltet = [];
        for (const item in reponseData) {
          const subject = reponseData[item];
          tipCity.push(subject.cityName);
          noTimeCompltet.push(subject["未超时完成"]);
          noTimeNoCompltet.push(subject["未超时未完成"]);
          TimeCompltet.push(subject["超时完成"]);
          TimeNoCompltet.push(subject["超时未完成"]);
        }
        this.tipObj.tipCity = tipCity;
        this.tipObj.noTimeCompltet = noTimeCompltet;
        this.tipObj.noTimeNoCompltet = noTimeNoCompltet;
        this.tipObj.TimeCompltet = TimeCompltet;
        this.tipObj.TimeNoCompltet = TimeNoCompltet;
      } else {
        this.tipBoolean = false;
      }
      this.$nextTick(function() {
        this.tipBoolean && this.getTipEchart();
      });
    },
    async gethomeAccountCountByArea() {
      const reponse = await homeAccountCountByArea(this.basicQueryParams);
      const reponseData = reponse.data;
      const accountKey = [];
      const accountValue = [];
      if (reponseData) {
        this.districtBoolean = true;
        for (const item in reponseData) {
          const subject = reponseData[item];
          accountKey.push(subject.areaName);
          accountValue.push(subject.value);
        }
      } else {
        this.districtBoolean = false;
      }
      this.accountObj.accountKey = accountKey;
      this.accountObj.accountValue = accountValue;
      this.$nextTick(function() {
        this.districtBoolean && this.getDistrictEchart();
      });
    },
    async getHomeTipTopFive() {
      this.loading = true;
      const reponse = await homeTipTopFive(this.basicQueryParams);
      this.List = reponse.data;
      this.loading = false;
    },
    async getHomeTransferByCity() {
      const reponse = await homeTransferByCity(this.basicQueryParams);
      const reponseData = reponse.data;
      if (reponseData) {
        console.log(reponseData);
        this.mapBoolean = true;
        const mapData = [];
        for (const item in reponseData) {
          const subject = reponseData[item];
          const temp = {
            name: subject.name,
            value: subject.counts
          };
          mapData.push(temp);
        }
        this.mapData = mapData;
        this.$nextTick(function() {
          this.initCharts();
        });
      } else {
        this.mapBoolean = false;
      }
    },
    workChart2() {
      let myChart = this.$echarts.init(
        document.getElementById("burgWorkEchart2")
      );
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(params) {
            var tar = params[1];
            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: this.taskObj.taskKey
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "Placeholder",
            type: "bar",
            stack: "总量",
            itemStyle: {
              borderColor: "transparent",
              color: "transparent"
            },
            emphasis: {
              itemStyle: {
                borderColor: "transparent",
                color: "transparent"
              }
            },
            data: this.fairlyArry
          },
          {
            name: "数量",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "inside"
            },
            data: this.taskObj.taskValue
          }
        ]
      };
      myChart.setOption(option, true);
    },
    getTipEchart() {
      let myChart = this.$echarts.init(document.getElementById("tipEchart"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {
          data: ["未超时完成", "未超时未完成", "超时完成", "超时未完成"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          type: "value",
          minInterval: 1
        },
        xAxis: {
          type: "category",
          data: this.tipObj.tipCity
        },
        series: [
          {
            name: "未超时完成",
            type: "bar",
            stack: "total",
            label: {
              show: true
            },
            emphasis: {
              focus: "series"
            },
            data: this.tipObj.noTimeCompltet
          },
          {
            name: "未超时未完成",
            type: "bar",
            stack: "total",
            label: {
              show: true
            },
            emphasis: {
              focus: "series"
            },
            data: this.tipObj.noTimeNoCompltet
          },
          {
            name: "超时完成",
            type: "bar",
            stack: "total",
            label: {
              show: true
            },
            emphasis: {
              focus: "series"
            },
            data: this.tipObj.TimeCompltet
          },
          {
            name: "超时未完成",
            type: "bar",
            stack: "total",
            label: {
              show: true
            },
            emphasis: {
              focus: "series"
            },
            data: this.tipObj.TimeNoCompltet
          }
        ]
      };
      myChart.setOption(option, true);
    },
    getDistrictEchart() {
      let myChart = this.$echarts.init(
        document.getElementById("districtEchart")
      );
      let option = {
        xAxis: {
          type: "category",
          data: this.accountObj.accountKey
        },
        yAxis: {
          type: "value",
          minInterval: 1
        },
        series: [
          {
            data: this.accountObj.accountValue,
            type: "bar"
          }
        ]
      };
      myChart.setOption(option, true);
    },
    initCharts() {
      console.log(neimenggu);
      this.$echarts.registerMap("neimenggu", neimenggu);
      this.chart = this.$echarts.init(document.getElementById("mapEchart"));
      this.setOptions();
    },
    setOptions() {
      console.log(this.mapData);
      this.chart.setOption({
        backgroundColor: "#ffffff",
        title: {
          text: "",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            let value;
            if (isNaN(params.value)) {
              value = 0;
            } else {
              value = params.value;
            }
            return params.name + "<br/>" + " 转办数: " + value;
          }
        },
        geo: {
          map: "world",
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#eeeeee",
              borderColor: "#111"
            },
            emphasis: {
              areaColor: "#2a333d"
            }
          }
        },
        visualMap: {
          min: 1,
          max: 200,
          text: ["High", "Low"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"]
          }
        },
        series: [
          {
            type: "map",
            mapType: "neimenggu", // 自定义扩展图表类型
            label: {
              show: true
            },
            data: this.mapData
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.burg-home {
  width: 100%;
  padding: 0 10px 10px 10px;
  background-color: #f6f8fb;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .burg-home-left {
    width: 39%;
    .bulletin-box {
      height: 480px;
      .home-box-bottom {
        height: 432px;
        .work-echart {
          height: 412px;
        }
        .work-echart-content {
          height: 412px;
        }
      }
    }
  }
  .burg-home-right {
    width: 60%;
  }
  .home-box {
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 1px 1px 10px rgba(244, 244, 244, 0.8);
    margin-top: 10px;
  }
  .manage-box {
    height: 400px;
    padding: 10px;
    .manage-inner-more {
      display: flex;
      justify-content: space-between;
      &.manage-inner-one {
        align-items: center;
        height: 100%;
        .manage-item {
          width: 100%;
        }
      }
    }
    .manage-left {
      width: 28%;
      display: flex;
      align-items: center;
      background-color: rgba(64, 158, 255, 1);
      color: #fff;
      text-align: center;
      font-size: 22px;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .manage-right {
      width: 70%;
      display: flex;
      flex-direction: column;
      height: 380px;
    }
    .manage-item {
      display: flex;
      justify-content: space-between;
      background-color: rgba(64, 158, 255, 0.2);
      padding: 0 10px;
      font-size: 16px;
      height: 80px;
      align-items: center;
      cursor: pointer;
      margin-top: 20px;
      &:first-child {
        margin-top: 0;
      }
      &.active {
        background-color: #ff7499;
        color: #fff;
      }
      .manage-item-name {
      }
      .manage-item-number {
      }
    }
  }
  .home-box-top {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dddddd;
    padding: 0 10px;
    .home-box-top-title {
      border-left: 4px solid #3393cf;
      font-size: 16px;
      margin: 0;
      font-weight: normal;
      padding-left: 6px;
    }
  }
  .home-box-bottom {
    padding: 10px;
  }
  .work-box {
    .home-box-bottom {
      height: 220px;
      .work-echart {
        height: 220px;
      }
    }
  }
  .tip-box {
    .home-box-bottom {
      height: 261px;
      .work-echart {
        height: 261px;
      }
    }
  }
  .region-box {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .district-box {
      width: 49.5%;
      background-color: #fff;
      border-radius: 6px;
      background-color: #fff;
      box-shadow: 1px 1px 10px rgba(244, 244, 244, 0.8);
      .home-box-bottom {
        height: 245px;
      }
      .work-echart {
        height: 245px;
      }
    }
    .remind-box {
      width: 49.5%;
      background-color: #fff;
      border-radius: 6px;
      background-color: #fff;
      box-shadow: 1px 1px 10px rgba(244, 244, 244, 0.8);
      .home-box-bottom {
        height: 245px;
      }
    }
  }
  .work-echart-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .complete-box {
    display: inline-block;

    padding: 0 10px;
    margin-left: -6px;
    color: #fff;
    &.nocomplete {
      background-color: rgba(217, 0, 27, 1);
    }
    &.complete {
      background-color: #61a0a8;
    }
  }
}
</style>