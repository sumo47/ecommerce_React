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
        case "SET_API_DATA": //!not understand this case algo.
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

        default:
            break;
    }
}

export default productReducer