//中央首页
import { getAction} from '../manage'
const path = process.env.VUE_APP_BASE_API;

const homeTipCounts = params => getAction(path + `/center/ttip/tInspectTip/getTipCounts`, params);
const homeAccountCountByArea = params => getAction(path + `/center/tcommon/account/tCommonAccount/getAccountCountByArea`, params);
const homeTipTopFive = params => getAction(path + `/center/ttip/tInspectTip/getTipTopFive`, params);
const homeTransferByCity = params => getAction(path + `/center/ttip/tInspectTip/getTransferByCity`, params);

export {
  homeTipCounts,
  homeAccountCountByArea,
  homeTipTopFive,
  homeTransferByCity
}