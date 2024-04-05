
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      let { id, color, amount, product } = action.payload

      // tackle exist item in cart 
      //!have to read again
      let existItem = state.cart_Items.find((item) => {
        return item.id === id + color
      })
      // console.log(state, "exist item in cart")

      if (existItem) {
        let updatedProduct = state.cart_Items.map((item) => {
          if (item.id === id + color) {
            let netAmount = item.amount + amount;
            if (netAmount >= item.max) {
              netAmount = item.max
            }
            return {
              ...item,
              amount: netAmount
            }
          } else {
            return item
          }
        })
        return {
          ...state
          , cart_Items: updatedProduct
        }
      }
      else {

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

        }
      }
    case 'REMOVE_FROM_CART':
      let updatedCartItem = state.cart_Items.filter(
        (element) => element.id !== action.payload.id
      );
      console.log(state, action.payload, updatedCartItem)
      return {
        ...state
        , cart_Items: updatedCartItem

      }
    case "CLEAR_CART":
      return {
        ...state
        , cart_Items: []
      }
    default:
      return state;
  }


}

export default cartReducer
