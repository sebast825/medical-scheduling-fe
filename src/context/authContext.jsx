import React, { useState, useContext } from "react";

const userContext = React.createContext();
const userToggleContext = React.createContext();
const personaContext = React.createContext();

export function useUserContext() {
    return useContext(userContext);
}

export function useUserToggleContext() {
    return useContext(userToggleContext);
}
export function usePersonaInfoContext() {
    return useContext(personaContext);
}

export function UserProvider(props) {

    const [user, setUser] = useState(null);
    const [personaInfo, SetPersonaInfo] = useState(null);
    const cambiaLogin = (jwt) => {
        
        if (user) {
            setUser(null);
        } else {
            setUser(jwt);
        }
    }
    
    return (
        <userContext.Provider value={user}>
            <userToggleContext.Provider value={cambiaLogin}>
         
                {props.children}
          
              
            </userToggleContext.Provider>
        </userContext.Provider>
    );
}