// 资料管理
import { getAction, postAction,postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;

// 资料目录
const catalogList = params => getAction(path+`/center/tcommon/filedictionary/tFileDirectory/findListInfo`, params);
const catalogDelete = params => postAction(path+`/center/tcommon/filedictionary/tFileDirectory/delete`, params);
const catalogSave = params => postForm(path+`/center/tcommon/filedictionary/tFileDirectory/save`, params);
const catalogySee = params => getAction(path+`/center/tcommon/filedictionary/tFileDirectory/getInfoById`, params);

// 资料清单
const manageList = params => getAction(path+`/center/tcommon/material/tCommonMaterial/list`, params);
const manageDelete = params => postAction(path+`/center/tcommon/material/tCommonMaterial/delete`, params);
const manageSave = params => postForm(path+`/center/tcommon/material/tCommonMaterial/save`, params);
const manageSee = params => getAction(path+`/center/tcommon/material/tCommonMaterial/getInfoById`, params);

//全文检索
const fullSearch = params => getAction(path+`/center/tcommon/material/tCommonMaterial/findIndexPage`, params);

export {
    catalogList,
    catalogDelete,
    catalogSave,
    catalogySee,
    manageList,
    manageDelete,
    manageSave,
    manageSee,
    fullSearch
}