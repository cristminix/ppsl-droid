import React from 'react';
import PPSLApp from './src/components/PPSLApp'; 

function App() {
  return (
      <PPSLApp />
  );
}
App.config = {
  api_endpoint : 'https://api-ppsl.perumdamtkr.com/',
  api_key : '9c05c647d185d704fa3b5add357dd08777d05b99',
  api_appid : 'ppsl-droid'
};
App.helper = {
  validateEmail: function (mail) 
  {
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      {
          return (true);
      }
        return (false);
  }
}
export default App;