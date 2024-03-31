import { createContext, useContext, useEffect, useReducer } from "react";
import { useGlobalHookAppProvider } from "./AppContext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext()
const initialState = {
    filter_Products: [],
    all_Products: [],
    grid_view: true,
    sorting_value: "lowest",
    filters: {
        text: "",
        category: "all",
        company: "all",
        colors: "all",
        maxPrice: 0,
        minPrice: 0,
        price: 0
    }
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
        dispatch({ type: "FILTER_PRODUCTS" })
        dispatch({ type: "SORT_PRODUCT" })
    }, [state.sorting_value, products, state.filters])

    //filter product
    const updateFilterValue = (event) => {
        let value = event.target.value;
        let name = event.target.name
        dispatch({ type: "UPDATE_FILTER_VALUE", payload: { name, value } })
    }
    //to clear filter value
    const clearFilterValue = (event) => {

        dispatch({ type: "CLEAR_FILTER_VALUE" })
    }

    //to load products in the beginning
    useEffect(() => {

        dispatch({ type: "LOAD_FILTER_PRODUCT", payload: products })
    }, [products])

    return <FilterContext.Provider value={{ ...state, setGridView, setListView, sorting, updateFilterValue,clearFilterValue }}>
        {children}
    </FilterContext.Provider >
}

export const useGlobalFilterProvider = () => {
    return useContext(FilterContext)
}