import { getAction, postAction, postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;

// 工作简报
const bulletinList = params => getAction(path + `/center/tcommon/notice/tCommonNotice/list`, params);
const bulletinSave = params => postForm(path + `/center/tcommon/notice/tCommonNotice/save`, params);
const bulletinSee = params => getAction(path + `/center/tcommon/notice/tCommonNotice/getInfoById`, params);
const bulletinDelete = params => postAction(path + `/center/tcommon/notice/tCommonNotice/delete`, params);

export {
  bulletinList,
  bulletinSave,
  bulletinSee,
  bulletinDelete
}