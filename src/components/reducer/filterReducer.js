const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCT":
            return {
                ...state,
                filter_Products: [...action.payload],
                all_Products: [...action.payload]
            }

        default:
            return state;
    }
}

export default filterReducer