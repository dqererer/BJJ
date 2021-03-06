import { axios } from '@/utils/request'
const path = process.env.VUE_APP_BASE_API;

export function getAction(url, parameter) {
    return axios({
        url: url,
        method: 'get',
        params: parameter
    })
}
export function postAction(url, parameter) {
    return axios({
        url: url,
        method: 'post',
        params: parameter
    })
}
export function getForm(url, data, parameter) {
    return axios({
        url: url,
        method: 'get',
        data: data,
        params: parameter
    })
}
export function postForm(url, data) {
    return axios({
        url: url,
        method: 'post',
        data: data
    })
}

export function exportUser(query) {
    return axios({
        url: path + '/center/ttip/tInspectTip/export',
        method: 'get',
        params: query
    })
}