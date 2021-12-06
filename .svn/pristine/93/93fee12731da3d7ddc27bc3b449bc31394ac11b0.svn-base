import { getAction, postAction } from '../manage'
const path = process.env.VUE_APP_BASE_API;
//用户类型
const roleList = params => getAction(`${path}/center/sys/role/list`,params);//角色列表
const roleDelete = params => postAction(`${path}/center/sys/role/delete`,params);//角色删除
const roleDetail = params => getAction(`${path}/center/sys/role/getRoleById`,params);//根据角色ID获取角色
const roleSave = params => postAction(`${path}/center/sys/role/save`,params);//角色保存

const roleAssign = params => postAction(`${path}/center/sys/role/assignrole`,params);//角色分配
const roleFindUser = params => getAction(`${path}/center/sys/role/findUser`,params);//根据角色ID获取用户
const roleOut = params => postAction(`${path}/center/sys/role/outrole`,params);//角色分配-从角色中移除用户
const findAllRoleUser = params => getAction(`${path}/center/sys/role/findAllRoleUser`,params);//根据角色ID获取用户

const roleUsers = params => getAction(`${path}/center/sys/role/users`,params);//角色分配-根据部门编号获取用户列表
const roleCheckEnname = params => getAction(`${path}/center/sys/role/checkEnname`,params);//验证角色英文名是否有效
const roleCheckName = params => getAction(`${path}/center/sys/role/checkName`,params);//验证角色名是否有效

const roleUserList = params => getAction(`${path}/center/tinspect/team/commonMemberTeam/findTeamRoleUserList`,params);


export {
    roleList,
    roleDelete,
    roleDetail,
    roleSave,
    roleAssign,
    roleFindUser,
    roleOut,
    roleUsers,
    roleCheckEnname,
    roleCheckName,
    roleUserList,
    findAllRoleUser
}