import Config from './Config';
import axios from 'axios';
Proxy={
	post : (url,postData,cbSuccess,cbError,optArgs) => {
		var formData = new FormData();

		for(let key in postData){
            formData.append(key, postData[key]);
		}
		if(Config.debug){
			console.log(`NET,POST:${url}\n`);		
		}
        try{
            if(typeof optArgs === 'object'){
                for(n in optArgs){
                    let f = optArgs[n];
                    formData.append(n,f);
                }
            }
        }catch(e){
            console.log(e);
        }
		axios({
            method:'post',
            url: url,
            data:formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'X-API-KEY' : Config.api_key, 
                'X-APP-ID' : Config.api_appid
            },

        })
        .then((response) => {
            cbSuccess(response.data);
        })
        .catch((error) => {
            cbError(error);
            console.log(error)
            alert(error)
        });

		
	},
	post_legacy : (url,postData,cbSuccess,cbError) => {
		var formData = new FormData();

		for(let key in postData){
            formData.append(key, postData[key]);
		}
		if(Config.debug){
			console.log(`NET,POST:${url}\n`);		
		}
		return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'X-API-KEY' : Config.api_key, 
                'X-APP-ID' : Config.api_appid
            },
            body: formData
        }).then((response) =>{ 
            response.json().then((res) => {
                cbSuccess(res);
            })
        })
        .catch((error) => {
            console.log(error);
            cbError(error);
        })
        .done();
	},

};

export default Proxy;