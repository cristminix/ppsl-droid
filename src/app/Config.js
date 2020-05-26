Config = {
    // api_endpoint : 'http://192.168.1.7:8080/ppsl_api/',
    api_endpoint : 'https://api-ppsl.perumdamtkr.com/',
    api_key : '9c05c647d185d704fa3b5add357dd08777d05b99',
    api_appid : 'ppsl-droid',

    enable_dummy : true,
    debug : true,

    DashboardPage: {
        mustUpdateProfile : false,
    },

    dummy : {
        ChangePasswdPage : {
            old_passwd : '1234',
            new_passwd : 'Test1234',
            repeat_new_passwd : 'Test1234',
        }
    }
 };

 export default Config;
