import { getAction ,postAction } from '../manage'
const path = process.env.VUE_APP_BASE_API;
//机构管理
const officeTreeData = params => getAction(`${path}/center/sys/office/treeData`,params);//获取机构JSON数据
const officeList = params => getAction(`${path}/center/sys/office/list`,params);//机构列表数据
const officeGetOfficeById = params => getAction(`${path}/center/sys/office/getOfficeById`,params);//根据机构ID获取机构
const officeSave = params => postAction(`${path}/center/sys/office/save`,params);//机构保存
const officeDelete = params => postAction(`${path}/center/sys/office/delete`,params);//删除机构

//区域
const areaTreeData = params => getAction(`${path}/center/sys/area/treeData`,params);//区域JSON数据
const areaList = params => getAction(`${path}/center/sys/area/list`,params);//区域列表数据
const areaGetOfficeById = params => getAction(`${path}/center/sys/area/getAreaById`,params);//根据区域ID获取区域
const areaSave = params => postAction(`${path}/center/sys/area/save`,params);//区域保存
const areaDelete = params => postAction(`${path}/center/sys/area/delete`,params);//区域删除
const areaTreeNew = params => getAction(`${path}/center/sys/area/treeDataNew`,params);//区域JSON数据


export {
    officeTreeData,
    officeList,
    officeGetOfficeById,
    officeSave,
    officeDelete,
    areaList,
    areaTreeData,
    areaGetOfficeById,
    areaSave,
    areaDelete,
    areaTreeNew
}