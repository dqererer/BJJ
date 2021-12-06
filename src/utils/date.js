const getCurrentDate = () => {
  const nowDate = new Date();
  const date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
  }
  const newmonth = date.month > 9 ? date.month : '0' + date.month
  const day = date.date > 9 ? date.date : '0' + date.date
  const updateTime = date.year + '年' + newmonth + '月' + day +'日'
  return updateTime
}
const getCurrentTime = () => {
  const date = new Date();
  const seperator1 = "-"; 
  const seperator2 = ":";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  const currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + " " + date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds();
  return currentdate;
}
export {
  getCurrentDate,
  getCurrentTime
}