import React from 'react';

export const user_data = {
    department: null,
    elevated: 0,
    user_id: null,
    authenticated: false
};

export const UserDataContext = React.createContext(
    user_data
);