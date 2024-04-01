import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducer/cartReducer'

const cartContext = createContext()

const initialState = {
    cart_Items: [],
    total_Amount: 0,
    total_Item: 0,
    shipping_Fee: 50000
}

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = (id, color, amount, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } })
    }

    return <cartContext.Provider value={{ ...state, addToCart}}>{children}</cartContext.Provider>
}


 const useGlobalCartProvider = () => {
    return useContext(cartContext)
}
export {useGlobalCartProvider, CartProvider}