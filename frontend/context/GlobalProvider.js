import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, getAccount } from '../libs/supabaseClient';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkLoginState = async () => {
            const storedLoginState = await AsyncStorage.getItem('isLoggedIn');
            if (storedLoginState === 'true') {
                setIsLoggedIn(true);
                console.log("checked login in state from Asyncstorage is: true");
            } else {
                setIsLoggedIn(false);
                console.log("checked login in state from Asyncstorage is: false");
            }
            setIsLoading(false);
        };

        checkLoginState();
    }, []);

    const login = async () => {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        setUser(await getAccount());
    };

    const logout = async () => {
        await supabase.auth.signOut();
        await AsyncStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <GlobalContext.Provider
            value={{
                login,
                logout,
                user,
                isLoggedIn,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;