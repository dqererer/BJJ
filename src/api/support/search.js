import { getAction, postAction, postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;
// 整改方案
const getAllSearchData = params => getAction(path + `/center/env/getEnvList`, params);  //参数查询，根据输入框和多选框筛选查询条件
const getTeamInfo = params => getAction(path + `/center/tinspect/team/tInspectTeam/getTeamInfo`, params);  //获取督察组信息
const findTeamClueInfo = params => getAction(path + `/center/clue/main/tClueMain/findTeamClueInfo`, params);  //获取线索信息
const findTeamMeetList = params => getAction(path + `/center/tinspect/meet/tInspectMeet/findTeamMeetList`, params);  //获取会议信息
const getRegisterList = params => getAction(path + `/center/ttip/tInspectTip/queryList`, params);  //获取举报信息
const getAskList = params => getAction(path + `/center/tcommon/account/tCommonAccount/list`, params);  //获取问责信息
const findTeamLogPage = params => getAction(path + `/center/tcommon/materiallog/tCommonMaterialLog/findTeamLogPage`, params);  //调阅资料
const findInspectTalk = params => getAction(path + `/center/tinspect/talk/tInspectTalk/list`, params);  //谈话等
const findTeamInfoListPage = params => getAction(path + `/center/tinspect/infolist/tInspectInfoList/findTeamInfoListPage`, params);  //资料提供
const getProblemInfo = params => getAction(path + `/center/tinspect/problem/tInspectProblem/list`, params);  //问题
const getArchive = params => getAction(path + `/center/tinspect/archive/tInspectArchive/list`, params);  //案卷
const tInspectSink = params => getAction(path + `/center/tinspect/sink/tInspectSink/list`, params);  //下沉日志
const tInspectMeet = params => getAction(path + `/center/tinspect/meet/tInspectMeet/list`, params);  //下沉总结会
const CommonNotice = params => getAction(path + `/center/tcommon/notice/tCommonNotice/list`, params);   //简报 
const reportList = params => getAction(path + `/center/seo/reportList`, params);   //报告 
const getRectifyPlanByTeamId = params => getAction(path + `/center/seo/getRectifyPlanByTeamId`, params);   //方案
const getRectifyTaskByTeamId = params => getAction(path + `/center/seo/getRectifyTaskByTeamId`, params);   //任务
const getTipInfo = params => getAction(path + `/center/seo/getTipInfo`, params);   //信访件
const getMeetInfo = params => getAction(path + `/center/seo/getMeetInfo`, params);   //会议
const getTalkInfo = params => getAction(path + `/center/seo/getTalkInfo`, params);   //谈话
const getQuestionInfo = params => getAction(path + `/center/seo/getQuestionInfo`, params);   //谈话
const getPlanInfo = params => getAction(path + `/center/seo/getPlanInfo`, params);   //谈话
const getMemberInfo = params => getAction(path + `/center/tcommon/member/tCommonMember/getMemberInfo`, params);   //人员 
const findTeamListByMemberAndRole = params => getAction(path + `/center/tcommon/member/tCommonMember/findTeamListByMemberAndRole`, params);   //人员 
const memberWorkAna = params => getAction(path + `/center/tcommon/member/tCommonMember/memberWorkAna`, params);   //人员

export {
  getAllSearchData,
  getTeamInfo,
  findTeamClueInfo,
  findTeamMeetList,
  getRegisterList,
  findTeamInfoListPage,
  getProblemInfo,
  getArchive,
  getAskList,
  findTeamLogPage,
  findInspectTalk,
  tInspectSink,
  tInspectMeet,
  CommonNotice,
  reportList,
  getRectifyPlanByTeamId,
  getRectifyTaskByTeamId,
  getTipInfo,
  getMeetInfo,
  getTalkInfo,
  getQuestionInfo,
  getPlanInfo,
  getMemberInfo,
  findTeamListByMemberAndRole,
  memberWorkAna
}
