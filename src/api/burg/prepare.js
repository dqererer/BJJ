//督察准备
import { getAction, postAction, postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;

// 线索管理
const threadSee = params => getAction(path + `/center/clue/main/tClueMain/getInfoById`, params);



//督察准备-----线索管理
const threadRelationList = params => getAction(path + `/center/clue/main/tClueMain/findCluePage`, params);
const threadRelationPull = params => getAction(path + `/center/clue/main/tClueMain/findClueNamePage`, params);
const threadRelationSave = params => postAction(path + `/center/clue/main/tClueMain/saveRelationExist`, params);
const threadRelationDelete = params => postAction(path + `/center/clue/main/tClueMain/deleteRelation`, params);
const threadRelationAlerady = params => getAction(path + `/center/clue/main/tClueMain/findClueNameTeamPage`, params);

// 进驻培训
const trainList = params => getAction(path + `/center/tinspect/meet/tInspectMeet/list`, params);
const trainSave = params => postForm(path + `/center/tinspect/meet/tInspectMeet/save`, params);
const trainSee = params => getAction(path + `/center/tinspect/meet/tInspectMeet/getInfoById`, params);
const trainDelete = params => postAction(path + `/center/tinspect/meet/tInspectMeet/delete`, params);

export {
  threadSee,
  trainList,
  trainSave,
  trainSee,
  trainDelete,
  threadRelationList,
  threadRelationPull,
  threadRelationSave,
  threadRelationDelete,
  threadRelationAlerady
}