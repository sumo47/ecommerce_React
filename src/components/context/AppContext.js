import { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import reducer from '../reducer/productReducer'

const AppContext = createContext()
const API = "https://api.pujakaitem.com/api/products"
const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: []
};
const about = { name: "Sumit Sah" }

const AppProvider = ({ children }) => {

    const getProduct = async (url) => {
        try {
            const res = await axios.get(url)
            const products = res.data
            // console.log(products)
            dispatch({ type: MY_API_DATA, payload: products })
        } catch (error) {
            dispatch({ type: API_ERROR })
            console.log(error)
        }
    }
    useEffect(() => {
        getProduct(API)
    }, [])

    const [state, dispatch] = useReducer(reducer, initialState);

    return <AppContext.Provider value={{ about, ...state }}>
        {children}
    </AppContext.Provider>
}

const useGlobalHookAppProvider = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalHookAppProvider };