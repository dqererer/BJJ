<template>
  <div class="tab-list-content">
    <div class="box-body">
      <el-form :model="geoCategoryParams" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="统计时间：">
              <el-date-picker
                v-model="issueDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="issueDateChange"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-form-item style="float:right;margin:0px;">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="log-box">
      <div class="log-line">
        <div id="caidan" :style="{width:screenWidth+'px'}"></div>
        <div id="bumen"  :style="{width:screenWidth+'px'}"></div>
      </div>
      <div id="main" :style="{width:allWidth+'px'}"></div>
    </div>
  </div>
</template>

<script>
import { logStatistics } from "@/api/styem/log";
import { MessageBox } from "element-ui";
import Bus from "@/utils/vueBus";
export default {
  data() {
    return {
      geoCategoryParams: {
        beginDate: undefined,
        endDate: undefined
      },
      issueDate: undefined,
      xAxis: undefined,
      series: undefined,
      caidanCountObj: undefined,
      screenWidth:500,
      allWidth:1000
    };
  },
  created() {
    this.getLogStatistics();
    this.createTime();
    this.getScreenWidth();
  },
  methods: {
    getScreenWidth(){
      const windowWidth = window.innerWidth - 400;
      this.allWidth = windowWidth;
      this.screenWidth = windowWidth/2;
    },
    createTime() {
      const end = new Date();
      // const start = new Date();
      // start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      // end.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      const nowMonth = end.getMonth(); //当前月 
      const nowYear = end.getFullYear(); //当前年 
      const monthStartDate = new Date(nowYear, nowMonth, 1); 
      const monthEndDate = new Date(nowYear, nowMonth+1, 0);
      this.issueDate = [monthStartDate, monthEndDate];
      this.geoCategoryParams.beginDate = this.format(monthStartDate,"yyyy-MM-dd");//yyyy-MM-dd hh:mm:ss
      this.geoCategoryParams.endDate = this.format(monthEndDate,"yyyy-MM-dd");
    },
    onSubmit() {
      this.getLogStatistics();
    },
    async getLogStatistics() {
      const reponse = await logStatistics(this.geoCategoryParams);
      const caidanCount = reponse.data.caidanCount;
      const bumenCount = reponse.data.bumenCount;
      const typeCount = reponse.data.typeCount;
      this.caidanCountObj = this.ObjectErgodic(caidanCount);
       this.bumenCountObj = this.ObjectErgodicPie(bumenCount);
      this.typeCountObj = this.ObjectErgodic(typeCount, "type");
      this.$nextTick(() => {
        this.logStatisticsEchart();
      });
      
    },
    ObjectErgodic(data, type) {
      let obj = {
        xAxis: [],
        series: []
      };
      if (type === "type") {
        for (let item in data) {
          obj["xAxis"].push(item);
          obj["series"].push(data[item]);
        }
      } else {
        for (let item in data) {
          obj["xAxis"].unshift(data[item].num);
          obj["series"].unshift(data[item].name);
        }
      }
      return obj;
    },
    ObjectErgodicPie(data){
      const pieArry = [];
      for(var item in data){
        const temp = {
          name:data[item].name,
          value:data[item].num,
        }
        pieArry.push(temp)
      }
      return pieArry;
    },
    logStatisticsEchart() {
      var myChart_caidan = this.$echarts.init(
        document.getElementById("caidan")
      );
      var option_caidan = {
        title: {
          text: "菜单访问次数Top10",
          x: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              show: false,
              yAxisIndex: "none"
            },
            dataView: { show: false, readOnly: false },
            magicType: { show: false, type: ["line", "bar"] },
            restore: { show: false },
            saveAsImage: {}
          }
        },
        grid: {
          containLabel: true,
          left: 10
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisTick: {
            inside: true
          }
        },
        yAxis: {
          type: "category",
          data: this.caidanCountObj.series,
          axisTick: {
            alignWithLabel: true,
            interval: 0,
            rotate: -30,
            margin: -15
          },
          axisLabel: {
            interval: 0,
            rotate: 0,
            formatter: function(value, index) {
              var s = value.split("-");

              return s[s.length - 1];
            }
          }
        },

        series: [
          {
            name: "数量",
            type: "bar",
            data: this.caidanCountObj.xAxis,
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "#C33531",
                    "#64BD3D",
                    "#EE9201",
                    "#29AAE3",
                    "#B74AE5",
                    "#0AAF9F",
                    "#E89589",
                    "#16A085",
                    "#4A235A",
                    "#C39BD3 ",
                    "#F9E79F",
                    "#BA4A00",
                    "#ECF0F1",
                    "#616A6B",
                    "#EAF2F8",
                    "#4A235A",
                    "#3498DB"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      };
      myChart_caidan.setOption(option_caidan);

      var myChart = this.$echarts.init(document.getElementById("main"));
      var option = {
        title: {
          text: "日志类型统计",
          x: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              show: false,
              yAxisIndex: "none"
            },
            dataView: { show: false, readOnly: false },
            magicType: { show: false, type: ["line", "bar"] },
            restore: { show: false },
            saveAsImage: {}
          }
        },

        xAxis: [
          {
            type: "category",
            data: this.typeCountObj.xAxis
          }
        ],

        yAxis: {
          type: "value"
        },

        series: [
          {
            name: "数量",
            itemStyle: {
              normal: {
                //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);},
                color: function(params) {
                  var colorList = [
                    "#C33531",
                    "#64BD3D",
                    "#EE9201",
                    "#29AAE3",
                    "#B74AE5",
                    "#0AAF9F",
                    "#E89589",
                    "#16A085",
                    "#4A235A",
                    "#C39BD3 ",
                    "#F9E79F",
                    "#BA4A00",
                    "#ECF0F1",
                    "#616A6B",
                    "#EAF2F8",
                    "#4A235A",
                    "#3498DB"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            type: "bar",
            data: this.typeCountObj.series
          }
        ]
      };
      myChart.setOption(option);
      var myChart_bumen = this.$echarts.init(document.getElementById("bumen"));
      var option_bumen = {
        title: {
          text: "各部门访问统计",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "访问次数",
            type: "pie",
            radius: "55%",
            data: this.bumenCountObj,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      myChart_bumen.setOption(option_bumen);
    },

    issueDateChange(picker) {
      if (picker == null) {
        this.geoCategoryParams.beginDate = undefined;
        this.geoCategoryParams.endDate = undefined;
      } else {
        this.geoCategoryParams.beginDate = picker[0];
        this.geoCategoryParams.endDate = picker[1];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.log-box {
  width: 100%;
  overflow: hidden;
  .log-line {
    overflow: hidden;
    width: 100%;
    width: 1000px;
  }
}
#caidan {
  float: left;
  height: 450px;
}
#bumen {
  float: right;
  height: 450px;
}
#main {
  overflow: hidden;
  height: 450px;
}
</style>