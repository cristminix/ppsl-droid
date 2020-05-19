Helper = {
    validateEmail: function (mail) 
    {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true);
        }
          return (false);
    },
    mysqlDate(jsDate){
    	var year, month, day;
	    year = String(jsDate.getFullYear());
	    month = String(jsDate.getMonth() + 1);
	    if (month.length == 1) {
	        month = "0" + month;
	    }
	    day = String(jsDate.getDate());
	    if (day.length == 1) {
	        day = "0" + day;
	    }
	    return year + "-" + month + "-" + day;
    }
};

export default Helper;