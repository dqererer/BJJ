// 案件办理
import { getAction, postAction, postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;

// 案件办理
const transactList = params => getAction(path + `/center/ttip/tInspectTip/tipListToDo`, params);
const transactSave = params => postForm(path + `/center/ttip/handle/tInspectTipHandle/save`, params);
const transactBilitySave = params => postForm(path + `/center/tcommon/account/tCommonAccount/save`, params);
const transactSee = params => getAction(path + `/center/ttip/tInspectTip/getInfoById`, params);
const transactManageSee = params => getAction(path + `/center/ttip/handle/tInspectTipHandle/getInfoByTipId`, params);

// 信访问责
const letterList = params => getAction(path + `/center/tcommon/account/tCommonAccount/listByArea`, params);
const letterSave = params => postForm(path + `/center/tcommon/account/tCommonAccount/save`, params);
const letterSee = params => getAction(path + `/center/tcommon/account/tCommonAccount/getInfoById`, params);
const letterDelete = params => postAction(path + `/center/tcommon/account/tCommonAccount/delete`, params);
const letterAccpetNum = params => getAction(path + `/center/ttip/tInspectTip/getSelectAcceptNum`, params);
export {
  transactList,
  transactSave,
  transactBilitySave,
  transactSee,
  transactManageSee,
  letterList,
  letterSave,
  letterSee,
  letterDelete,
  letterAccpetNum
}