import { createContext, useContext, useState } from "react";

const userContext = createContext();

const useUserValue = ()=>{
    const value = useContext(userContext);
    return value;
}

function UserContextProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return(<userContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </userContext.Provider>)
}

export {useUserValue};
export default UserContextProvider;