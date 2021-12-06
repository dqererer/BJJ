import { getAction, postAction,postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;

const noticeList = params => getAction(path+`/center/tcommon/notice/tCommonNotice/list`, params);
const noticeSee = params => getAction(path+`/center/tcommon/notice/tCommonNotice/getInfoById`, params);
const noticeSave = params => postForm(path+`/center/tcommon/notice/tCommonNotice/save`, params);
const noticeDelete = params => postAction(path+`/center/tcommon/notice/tCommonNotice/delete`, params);

export {
  noticeList,
  noticeSee,
  noticeSave,
  noticeDelete
}
