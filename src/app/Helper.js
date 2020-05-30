Helper = {
    getDateStr(mysqlDateTimeStr){
		let dateStrArr = mysqlDateTimeStr.split(' ');
		return dateStrArr[0];
	},
    mysqlDate(jsDate){
    	return jsDate.toJSON().slice(0, 10);
	},
	getCurrentDateStr(){
		let __dt    = new Date();
		let __bulan = __dt.getMonth()+1;
		let __tahun = __dt.getFullYear();
		let __hari  = __dt.getDay();
		return `${__tahun}-${__bulan}-${__hari}`;
	},
	delay:function(callback, ms) {
		var timer = 0;
		return function() {
		  var context = this, args = arguments;
		  clearTimeout(timer);
		  timer = setTimeout(function () {
			callback.apply(context, args);
		  }, ms || 0);
		};
	  }
};

export default Helper;