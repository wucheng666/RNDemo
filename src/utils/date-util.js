/**
 * Created with of666.
 * Date: 13-6-7
 * Time: 下午2:50
 */

export default class DateUtil{

    static getDateString = function (date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    };
    static getAge(d){
        let b = "";
        if(d){
            let birthday = Number(new Date(d).format('yyyyMMdd'));
            let now = Number(new Date().format("yyyyMMdd"));
            b = parseInt((now - birthday)/10000);
        }
        return b;
    }
}

Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};

Date.prototype.addDays = function (d) {
  this.setDate(this.getDate() + d);
};

Date.prototype.addWeeks = function (w) {
  this.addDays(w * 7);
};

Date.prototype.addMonths = function (m) {
  var d = this.getDate();
  this.setMonth(this.getMonth() + m);
  //if (this.getDate() < d)
  //  this.setDate(0);
};

DateUtil.isOutMonth = function(fm, lm){
  fm = fm.split("-");
  lm = lm.split("-");
  return (lm[0] - fm[0]) * 12 + (lm[1] - fm[1]) + (lm[2] - fm[2] > -1 ? 1 : 0);
}