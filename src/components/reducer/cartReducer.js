
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
    case "INCREASE_ITEM_IN_CART":
      return {
        ...state
        , cart_Items: state.cart_Items.map((item) => {
          if (item.id === action.payload.id) {
            if (item.amount >= item.max) {
              return {
                ...item,
                amount: item.max,

              }
            }
            return {
              ...item,
              amount: item.amount + 1
            }
          } else {
            return item
          }
        })
      }

    case "DECREASE_ITEM_IN_CART":
      return {
        ...state
        , cart_Items: state.cart_Items.map((item) => {
          if (item.id === action.payload.id) {

            if (item.amount <= 1) {
              return {
                ...item,
                amount: 1
              }
            } else {
              return {
                ...item,
                amount: item.amount - 1,
              }
            }
          } else {
            return item
          }
        })
      }

    // case "TOTAL_CART_ITEM":
    //   let updatedCartIconItem = state.cart_Items.reduce((initialValue, item) => {
    //     return initialValue + item.amount
    //   }, 0)
    //   return {
    //     ...state,
    //     total_Item: updatedCartIconItem
    //   }

    // case "TOTAL_CART_PRICE":
    //   let total_Price = state.cart_Items.reduce((total, nextItem) => {
    //     return total + nextItem.price * nextItem.amount;
    //   }, 0);

    //   return {
    //     ...state,
    //     total_Price
    //   }
    case "CART_TOTAL_PRICE_ITEM":
      let { total_Price, total_Item } = state.cart_Items.reduce((initialValue, item) => {
        return {
          total_Price: initialValue.total_Price + item.price * item.amount,
          total_Item: initialValue.total_Item + item.amount
        }
      }, { total_Item: 0, total_Price: 0 })
      return {
        ...state,
        total_Price,
        total_Item
      }
    default:
      return state;
  }


}

export default cartReducer
