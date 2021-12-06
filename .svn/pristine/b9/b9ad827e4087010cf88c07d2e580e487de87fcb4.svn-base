import { getAction ,postAction } from './manage';

const path = process.env.VUE_APP_BASE_API;

const bigBatchList = params => getAction(`${path}/center/analyse/getBatchList`,params);

//自治区
const bigLeftChartData = params => getAction(`${path}/center/analyse/getLeftChartData`,params);

const bigMiddleData = params => getAction(`${path}/center/analyse/getMiddleData`,params);
const bigMiddleDataPoint = params => getAction(`${path}/center/analyse/getMiddleDataPoint`,params);
const bigMiddleDetailData= params => getAction(`${path}/center/analyse/getMiddleDetailData`,params);
const bigMiddleDetailPage = params => getAction(`${path}/center/analyse/getMiddleDetailPage`,params);

const bigRightChartData= params => getAction(`${path}/center/analyse/getRightChartData`,params);
const bigFindArchive= params => getAction(`${path}/center/analyse/findArchivePage`,params);

//整改
const rectifySourceChartInfo = params => getAction(`${path}/center/analyse/getRectifySourceChartInfo`,params);
const rectifyChartInfo = params => getAction(`${path}/center/analyse/getRectifyChartInfo`,params);
const rectifyInfo = params => getAction(`${path}/center/analyse/getRectifyInfo`,params);
const findRectifyMainPage = params => getAction(`${path}/center/analyse/findRectifyMainPage`,params);
const rectifyInfoById = params => getAction(`${path}/center/analyse/getRectifyInfoById`,params);
const rectifyMonthInfo = params => getAction(`${path}/center/analyse/getRectifyMonthInfo`,params);
export {
  bigBatchList,
  bigLeftChartData,
  bigMiddleData,
  bigMiddleDataPoint,
  bigMiddleDetailData,
  bigMiddleDetailPage,
  bigRightChartData,
  bigFindArchive,
  rectifyChartInfo,
  rectifyInfo,
  findRectifyMainPage,
  rectifyInfoById,
  rectifyMonthInfo,
  rectifySourceChartInfo
}
