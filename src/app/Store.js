// Client Map To Server Api
import Proxy from './Proxy';
import Config from './Config';

Store = {
	Pelanggan : {
		getMinMaxDate : (id_user, cb) => {
			let url  = `${Config.api_endpoint}pelanggan/getMinMaxDate/${id_user}`;
			let data = {user_id:id_user};

			Proxy.post(url,data,cb,(error)=>{});
		},
		getStatisticData : (id_user,start_date,end_date,cb)=> {
			let url  = `${Config.api_endpoint}pelanggan/getStatisticData/${id_user}`;
			let data = {user_id:id_user,dt_start:start_date,dt_end:end_date};

			Proxy.post(url,data,cb,(error)=>{});
		}
	},
	LoginService : {
		getFullProfile : (id_user, success, error) => {
			let url  = `${Config.api_endpoint}loginService/getFullProfile/${id_user}`;
			let data = {user_id:id_user};

			Proxy.post(url,data,success,error);
		},
		getLogin : (username, password, success, error) => {
			let url = `${Config.api_endpoint}/loginService`;

			let data = {
	            username : username,
	            password : password
	        };

	        Proxy.post(url,data,success,error);
		},
		forgetPassword: (email,success,error) => {
			let url  = `${Config.api_endpoint}loginService/forgetPassword`;
			let data = {email:email};

			Proxy.post(url,data,success,error);
		},
         
		changePassword: (user_id,old_passwd,new_passwd,repeat_new_passwd,success,error) => {
			let url  = `${Config.api_endpoint}loginService/changePassword`;
			let data = {user_id:user_id,old_passwd:old_passwd,new_passwd:new_passwd,repeat_new_passwd:repeat_new_passwd};
			console.log(data);
			Proxy.post(url,data,success,error);
		}
	}
};

export default Store;