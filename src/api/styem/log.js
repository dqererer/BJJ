import { getAction, postAction  } from '../manage'
const path = process.env.VUE_APP_BASE_API;
//日志
const logList = params => getAction(`${path}/center/sys/log/list`,params);//日志列表
const logStatistics = params => getAction(`${path}/center/sys/log/statistics`,params);//日志统计

//字典
const dictList = params => getAction(`${path}/center/sys/dict/list`,params);//字典列表
const dictDetail = params => getAction(`${path}/center/sys/dict/getDictById`,params);
const dictListData = params => getAction(`${path}/center/sys/dict/listData`,params);//根据字典类型获取字典
const dictTreeData = params => getAction(`${path}/center/sys/dict/treeData`,params);
const dictSave = params => postAction(`${path}/center/sys/dict/save`,params);
const dictDelete = params => postAction(`${path}/center/sys/dict/delete`,params);
const dictTypeList = params => getAction(`${path}/center/sys/dict/typeList`,params);

export {
  logList,
  logStatistics,
  dictList,
  dictDetail,
  dictListData,
  dictTreeData,
  dictSave,
  dictDelete,
  dictTypeList
}