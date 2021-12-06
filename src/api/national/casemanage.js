// 案件管理
import { getAction, postAction, getForm, postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;

const inspectUserInfo = params => getAction(path + `/center/tinspect/team/tInspectTeam/getUserTeamList`, params);//根据用户id获取用户督察组信息

// const inspectUserInfo = params => getAction(path + `/center/tinspect/team/tInspectTeam/getUserInfo`, params);//根据用户id获取用户督察组信息
// 待转案件
const turnList = params => getAction(path + `/center/ttip/tInspectTip/list`, params);
const turnSave = params => postForm(path + `/center/ttip/transfer/tInspectTipTransfer/save`, params);
const turnDelete = params => postAction(path + `/center/ttip/tInspectTip/delete`, params);
const turnLogList = params => getAction(path + `/center/tcommon/importlog/tCommonImport/list`, params);

// 案件清单
const detailedList = params => getAction(path + `/center/ttip/tInspectTip/alllist`, params);
// const detailedList = (data,params) => getForm(path + `/center/ttip/tInspectTip/alllist`, data,params);
const sourceList = params => getAction(path + `/center/tcommon/account/tCommonAccount/getListBySourceId`, params);

// 转办单
const orderList = params => getAction(path + `/center/ttip/transfer/tInspectTipTransfer/list`, params);
const orderLetterList = params => getAction(path + `/center/ttip/tInspectTip/getTipListByTransfer`, params);
const orderLetterUpload = params => postAction(path + `/center/ttip/transfer/tInspectTipTransfer/saveUpload`, params);


// 信访问责清单
const petitionList = params => getAction(path + `/center/tcommon/account/tCommonAccount/list`, params);

export {
  inspectUserInfo,
  turnList,
  turnSave,
  turnLogList,
  turnDelete,
  detailedList,
  sourceList,
  orderList,
  orderLetterList,
  petitionList,
  orderLetterUpload
}