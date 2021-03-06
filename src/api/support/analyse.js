import { getAction, postAction, postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;
//通用
const getRoundList = params => getAction(path + `/center/tinspect/round/tInspectRound/getRoundList`, params);  //获取所有轮次信息
const getAreaList = params => getAction(path + `/center/sys/area/getAreaByParentId`, params);  //获取所有地区

// 地区分布
const getAreaBarData = params => getAction(path + `/center/trectify/statistics/getAreaBarData`, params);  //柱状图
const getAreaTableData = params => getAction(path + `/center/trectify/statistics/getAreaTableData`, params);  //表格
const getAreaTableDataByCityCode = params => getAction(path + `/center/trectify/statistics/getAreaTableDataByCityCode`, params);  //根据省份查询出来的表格


// 污染类型&问题来源
const getPolluteBarData = params => getAction(path + `/center/trectify/statistics/getPolluteBarData`, params);  //柱状图
const getPolluteTableData = params => getAction(path + `/center/trectify/statistics/getPolluteTableData`, params);  //表格
const getPolluteTableDataByPoByPolluteType = params => getAction(path + `/center/trectify/statistics/getPolluteTableDataByPoByPolluteType`, params);  //根据省份查询出来的表格


//中央&省级
const getDCZTTipData = params => getAction(path + `/center/trectify/statistics/getDCZTTipData`, params);  //对接信访信息
const getDCAreaBarData = params => getAction(path + `/center/trectify/statistics/getDCAreaBarData`, params);  //柱状图
const getDCAreaTableData = params => getAction(path + `/center/trectify/statistics/getDCAreaTableData`, params);  //表格
const getDCPollutePieData = params => getAction(path + `/center/trectify/statistics/getDCPollutePieData`, params);  //获取饼状图
const getDCTableData = params => getAction(path + `/center/trectify/statistics/getDCTableData`, params);  //表格
const getDCWZNum = params => getAction(path + `/center/trectify/statistics/getDCWZNum`, params);  //对接信访信息
const getDCWZBarData = params => getAction(path + `/center/trectify/statistics/getDCWZBarData`, params);  //柱状图
const getDCWZPieData = params => getAction(path + `/center/trectify/statistics/getDCWZPieData`, params);  //饼图
const getTipStateDict = params => getAction(path + `/center/trectify/statistics/getTipStateDict`, params);  //饼图
const getDCWZTableData = params => getAction(path + `/center/trectify/statistics/getDCWZTableData`, params);  //表格
const getDCPolllutionTableData = params => getAction(path + `/center/trectify/statistics/getDCPolllutionTableData`, params);  //污染类型
const getDCPolllutionBarData = params => getAction(path + `/center/trectify/statistics/getDCPolllutionBarData`, params);  //柱状图
const getDcPolllutionTableDetail = params => getAction(path + `/center/trectify/statistics/getDcPolllutionTableDetail`, params);  //弹框表格
const getDcAreaTableDetail = params => getAction(path + `/center/trectify/statistics/getDcAreaTableDetail`, params);  //弹框表格



const getDCStateTableData = params => getAction(path + `/center/trectify/statistics/getDCStateTableData`, params);  //污染类型
const getDCStateBarData = params => getAction(path + `/center/trectify/statistics/getDCStateBarData`, params);  //柱状图
const getDCStateTableDetail = params => getAction(path + `/center/trectify/statistics/getDCStateTableDetail`, params);  //弹框表格
export {
  getAreaBarData,
  getAreaTableData,
  getAreaTableDataByCityCode,
  getRoundList,
  getAreaList,
  getPolluteBarData,
  getPolluteTableData,
  getPolluteTableDataByPoByPolluteType,
  getDCZTTipData,
  getDCAreaTableData,
  getDCAreaBarData,
  getDCPollutePieData,
  getDCTableData,
  getDCWZNum,
  getDCWZBarData,
  getDCWZPieData,
  getTipStateDict,
  getDCWZTableData,
  getDCPolllutionTableData,
  getDCPolllutionBarData,
  getDcPolllutionTableDetail,
  getDCStateBarData,
  getDCStateTableData,
  getDCStateTableDetail,
  getDcAreaTableDetail
}
