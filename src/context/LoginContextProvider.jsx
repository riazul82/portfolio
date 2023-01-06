import React, { createContext, useEffect, useReducer } from 'react';

export const LoginContext = createContext();

const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem('user')) || null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {currentUser: action.payload};

        case 'LOGOUT':
            return {currentUser: null};
        
        default:
            return state;
    }
}

const LoginContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(() => {
        if (state.currentUser) {
            localStorage.setItem('user', JSON.stringify(state.currentUser));
        }

        if (state.currentUser === null) {
            localStorage.removeItem('user');
        }
    }, [state]);

    return (
        <LoginContext.Provider value={{currentUser: state.currentUser, dispatch}}>
            { children }
        </LoginContext.Provider>
    );
}

export default LoginContextProvider;