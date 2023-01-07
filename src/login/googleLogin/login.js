import React from 'react';
import Cookies from 'universal-cookie';
import { GoogleLogin } from 'react-google-login';

const clientId = "1094117909000-4t2s641gum6k7l5dibm4l48g5aauua67.apps.googleusercontent.com"

function GoogleLoginButton() {
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
  };

  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default GoogleLoginButton;
