//督察准备
import { getAction, postAction, postForm } from './manage'
const path = process.env.VUE_APP_BASE_API;

// 线索管理

const threadList = params => getAction(path + `/center/clue/main/tClueMain/list`, params);
const threadSave = params => postForm(path + `/center/clue/main/tClueMain/save`, params);
const threadDelete = params => postAction(path + `/center/clue/main/tClueMain/delete`, params);
const threadTrackList = params => getAction(path + `/center/clue/main/tClueMain/findTrackList`, params);
const threadTrackNewList = params => getAction(path + `/center/clue/main/tClueMain/findTrackListNew`, params);
const threadTeamInfo = params => getAction(path + `/center/tinspect/team/tInspectTeam/getTeamInfoById`, params);
const threadByAddress = params => getAction(path + `/center/tinspect/sink/tInspectSink/getInfoByAddressId`, params);
const findClueTeamList = params => getAction(path + `/center/clue/track/tClueTrack/findClueTeamList`, params);
const threadCanChange = params => getAction(path + `/center/clue/main/tClueMain/canChange`, params);
export {
  threadList,
  threadSave,
  threadDelete,
  threadTrackList,
  threadTrackNewList,
  threadTeamInfo,
  threadByAddress,
  findClueTeamList,
  threadCanChange
}