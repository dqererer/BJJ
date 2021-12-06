import { getAction ,postAction } from '../manage'
const path = process.env.VUE_APP_BASE_API;

const getInfo = params => getAction(`${path}/center/sys/user/getUserInfo`,params);//根据登录名获取用户

//用户管理
const listUser = params => getAction(`${path}/center/sys/user/list`,params);//用户列表
const userDelete = params => postAction(`${path}/center/sys/user/delete`,params);//删除用户
const userSee = params => getAction(`${path}/center/sys/user/getUserById`,params);//查看用户

//用户添加
const userSave = params => postAction(`${path}/center/sys/user/save`,params);//保存用户 传id为修改 不传为保存
const userCheckEmail = params => getAction(`${path}/center/sys/user/checkEmail`,params);//验证邮箱是否有效
const userCheckLoginName = params => getAction(`${path}/center/sys/user/checkLoginName`,params);//验证登录名是否有效
const userModifyPwd= params => postAction(`${path}/center/sys/user/modifyPwd`,params);//修改用户密码
const userTreeData= params => getAction(`${path}/center/sys/user/treeData`,params);//获取用户树形结构
const userExport= params => getAction(`${path}/center/sys/user/export`,params);
const userTemplate= params => getAction(`${path}/center/sys/user/import/template`,params);

export {
    getInfo,
    listUser,
    userDelete,
    userSee,
    userSave,
    userCheckEmail,
    userCheckLoginName,
    userModifyPwd,
    userTreeData,
    userExport,
    userTemplate
}