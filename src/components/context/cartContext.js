import { createContext, useContext, useReducer, useEffect } from 'react';
import reducer from '../reducer/cartReducer'

const cartContext = createContext()

const localStorageCartItem = () => {
    let cart_Items = JSON.parse(localStorage.getItem("cart_items"))
    if (cart_Items === null) {
        cart_Items = []
        
    }
    return cart_Items
}

const initialState = {
    cart_Items: localStorageCartItem(),
    total_Amount: 0,
    total_Item: 0,
    shipping_Fee: 50000
}

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = (id, color, amount, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } })
    }
    const removeItem = (id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id } })
        console.log("function")
    }
    useEffect(() => {
        localStorage.setItem("cart_items", JSON.stringify(state.cart_Items))
    }, [state.cart_Items])


    return <cartContext.Provider value={{ ...state, addToCart, removeItem }}>{children}</cartContext.Provider>
}


const useGlobalCartProvider = () => {
    return useContext(cartContext)
}
export { useGlobalCartProvider, CartProvider }