import { getAction, postAction } from '../manage'
const path = process.env.VUE_APP_BASE_API;
//菜单
const menuList = params => getAction(`${path}/center/sys/menu/list`,params);//菜单列表
const menuGetMenuById = params => getAction(`${path}/center/sys/menu/getMenuById`,params);//根据ID获取菜单数据
const menuTree = params => getAction(`${path}/center/sys/menu/treeData`,params);//菜单JSON数据
const menuSave = params => postAction(`${path}/center/sys/menu/save`,params);//菜单保存
const menuDelete = params => postAction(`${path}/center/sys/menu/delete`,params);//菜单删除
const menuUpdateSort = params => postAction(`${path}/center/sys/menu/updateSort`,params);//批量修改菜单排序
const menuFormView = params => getAction(`${path}/center/sys/menu/formView`,params);//批量修改菜单排序
const getRouters = params => getAction(`${path}/center/sys/menu/getUserMenu`,params);//获取当前用户授权菜单
const getMenuByParentId = params => getAction(`${path}/center/sys/menu/getMenuByParentId`,params);//parentId=1根据parentId获取子菜单



export {
    menuList,
    menuGetMenuById,
    menuTree,
    menuSave,
    menuDelete,
    menuUpdateSort,
    menuFormView,
    getRouters,
    getMenuByParentId
}