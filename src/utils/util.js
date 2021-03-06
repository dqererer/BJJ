export function listFieldAdd(reponse) {
  const res = {
    data: null
  };
  res.data = reponse.data.map(item => {
    item.stateName = this.changeState(item.state);
    return item;
  });
  return res;
}
export function changeState(state) {
  if (state == 0) {
    return "未归档";
  } else if (state == 1) {
    return "部分归档";
  } else if (state == 2) {
    return "已归档";
  }
}
//
const handlePieData = (type, rate)=>{
  let value = rate.split('%')[0];
  let otherValue = (100 - value).toFixed(2);
  let arr = [
    {
      name: type,
      value: value,
    }, {
      name: '其他',
      value: otherValue
    }
  ]
  return arr;
}
export {
  handlePieData
}