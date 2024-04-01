
function cartReducer(state, action) {
  if (action.type === 'ADD_TO_CART') {
    let { cart_Items } = state
    cart_Items = [...state.cart_Items, action.payload]
    console.log(cart_Items)

  }
  return state;
}

export default cartReducer
