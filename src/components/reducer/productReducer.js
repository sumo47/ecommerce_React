const productReducer = (state, action) => {

    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true
            }
            break;
        case "API_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
            break;
        case "SET_API_DATA": //all dispatch data , action can access, in this case , type and payload
            const featureData = action.payload.filter((curElem) => {
                return curElem.featured === true;
            })
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                featureProducts: featureData
            }
            break;
        case "SET_SIGNLE_LOADING":
            return {
                ...state,
                isSingleLoading: true,
            }
            break;
        case "SET_SINGLE_PRODUCT":
            return {
                ...state,
                isSingleLoading: true,
                SingleProduct: action.payload
            }
            break;
        case "SET_SINGLE_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
            break;
        default:
            break;
    }
}

export default productReducer