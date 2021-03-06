// 督察组管理
import { getAction, postAction, postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;

// 督察组
const inspectorList = params => getAction(path + `/center/tinspect/round/tInspectRound/findInspectTypeList`, params);
const inspectorRoundList = params => getAction(path + `/center/tinspect/round/tInspectRound/findRoundInfo`, params);
const inspectorRoundAmend = params => getAction(path + `/center/tinspect/round/tInspectRound/getInfoById`, params);
const inspectorRoundDelete = params => postAction(path + `/center/tinspect/round/tInspectRound/delete`, params);
const roundSave = params => postForm(path + `/center/tinspect/round/tInspectRound/save`, params);//轮次与批次保存
const teamInfoList = params => getAction(path + `/center/tinspect/team/tInspectTeam/findBatchTeamInfo`, params);
const inspectorInfo = params => getAction(path + `/center/tinspect/team/tInspectTeam/getTeamInfo`, params);
const teamInfoAmend = params => getAction(path + `/center/tinspect/team/tInspectTeam/getInfoById`, params);
const teamInfoDelete = params => postAction(path + `/center/tinspect/team/tInspectTeam/delete`, params);
const inspectorPersonInfo = params => getAction(path + `/center/tinspect/team/commonMemberTeam/findTeamMemberList`, params);
const archive = params => postAction(path + `/center/tinspect/team/commonMemberTeam/archive`, params);
const personList = params => getAction(path + `/center/tcommon/member/tCommonMember/findPersonList`, params);
const inspectorSave = params => postForm(path + `/center/tinspect/team/tInspectTeam/save`, params);
const getTeamList = params => getAction(path + `/center/seo/getTeamList`, params);
const getBatchTeamFlag = params => getAction(path + `/center/tinspect/team/tInspectTeam/getBatchTeamFlag`, params);

const getCentralInfo = params => getAction(path + `/center/tinspect/team/tInspectTeam/getCentralInfo`, params);
export {
    inspectorList,
    inspectorRoundList,
    inspectorRoundAmend,
    teamInfoList,
    teamInfoAmend,
    archive,
    inspectorInfo,
    inspectorPersonInfo,
    roundSave,
    inspectorSave,
    personList,
    inspectorRoundDelete,
    teamInfoDelete,
    getCentralInfo,
    getBatchTeamFlag,
    getTeamList
}
