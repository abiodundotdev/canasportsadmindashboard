/*
import React, {createContext, useState} from 'react'
export var userContext = createContext();
export default function ContextProvider({children}){
    const [appState, setAppState] = useState({});
    const saveUser = (userdata) => {
        setAppState(userdata)
    }
    const authUser = {appState, saveUser};
    return (
    <userContext.Provider value={authUser}>
        {children}
    </userContext.Provider>
    )
}

*/

