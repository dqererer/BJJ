import router from "../router";

const storage = () => {
  var userJsonStr = sessionStorage.getItem('user');
}
const setRouters = (key, value) => {
  if (['inspectInfo', 'topbar_router', 'userInfo' ,'areaInfo' ].includes(key)) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  else {
    let obj = getStorageRouters('routers') || {};
    obj[key] = value;
    sessionStorage.setItem('routers', JSON.stringify(obj));
  }
}
const getStorageRouters = (key) => {
  let routers = JSON.parse(sessionStorage.getItem(key));
  return routers
}
const getItem = (key) =>{
  return sessionStorage.getItem(key)
}
const setItem = (key,value)=>{
  sessionStorage.setItem(key,value );
}
export {
  storage,
  setRouters,
  getStorageRouters,
  getItem,
  setItem
}