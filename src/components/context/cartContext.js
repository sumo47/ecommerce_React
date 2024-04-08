import { createContext, useContext, useReducer, useEffect } from 'react';
import reducer from '../reducer/cartReducer'

const cartContext = createContext()

const localStorageCartItem = () => {
    let cart_Items = localStorage.getItem("cart_Items")
    const parsedData = JSON.parse(cart_Items);
    if (!Array.isArray(parsedData)) return [];
    return parsedData
}

const initialState = {
    cart_Items: localStorageCartItem(),
    total_Price: 0,
    total_Item: 0,
    shipping_Fee: 50000
}

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = (id, color, amount, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } })
    }
    // remove item in the cart when user click on it
    const increaseItemInCart = (id) => {
        dispatch({ type: "INCREASE_ITEM_IN_CART", payload: { id } })
    }
    // remove item in the cart when user click on it
    const decreaseItemInCart = (id) => {
        dispatch({ type: "DECREASE_ITEM_IN_CART", payload: { id } })
    }

    // Remove Item From Cart
    const removeItem = (id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id } })
        console.log("function")
    }
    useEffect(() => {
        // dispatch({ type: "TOTAL_CART_ITEM" });
        // dispatch({ type: "TOTAL_CART_PRICE" });
        dispatch({ type: "CART_TOTAL_PRICE_ITEM" });
        localStorage.setItem("cart_Items", JSON.stringify(state.cart_Items))
    }, [state.cart_Items])

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    }

    // calculate the total price and item count of each products in the cart
    // useEffect(()=>{
    //     let tempTotalAmount = 0;
    //     let tempTotalItem = 0;
    //     for (let i=0;i<state.cart_Items.length;i++) {
    //         tempTotalAmount += state.cart_Items[i].amount * state.cart_Items[i].product.price
    //         tempTotalItem += state.cart_Items[i].amount
    //     }
    //     dispatch({type:'TOTAL_AMOUNT',payload:{totalAmount :tempTotalAmount}})
    //     dispatch({type:'TOTAL_ITEM',payload:{totalItem :tempTotalItem}})
    // },[state.cart_Items])


    return <cartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, increaseItemInCart, decreaseItemInCart }}>{children}</cartContext.Provider>
}

const useGlobalCartProvider = () => {
    return useContext(cartContext)
}
export { useGlobalCartProvider, CartProvider }