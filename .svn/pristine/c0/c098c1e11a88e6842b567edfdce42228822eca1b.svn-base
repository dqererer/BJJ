import { getAction, postAction } from '../manage'
const path = process.env.VUE_APP_BASE_API;

const testDataDemoList = params => getAction(path+`/center/test/testDataDemo/list`, params);
const testDataDemoDelete = params => postAction(path+`/center/test/testDataDemo/delete`, params);
const testDataDemoSave = params => postAction(path+`/center/test/testDataDemo/save`, params);
const testDataDemoSee = params => getAction(path+`/center/test/testDataDemo/getInfoById`, params);

export {
    testDataDemoList,
    testDataDemoDelete,
    testDataDemoSave,
    testDataDemoSee
}