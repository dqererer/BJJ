import { getAction, postAction } from './manage'
const path = process.env.VUE_APP_BASE_API;
//菜单
const findSysByUser = params => getAction(`${path}/center/syssub/sysSub/findSysByUser`);
const getUserSysMenu = params => getAction(`${path}/center/sys/menu/getUserSysMenu`,params);
const getSubSystem = params => getAction(`${path}/center/analyse/getWorkTypeInfo`);
export {
    findSysByUser,
    getUserSysMenu,
    getSubSystem
}