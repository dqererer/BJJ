import { getAction } from '../../manage'
const path = process.env.VUE_APP_BASE_API;

const dictListType = params => getAction(`${path}/center/sys/dict/listData`, params);
const dictName = params => getAction(`${path}/center/sys/dict/getDictLabel`, params);
const getSuperviseTypeInfo= params => getAction(`${path}/center/seo/getSuperviseTypeInfo`, params);

export {
    dictListType,
    dictName,
    getSuperviseTypeInfo
}