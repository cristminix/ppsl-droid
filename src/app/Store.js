// Client Map To Server Api
import Proxy from './Proxy';
import Config from './Config';

Store = {
	Survey:{
		getData : (id_user, bulan, tahun, cbSuccess,cbError) => {
			let url  = `${Config.api_endpoint}survey`;
			let data = {user_id:id_user, bulan: bulan, tahun: tahun};
			Proxy.post(url,data,cbSuccess,cbError);
		}
	},
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
		},
		getList(id_user,statusPel,page,searchQuery,cbSuccess,cbError){
			let url  = `${Config.api_endpoint}pelanggan/getList/${id_user}`;
			let data = {user_id:id_user,status_pelanggan:statusPel,search_query:searchQuery,page:page};
			console.log(data);
			Proxy.post(url,data,cbSuccess,cbError);

		}
	},
	RegisterService:{
		doRegister: (nama_lengkap, nik, nomor_hp, email, passwd, repeat_passwd, foto_ktp, foto_ktp_selfi, success, error) =>{
			let url  = `${Config.api_endpoint}registerService`;
			let data = {nama_lengkap:nama_lengkap,nik:nik,nomor_hp:nomor_hp,email:email,
				passwd:passwd,repeat_passwd:repeat_passwd};
			
			let optArgs = {};
			let uploads = [foto_ktp,foto_ktp_selfi];
			let fields = ['foto_ktp','foto_ktp_selfi'];

			uploads.forEach((field, i) => {
				if(field != null){
					let localUri = field;
					let filename = localUri.split('/').pop();

					let match = /\.(\w+)$/.exec(filename);
					let type = match ? `image/${match[1]}` : `image`;
					let fotoObj = { uri: localUri, name: filename, type };
					optArgs[fields[i]] = fotoObj ;
				}
			}); 
			
			Proxy.post(url,data,success,error,optArgs); 
		}
	},
	LoginService : {
		getProfile : (id_user, success, error) => {
			let url  = `${Config.api_endpoint}loginService/getProfile/${id_user}`;
			let data = {user_id:id_user};

			Proxy.post(url,data,success,error);
		},
		getLogin : (username, password, success, error) => {
			let url = `${Config.api_endpoint}loginService`;

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
			
			Proxy.post(url,data,success,error);
		},
		changeProfile : (group_id,user_id,nama_lengkap, nomor_hp, email, foto, success, error) =>{
			let url  = `${Config.api_endpoint}loginService/changeProfile`;
			let data = {group_id:group_id,user_id:user_id,nama_lengkap:nama_lengkap,nomor_hp:nomor_hp,email:email,foto:foto};
			console.log(data);
			let optArgs = null;
			if(foto != null){
				let localUri = foto;
				let filename = localUri.split('/').pop();

				let match = /\.(\w+)$/.exec(filename);
				let type = match ? `image/${match[1]}` : `image`;
				let fotoObj = { uri: localUri, name: filename, type };
				optArgs = {
					foto : fotoObj
				}
			}
			Proxy.post(url,data,success,error,optArgs);
		}
	}
};

export default Store;