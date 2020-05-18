import Config from './Config';
Proxy={
	post : (url,postData,cbSuccess,cbError) => {
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
	} 
};

export default Proxy;