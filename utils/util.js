const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const formatDiaryDate =  function (date) {
  const weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const currDate = new Date(date);
  const year = currDate.getFullYear();
  const month = currDate.getMonth() + 1;
  const day = currDate.getDate();
  const week = currDate.getDay();
  const hours = currDate.getHours();
  const minutes = currDate.getMinutes();
  return {
    week: weeks[week],
    day,
    date: `${year}.${month > 10 ? month : '0'+ month}`,
    time: `${hours}:${minutes > 10 ? minutes : '0' + minutes}`,
  }
};


module.exports = {
  formatTime: formatTime,
  formatDiaryDate,
}
