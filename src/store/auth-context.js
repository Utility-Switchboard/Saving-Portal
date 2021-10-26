
import React, { useState } from 'react';

const AuthContext = React.createContext({
    profile: (data) => {},
    user: () => {}
});


export const AuthContextProvider = (props) => {

    const [userProfile, updateUserProfile] = useState({});

    const ProfileObj = (data) => {

        // Data model 
        const data_model = {
            email: data.email,
            familyName: data.familyName,
            givenName: data.givenName,
            googleId: data.googleId,
            imageUrl: data.imageUrl,
            name: data.name,
        }

        // Retur data
        return updateUserProfile({ ...userProfile, data_model });
    }

    const contextValue = {
        profile: ProfileObj,
        user: userProfile
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;
