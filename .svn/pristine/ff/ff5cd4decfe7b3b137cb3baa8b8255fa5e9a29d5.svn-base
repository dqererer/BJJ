import { getAction, postAction } from '../manage'
const path = process.env.VUE_APP_BASE_API;

const testTreeList = params => getAction(path+`/center/tree/testTree/list`, params);
const testTreeDelete = params => postAction(path+`/center/tree/testTree/delete`, params);
const testTreeSave = params => postAction(path+`/center/tree/testTree/save`, params);
const testTreeSee = params => getAction(path+`/center/tree/testTree/getInfoById`, params);
const testTreeTreeData = params => getAction(path+`/center/tree/testTree/treeData`, params);

export {
    testTreeList,
    testTreeDelete,
    testTreeSave,
    testTreeSee,
		testTreeTreeData
}