import React from 'react'; 
import {useGoogleOneTapLogin} from 'react-google-one-tap-login';


function GoogleOneTap() {  
    useGoogleOneTapLogin({
        onError:(error) => console.log(error),
        onSuccess:(response) => {
          console.table(response);
 
        },
        googleAccountConfigs: {
          client_id: "892848322668-c6cgcvrt17nphd9qptci98l82dilfmvn.apps.googleusercontent.com"
        },
      }); 
    return(<></>); 
}

export default GoogleOneTap
 