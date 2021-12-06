//督察进驻
import { getAction, postAction, postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;

// 个别谈话
const severalList = params => getAction(path + `/center/tinspect/talk/tInspectTalk/list`, params);
const severalSave = params => postForm(path + `/center/tinspect/talk/tInspectTalk/savePlan`, params);
const severalInfoSave = params => postForm(path + `/center/tinspect/talk/tInspectTalk/saveInfo`, params);
const severalSee = params => getAction(path + `/center/tinspect/talk/tInspectTalk/getInfoById`, params);
const severalDelete = params => postAction(path + `/center/tinspect/talk/tInspectTalk/delete`, params);
const severalPersonList = params => getAction(path + `/center/tcommon/member/tCommonMember/findTeamMemberList`, params);
const severalRelationSave = params => postForm(path + `/center/clue/main/tClueMain/saveRelationNew`, params);
const severalShowNum = params => getAction(path + `/center/tinspect/talk/tInspectTalk/getShowNum`, params);
const severalQuestionList = params => getAction(path + `/center/tinspect/talk/tInspectTalk/questionList`, params);

// 走访问询
const interviewGetNewId = params => getAction(path + `/center/tinspect/talk/tInspectTalk/getNewId`, params);

// 受理举报
const acceptDeleteLock = params => postAction(path + `/center/ttip/tInspectTip/deleteLock`, params);
const acceptList = params => getAction(path + `/center/ttip/tInspectTip/registerList`, params);
const acceptSee = params => getAction(path + `/center/ttip/tInspectTip/getInfoById`, params);
const acceptSave = params => postForm(path + `/center/ttip/tInspectTip/save`, params);
const acceptDelete = params => postAction(path + `/center/ttip/tInspectTip/delete`, params);
const acceptCheckSave = params => postForm(path + `/center/ttip/tInspectTip/review`, params);
const acceptCheckPay = params => postForm(path + `/center/ttip/tInspectTip/focus`, params);
const acceptCheckSpot = params => postForm(path + `/center/ttip/tInspectTip/spotCheck`, params);
const acceptCheckReject = params => postForm(path + `/center/ttip/tInspectTip/reject`, params);
const acceptNoTransfer = params => postForm(path + `/center/ttip/tInspectTip/noTransfer`, params);
const acceptTransfer = params => postForm(path + `/center/ttip/tInspectTip/transfer`, params);
const acceptRevoke = params => postAction(path + `/center/ttip/tInspectTip/revoke`, params);
const acceptCheckInfo = params => getAction(path + `/center/ttip/tInspectTip/getReviewInfo`, params);
const acceptTurnSave = params => postForm(path + `/center/ttip/transfer/tInspectTipTransfer/transferSave`, params);
const acceptHandleList = params => getAction(path + `/center/ttip/tInspectTip/handlePage`, params);
const acceptQueryList = params => getAction(path + `/center/ttip/tInspectTip/queryList`, params);
const repeatNumList = params => getAction(path + `/center/ttip/tInspectTip/getRepeatListByIds`, params);
// 线索管理
const clewAll = params => getAction(path + `/center/clue/main/tClueMain/findAllClueNamePage`, params);
const clewList = params => getAction(path + `/center/clue/main/tClueMain/findClueAfterPage`, params);
//边督边改
const anaInfoByTeam = params => getAction(path + `/center/ttip/middle/tInspectTipHandleMiddle/getAnaInfoByTeamId`, params);
const queryListForhandle = params => getAction(path + `/center/ttip/tInspectTip/queryListForhandle`, params);
const sourceList = params => getAction(path + `/center/tcommon/account/tCommonAccount/getListBySourceIdPage`, params);

// 下沉督察
// 下沉方案
const schemeList = params => getAction(path + `/center/tinspect/team/tInspectTeam/list`, params);
const schemeSee = params => getAction(path + `/center/tinspect/team/tInspectTeam/getInfoByIdForXC`, params);
const schemeDelete = params => postAction(path + `/center/tinspect/team/tInspectTeam/delete`, params);
const schemeSave = params => postForm(path + `/center/tinspect/team/tInspectTeam/saveForXC`, params);
const logSaveForXC = params => postForm(path + `/center/tinspect/evidence/tInspectEvidence/saveForXC`, params);
const schemeXCSee = params => getAction(path + `/center/tinspect/evidence/tInspectEvidence/getXCInfo`, params);

// 下沉日志
const logList = params => getAction(path + `/center/tinspect/sink/tInspectSink/list`, params);
const logSee = params => getAction(path + `/center/tinspect/sink/tInspectSink/getInfoById`, params);
const logDelete = params => postAction(path + `/center/tinspect/sink/tInspectSink/delete`, params);
const logSave = params => postForm(path + `/center/tinspect/sink/tInspectSink/save`, params);
const sinkAll = params => getAction(path + `/center/tinspect/team/tInspectTeam/getXcListByParentId`, params);
const logSinkId = params => getAction(path + `/center/tinspect/sink/tInspectSink/getSinkId`, params);
const logFindToLinkList = params => getAction(path + `/center/tinspect/evidence/tInspectEvidence/findToLinkList`, params);
const logSinkProblemList = params => getAction(path + `/center/tinspect/evidence/tInspectEvidence/findSinkProblemList`, params);
const logClueListByTableAndId = params => getAction(path + `/center/tinspect/evidence/tInspectEvidence/getClueListByTableAndId`, params);



// 问题聚焦
const issueList = params => getAction(path + `/center/tinspect/problem/tInspectProblem/list`, params);
const issueSee = params => getAction(path + `/center/tinspect/problem/tInspectProblem/getInfoById`, params);
const issueDelete = params => postAction(path + `/center/tinspect/problem/tInspectProblem/delete`, params);
const issueSave = params => postForm(path + `/center/tinspect/problem/tInspectProblem/save`, params);
const issueClueAll = params => getAction(path + `/center/clue/main/tClueMain/getInfoByTeamId`, params);
const issueDetail = params => getAction(path + `/center/tinspect/problem/tInspectProblem/getDetailByIds`, params);
const issueMediaSave = params => postForm(path + `/center/tinspect/media/tInspectMedia/save`, params);
const issueSpotSave = params => postForm(path + `/center/tinspect/talk/tInspectTalk/saveInfoForProblem`, params);
const issueMediaInfo = params => getAction(path + `/center/tinspect/media/tInspectMedia/getInfoById`, params);
const issueCanChange = params => getAction(path + `/center/tinspect/problem/tInspectProblem/canChange`, params);

// 移交问题案卷
const overList = params => getAction(path + `/center/tinspect/archive/tInspectArchive/list`, params);
const overSee = params => getAction(path + `/center/tinspect/archive/tInspectArchive/getInfoById`, params);
const overDelete = params => postAction(path + `/center/tinspect/archive/tInspectArchive/delete`, params);
const overSave = params => postForm(path + `/center/tinspect/archive/tInspectArchive/save`, params);
const overQuestionList = params => getAction(path + `/center/tinspect/archive/tInspectArchive/getProblemListByTeamId`, params);



//智能查重
const intelList = params => getAction(path + `/center/ttip/repeat/tInspectTipRepeat/intelligentRechecking`, params);
const repeatList = params => getAction(path + `/center/ttip/repeat/tInspectTipRepeat/repeatList`, params);
const intelAdd = params => getAction(path + `/center/ttip/repeat/tInspectTipRepeat/addRepeat`, params);
const intelRemove = params => getAction(path + `/center/ttip/repeat/tInspectTipRepeat/removeRepeat`, params);
const intelCombineOne = params => getAction(path + `/center/ttip/repeat/tInspectTipRepeat/intelligentCombineOne`, params);
const intelCancelOne = params => getAction(path + `/center/ttip/repeat/tInspectTipRepeat/cancelCombineOne`, params);
const intelCombineAll = params => getAction(path + `/center/ttip/repeat/tInspectTipRepeat/intelligentCombine`, params);
const intelCancelAll = params => getAction(path + `/center/ttip/repeat/tInspectTipRepeat/cancelCombineAll`, params);
const intelRecheckingList = params => getAction(path + `/center/ttip/repeat/tInspectTipRepeat/recheckingList`, params);
const manuallyMerge = params => postAction(path + `/center/ttip/repeat/tInspectTipRepeat/manuallyMerge`, params);
export {
  severalList,
  severalSave,
  severalInfoSave,
  severalSee,
  severalDelete,
  severalPersonList,
  severalRelationSave,
  severalShowNum,
  severalQuestionList,
  interviewGetNewId,
  clewAll,
  clewList,
  acceptList,
  acceptSee,
  acceptSave,
  acceptDelete,
  acceptCheckSave,
  acceptCheckPay,
  acceptCheckSpot,
  acceptCheckReject,
  acceptNoTransfer,
  acceptTransfer,
  acceptRevoke,
  acceptCheckInfo,
  acceptTurnSave,
  acceptHandleList,
  acceptQueryList,
  schemeList,
  schemeSee,
  schemeDelete,
  schemeSave,
  issueList,
  issueSee,
  issueDelete,
  issueSave,
  issueClueAll,
  issueCanChange,
  overList,
  overSee,
  overDelete,
  overSave,
  overQuestionList,
  logList,
  logSee,
  logDelete,
  logSave,
  sinkAll,
  issueDetail,
  issueMediaSave,
  issueSpotSave,
  issueMediaInfo,
  logSinkId,
  acceptDeleteLock,
  anaInfoByTeam,
  queryListForhandle,
  sourceList,
  logFindToLinkList,
  logSinkProblemList,
  logClueListByTableAndId,
  logSaveForXC,
  schemeXCSee,

  intelList,
  repeatList,
  intelAdd,
  intelRemove,
  intelCombineOne,
  intelCancelOne,
  intelCombineAll,
  intelCancelAll,
  intelRecheckingList,
  manuallyMerge,
  repeatNumList
}