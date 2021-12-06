import { getAction, postAction,postForm } from '../manage'
const path = process.env.VUE_APP_BASE_API;

const testDataMainList = params => getAction(path+`/center/zhuzi/testDataMain/list`, params);
const testDataMainDelete = params => postAction(path+`/center/zhuzi/testDataMain/delete`, params);
const testDataMainSave = params => postForm(path+`/center/zhuzi/testDataMain/save`, params);
const testDataMainSee = params => getAction(path+`/center/zhuzi/testDataMain/getInfoById`, params);

export {
    testDataMainList,
    testDataMainDelete,
    testDataMainSave,
    testDataMainSee
}