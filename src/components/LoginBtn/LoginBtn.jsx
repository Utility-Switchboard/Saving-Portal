import React, { useContext } from 'react';
import './LoginBtn.css';

// Swal
import swal from '@sweetalert/with-react';
import { IconContext } from "react-icons";
import { ImSad } from 'react-icons/im';
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../../utils/utils';
// AuthContext
import AuthContext from '../../store/auth-context';

// Google Client ID
const clientId = '887413800693-e0f5qpv0cpdnt81kij6kij86itbb88rh.apps.googleusercontent.com';

function LoginBtn() {
  // Access to AuthConter
  const authCtx = useContext(AuthContext);

  const onSuccess = (res) => {
    refreshTokenSetup(res);
    authCtx.profile(res.profileObj);
  };

  const onFailure = (res) => {

    console.log(res);

    if (res.error === 'popup_closed_by_user') {
      swal({
        closeOnClickOutside: false,
        buttons: {
          cancel: {
            text: "Go back",
            value: false,
            visible: true
          }
        },
        content: (
          <div className="swal-text-custom">
            <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
              <ImSad />
            </IconContext.Provider>
            <h1>Failed to login, please try again.</h1>
          </div>
        )
      });
    }

    if (res.error === 'idpiframe_initialization_failed') {
      swal({
        closeOnClickOutside: false,
        buttons: {
          cancel: {
            text: "Go back",
            value: false,
            visible: true
          }
        },
        content: (
          <div className="swal-text-custom">
            <IconContext.Provider value={{ color: '#D338AE', size: '50px' }}>
              <ImSad />
            </IconContext.Provider>
            <h1>Please use the browser as normal mode and try again.</h1>
          </div>
        )
      });
    }

  };

  return (
      <GoogleLogin
        clientId={clientId}
        render={renderProps => (
          <>
            <input data-cy="btn-login" type="submit" className="btn-login" value="Sign In With Google" onClick={renderProps.onClick} disabled={renderProps.disabled} />
          </>
        )}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
  );
}

export default LoginBtn;