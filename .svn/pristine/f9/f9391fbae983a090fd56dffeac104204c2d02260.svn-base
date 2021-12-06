import { getAction, postAction,postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;

const sysSubList = params => getAction(path + `/center/syssub/sysSub/list`, params);
const sysSubDelete = params => postAction(path + `/center/syssub/sysSub/delete`, params);
const sysSubSave = params => postForm(path + `/center/syssub/sysSub/save`, params);
const sysSubSee = params => getAction(path + `/center/syssub/sysSub/getInfoById`, params);
const sysSubTreeData = params => getAction(path + `/center/syssub/sysSub/treeData`, params);

export {
  sysSubList,
  sysSubDelete,
  sysSubSave,
  sysSubSee,
  sysSubTreeData
}