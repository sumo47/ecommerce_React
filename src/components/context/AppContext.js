import { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import reducer from '../reducer/productReducer'

const AppContext = createContext()
const API = "https://api.pujakaitem.com/api/products"
const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading:false,
    SingleProduct:{}
};
const about = { name: "Sumit Sah" }

const AppProvider = ({ children }) => {
    //Get Product
    const getProduct = async (url) => {
        dispatch({ type: "SET_LOADING" })
        try {
            const res = await axios.get(url)
            const products = res.data
            // console.log(products)
            dispatch({ type: "SET_API_DATA", payload: products })
        } catch (error) {
            dispatch({ type: "API_ERROR" })
            console.log(error)
        }
    }

    //Get single product
    const getSingleProduct = async(url)=>{
        dispatch({type:"SET_SIGNLE_LOADING"})
        try {
            const res = await axios.get(url)
            const product = res.data
            dispatch({type:"SET_SINGLE_PRODUCT", payload:product})
        } catch (error) {
            dispatch({type:"SET_SINGLE_ERROR"})
            console.log(error)
        }
    }


    useEffect(() => {
        getProduct(API)
    }, [])

    const [state, dispatch] = useReducer(reducer, initialState);

    return <AppContext.Provider value={{ about , ...state , getSingleProduct}}>
        {children}
    </AppContext.Provider>
}

const useGlobalHookAppProvider = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalHookAppProvider };