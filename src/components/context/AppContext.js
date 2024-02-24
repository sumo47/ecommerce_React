import { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'

const AppContext = createContext()

const AppProvider = ({ children }) => {

    const about = { name: "Sumit Sah" }
    const API = "https://api.pujakaitem.com/api/products"

    const getProduct = async (url) => {
        const res = await axios.get(url)
        const products = res.data
        console.log(products)
    }
    useEffect(() => {
        getProduct(API)
    }, [])

    let initialState = 0;

    const reducer = (state, action) => {
        switch (action.type) {
            case "INCREMENT":
                state++
                break;
            case "DECREMENT":
                state--
                break;
            default:
                break;
        }
        console.log(state, action)
        return state;
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    return <AppContext.Provider value={{ about, state, dispatch }}>
        {children}
    </AppContext.Provider>
}

const useGlobalHookAppProvider = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalHookAppProvider };