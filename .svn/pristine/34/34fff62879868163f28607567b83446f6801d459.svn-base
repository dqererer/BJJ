// 人员管理
import { getAction, postAction, postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;

const personnelList = params => getAction(path + `/center/tcommon/member/tCommonMember/list`, params);
const personnelDelete = params => postAction(path + `/center/tcommon/member/tCommonMember/delete`, params);
const personnelSave = params => postForm(path + `/center/tcommon/member/tCommonMember/save`, params);
const personnelSee = params => getAction(path + `/center/tcommon/member/tCommonMember/getInfoById`, params);
const personnelCheckData = params => getAction(path + `/center/tcommon/member/tCommonMember/checkData`, params);


//人员使用
const basicAna = params => getAction(path + `/center/tcommon/member/tCommonMember/basicAna`, params);   //基本信息
const timesAna = params => getAction(path + `/center/tcommon/member/tCommonMember/timesAna`, params);   //饼图
const areaAna = params => getAction(path + `/center/tcommon/member/tCommonMember/areaAna`, params);   //瀑布图
const areaPctAna = params => getAction(path + `/center/tcommon/member/tCommonMember/areaPctAna `, params);   //瀑布图

export {
    personnelList,
    personnelDelete,
    personnelSave,
    personnelSee,
    personnelCheckData,
    basicAna,
    timesAna,
    areaAna,
    areaPctAna
}