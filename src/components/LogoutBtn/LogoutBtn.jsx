import React from 'react';
// Google 
import { GoogleLogout } from 'react-google-login';

// Google Client ID
const clientId = '887413800693-e0f5qpv0cpdnt81kij6kij86itbb88rh.apps.googleusercontent.com';

function Logout() {

    const onSuccess = () => {
        console.log('Logout made successfully');
        window.location.assign('https://localhost:3000');
    };

    return (
            <GoogleLogout
                clientId={clientId}
                render={renderProps => (
                    <>
                        <button type="button" className="sidebar-btn" id="logout-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</button>
                    </>
                )}
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
    );
}

export default Logout;