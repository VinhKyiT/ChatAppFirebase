export default function TimeConverter(timestamp) {
  let a = new Date(timestamp * 1000);
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time =
    date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}
export function GetDate(timestamp) {
  let a = new Date(timestamp * 1000);
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let result = date + ' ' + month + ' ' + year;
  return result;
}

export function GetTime(timestamp) {
  let a = new Date(timestamp * 1000);

  let hour = a.getHours();
  let min = a.getMinutes();
  let result = hour + ':' + min;
  return result;
}
