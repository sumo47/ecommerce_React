
function cartReducer(state, action) {
  if (action.type === 'ADD_TO_CART') {
    let { id, color, amount, product } = action.payload

    let Add_Items = {
      id: id + color,
      name: product.name,
      color,
      amount,
      image: product.image[0].url,
      price: product.price,
      max: product.stock

    }
    // state.cart_Items.push(Add_Items)
    return {
      ...state
      , cart_Items: [...state.cart_Items, Add_Items]
    };

  }
  return state;
}

export default cartReducer
