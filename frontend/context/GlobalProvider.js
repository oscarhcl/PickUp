import {createContext, useContext, useState, useEffect} from 'react';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext
(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = userState(null)
    const [isLoading, setIsLoading] = useState(true)

useEffect(() => {

}, []);

    return (
        <GlobalContext.Provider
            value={{

            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}