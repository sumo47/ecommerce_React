
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
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

    case 'REMOVE_FROM_CART':
      let updatedCartItem = state.cart_Items.filter(
        (element) => element.id !== action.payload.id
      );
      console.log(state, action.payload, updatedCartItem)
      return {
        ...state
        , cart_Items: updatedCartItem

      }
    default:
      return state;
  }


}

export default cartReducer
