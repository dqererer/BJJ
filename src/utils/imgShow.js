import axios from 'axios'
import { getToken } from '@/utils/auth'

const mimeMap = {
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    zip: 'application/zip'
}
const path = process.env.VUE_APP_BASE_API;
export function imgShow(url, savePath) {
    return new Promise(resolve => {
        axios({
            method: 'get',
            url: path + url,
            responseType: 'blob',
            headers: { 'Authorization': getToken() },
            params: {
                savePath
            }
        }).then(res => {
            const src = resolveBlob(res, mimeMap.zip)
            resolve(src)
        })
    })

}
/**
 * 解析blob响应内容并下载
 * @param {*} res blob响应内容
 * @param {String} mimeType MIME类型
 */
export function resolveBlob(res, mimeType) {
    var blob = new Blob([res.data], { type: mimeType })
    const imgsrc = URL.createObjectURL(blob)
    return imgsrc;
}

