import {AsyncStorage} from 'react-native';

Session = {
	setUserData : (key, obj) => {
		AsyncStorage.setItem(key, JSON.stringify(obj));
	},
	userData : (key, cbSuccess, cbError) =>{
		AsyncStorage.getItem(key, (error, result) => {
            if(result) {
            	return cbSuccess(JSON.parse(result));
            }
            cbError(error);
        });
	}
	getAccount : (cbSuccess, cbError) => {
		Session.userData('account', cbSuccess, cbError);
	},
	getFullProfile : (cbSuccess, cbError) => {
		Session.userData('full_profile', cbSuccess, cbError);
	}
};

export default Session;