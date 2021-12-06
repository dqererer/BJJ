import { getAction, postAction } from './manage'
const path = process.env.VUE_APP_BASE_API;

const userLogin = params => postAction(`${path}/center/loginNew`, params);//登录
const ueserLogout = params => postAction(`${path}/center/logout`, params);//退出登录
const validateCode = params => getAction(`${path}/validateCode`, params);//验证码
const checkValidateCode = params => postAction(`${path}/checkValidateCode`, params);//校验验证码
const getToken = params => postAction(`${path}/getToken`, params);
const forgetPwd = params => postAction(`${path}/center/sys/user/sendCaptcha`, params);
const checkCaptcha = params => postAction(`${path}/center/sys/user/checkCaptcha`, params);
const changePwd = params => postAction(`${path}/center/sys/user/changePwd`, params);

export {
    userLogin,
    ueserLogout,
    validateCode,
    checkValidateCode,
    getToken,
    forgetPwd,
    checkCaptcha,
    changePwd
}
