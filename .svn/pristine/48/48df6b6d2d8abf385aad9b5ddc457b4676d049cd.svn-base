//自治区首页
import { getAction} from '../manage'
const path = process.env.VUE_APP_BASE_API;

const homeBatchInfo = params => getAction(path + `/center/analyse/getBatchInfo`, params);
const homeTeamList = params => getAction(path + `/center/analyse/findBatchTeamList`, params);
const homeTeamInfo = params => getAction(path + `/center/tinspect/team/tInspectTeam/getTeamInfo`, params);
const homeBriefInfo = params => getAction(path + `/center/analyse/getBriefInfo`, params);
const hometWorkInfo = params => getAction(path + `/center/analyse/getWorkInfo`, params);
const homeTipInfo = params => getAction(path + `/center/analyse/getTipInfo`, params);
const homeSinkTeamList = params => getAction(path + `/center/analyse/getSinkTeamList`, params);
const homeWorkTypeInfo = params => getAction(path + `/center/analyse/getWorkTypeInfo`, params);
export {
  homeBatchInfo,
  homeTeamList,
  homeTeamInfo,
  homeBriefInfo,
  hometWorkInfo,
  homeTipInfo,
  homeSinkTeamList,
  homeWorkTypeInfo,
}