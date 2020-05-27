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
	}
};

export default Helper;