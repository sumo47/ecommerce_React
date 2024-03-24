import { createContext, useContext, useEffect, useReducer } from "react";
import { useGlobalHookAppProvider } from "./AppContext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext()
const initialState = {
    filter_Products: [],
    all_Products: [],
    grid_view: true,
    sorting_value: "lowest"
}

export const FilterProvider = ({ children }) => {

    const { products } = useGlobalHookAppProvider()
    // console.log("Products", products)

    const [state, dispatch] = useReducer(reducer, initialState)

    const setGridView = () => {
        return dispatch({ type: "SET_GRIDVIEW" })
    }
    const setListView = () => dispatch({ type: "SET_LISTVIEW" })

    const sorting = (event) => {
        let sortValue = event.target.value
        dispatch({ type: "SORT_VALUE", payload: sortValue })
    }

    //sorting product
    // used again useEffect,  because when i will click on sort dropdown than products will refresh
    useEffect(() => {
        // console.log("HI")
        dispatch({type: "SORT_PRODUCT", payload: products})
    }, [state.sorting_value, products])

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCT", payload: products })
    }, [products])

    return <FilterContext.Provider value={{ ...state, setGridView, setListView, sorting }}>
        {children}
    </FilterContext.Provider >
}

export const useGlobalFilterProvider = () => {
    return useContext(FilterContext)
}