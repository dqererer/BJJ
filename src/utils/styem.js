import store from '@/store'
import { getFileInfo, fileLogSee } from "@/api/file";
import { downLoadZip } from "@/utils/zipdownload";
import { seeting } from "@/utils/deploy";
import axios from 'axios';
//From表单清除
export function resetFieldsTap(forName) {
	const arr = Object.keys(this.$refs)
	if (arr.indexOf(forName) > -1 && this.$refs[forName]) {
		this.$refs[forName].resetFields();
	} else {
		return
	}
}

export function tabControlShow(num) {
	this.$nextTick(function () {
		this.$refs.tabs.$children[0].$refs.tabs[num].style.display = "inline-block";
	});
}
export function tabControlHide(num) {
	this.$nextTick(function () {
		this.$refs.tabs.$children[0].$refs.tabs[num].style.display = "none";
	});
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
	id = id || 'id'
	parentId = parentId || 'pId'
	children = children || 'children'
	rootId = rootId || '0'

	//对源数据深度克隆
	const cloneData = JSON.parse(JSON.stringify(data))
	//循环所有项
	const treeData = cloneData.filter(father => {
		const branchArr = cloneData.filter(child => {
			//返回每一项的子级数组
			return father[id] === child[parentId]
		});
		branchArr.length > 0 ? father.children = branchArr : '';

		//返回第一层
		return father[parentId] === rootId;
	});
	return treeData != '' ? treeData : data;
}

export function format(time, fmt) {
	var o = {
		"M+": time.getMonth() + 1,                 //月份 
		"d+": time.getDate(),                    //日 
		"h+": time.getHours(),                   //小时 
		"m+": time.getMinutes(),                 //分 
		"s+": time.getSeconds(),                 //秒 
		"q+": Math.floor((time.getMonth() + 3) / 3), //季度 
		"S": time.getMilliseconds()             //毫秒 
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}
export async function getSingleInfo(fileId, teamId) {
	const reponse = await getFileInfo({ ids: fileId });
	const subject = reponse.data;
	const fileUrl = subject[0].save_path;
	const fileName = subject[0].file_name;
	const state = subject[0].object_id;
	handleFileLogSee(fileId, fileName, '0', teamId);
	if (state === "FASTDFS") {
		const fastInfo = localStorage.getItem("fastInfo");
		const fastSubject = JSON.parse(fastInfo)
		const url = fastSubject.downloadUrl + fileUrl;
		noSourcedownLoad(fileUrl,fileName)
		// window.location.href = fastSubject.downloadUrl + fileUrl + "?fileName=" + fileName;
		// const aLink = document.createElement('a')
		// aLink.href = fastSubject.downloadUrl + fileUrl;
		// aLink.setAttribute('download', fileName)
		// document.body.appendChild(aLink)
		// aLink.click()
		// document.body.removeChild(aLink)
	} else {
		getdownLoadZip(fileUrl)
	}
}

export async function getKnownSingleInfo(fileId, fileUrl, fileName, state, teamId) {
	handleFileLogSee(fileId, fileName, '0', teamId);
	if (state === "FASTDFS") {
		noSourcedownLoad(fileUrl,fileName)
		// const fastInfo = localStorage.getItem("fastInfo");
		// const fastSubject = JSON.parse(fastInfo)
		// const aLink = document.createElement('a')
		// aLink.href = fastSubject.downloadUrl + fileUrl + "?fileName=" + fileName;
		// aLink.setAttribute('download', "")
		// aLink.setAttribute("target", "_blank");
		// document.body.appendChild(aLink)
		// aLink.click()
		// document.body.removeChild(aLink)
	} else {
		getdownLoadZip(fileUrl)
	}
}
export function noSourcedownLoad(url, fileName) {
	axios({
		method: 'get',
		url: "/noSource/" + url,
		responseType: 'blob',
	}).then(res => {
		const aLink = document.createElement('a')
		var blob = new Blob([res.data], { type: 'application/zip' })
		aLink.href = URL.createObjectURL(blob)
		aLink.setAttribute('download', fileName) // 设置下载文件名称
		document.body.appendChild(aLink)
		aLink.click()
		document.body.removeChild(aLink)
	})
}
//getdownLoadZip
export function getdownLoadZip(path) {
	downLoadZip("/center/file/downloadFile", { savePath: path });
}
//文件预览
export async function filePreview(fileId, teamId) {
	const reponse = await getFileInfo({ ids: fileId });
	const subject = reponse.data;
	const fileUrl = subject[0].save_path;
	const fileName = subject[0].file_name;
	const state = subject[0].object_id;
	handleFileLogSee(fileId, fileName, '1', teamId);
	handlePreview(state, fileUrl);
}
export async function filetKnownPreview(fileId, fileUrl, fileName, state, teamId) {
	handleFileLogSee(fileId, fileName, '1', teamId);
	handlePreview(state, fileUrl);
}
function handlePreview(state, fileUrl) {
	const aLink = document.createElement("a");
	const baseUrl = process.env.VUE_APP_BASE_API;
	if (state === "FASTDFS") {
		const fastInfo = localStorage.getItem("fastInfo");
		const fastSubject = JSON.parse(fastInfo);
		const path = fastSubject.downloadUrl + fileUrl;
		aLink.href = `${seeting.filePreviewIP}/?furl=${path}`;
		aLink.setAttribute("target", "_blank");
		document.body.appendChild(aLink);
		aLink.click();
		document.body.removeChild(aLink)
	} else {
		let path;
		if (process.env.NODE_ENV === "production") {
			path = `${seeting.filePreviewIP}/?furl=${seeting.onLineIP}/envMonitor/center/file/downloadFile?savePath=${fileUrl}`;
		} else {
			path = `${seeting.filePreviewIP}/?furl=${seeting.localIP}${baseUrl}/center/file/downloadFile?savePath=${fileUrl}`;
		}
		aLink.href = path;
		aLink.setAttribute("target", "_blank");
		document.body.appendChild(aLink);
		aLink.click();
		document.body.removeChild(aLink)
	}
}

export async function handleFileLogSee(fileId, fileName, type, teamId) {
	const reponse = await fileLogSee({
		fileId,
		fileName,
		type,
		teamId
	})
}

function downloadIamge(imgsrc, name) {//下载图片地址和自定义图片名称
	let image = new Image();
	// 解决跨域 Canvas 污染问题
	image.setAttribute("crossOrigin", "anonymous");
	image.onload = function () {
		let canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		let context = canvas.getContext("2d");
		context.drawImage(image, 0, 0, image.width, image.height);
		let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
		let a = document.createElement("a"); // 生成一个a元素
		let event = new MouseEvent("click"); // 创建一个单击事件
		a.download = name || "qrcode.jpg"; // 设置图片名称
		a.href = url; // 将生成的URL设置为a.href属性
		a.dispatchEvent(event); // 触发a的单击事件
	};
	image.src = imgsrc;
}
export function hasPermission(permissionsFlag) {
	const all_permission = "*:*:*";
	const permissions = store.getters.permissions;
	let hasPermission = false;
	if (permissions) {
		hasPermission = permissions.some(permissionItem => {
			return (
				all_permission === permissionItem ||
				permissionsFlag.includes(permissionItem)
			);
		});
	}
	return hasPermission;
}