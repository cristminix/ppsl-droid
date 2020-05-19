// Client Map To Server Api
import Proxy from './Proxy';
import Config from './Config';

Store = {
	Pelanggan : {
		getMinMaxDate : (id_user, cb) => {
			let url  = `${Config.api_endpoint}pelanggan/getMinMaxDate/${id_user}`;
			let data = {user_id:id_user};

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
		}
	}
};

export default Store;