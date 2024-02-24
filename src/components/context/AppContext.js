import { createContext, useContext, useEffect } from 'react'
import axios from 'axios'

const AppContext = createContext()

const AppProvider = ({ children }) => {

    const about = { name: "Sumit Sah" }
    const API = "https://api.pujakaitem.com/api/products"


    const getProduct = async (url) => {
        const res =  await axios.get(url);
        console.log(res.data)
    }


    useEffect(() => {
        getProduct(API)
    }, [])

    return <AppContext.Provider value={{ about }}>
        {children}
    </AppContext.Provider>
}

const useGlobalHookAppProvider = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalHookAppProvider };