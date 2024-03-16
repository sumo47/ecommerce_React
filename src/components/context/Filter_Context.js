import { createContext, useContext, useEffect, useReducer } from "react";
import { useGlobalHookAppProvider } from "./AppContext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext()
const initialState = {
    filter_Products: [],
    all_Products: []
}

export const FilterProvider = ({ children }) => {

    const { products } = useGlobalHookAppProvider()
    console.log("Products", products)

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCT", payload: products })
    }, [products])

    return <FilterContext.Provider value={{ ...state }}>
        {children}
    </FilterContext.Provider >
}

export const useGlobalFilterProvider = () => {
    return useContext(FilterContext)
}