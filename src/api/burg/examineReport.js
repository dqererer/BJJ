//督察报告
import { getAction, postAction, postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;

const reportList = params => getAction(path + `/center/tinspect/report/tInspectReport/list`, params);
const reportSee = params => getAction(path + `/center/tinspect/report/tInspectReport/getInfoById`, params);
const reportDelete = params => postAction(path + `/center/tinspect/report/tInspectReport/delete`, params);
const reportSave = params => postForm(path + `/center/tinspect/report/tInspectReport/save`, params);

export {
  reportList,
  reportSee,
  reportDelete,
  reportSave
}