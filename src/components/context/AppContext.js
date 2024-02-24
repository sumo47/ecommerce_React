import { createContext, useContext } from 'react'

const AppContext = createContext()

const AppProvider = ({ children }) => {


    const about = {name:"sumit sah"}

    return <AppContext.Provider value={{about}}> 
        {children}
    </AppContext.Provider>
}

const useGlobalHookAppProvider = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalHookAppProvider };