const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCT":
            return {
                ...state,
                filter_Products: [...action.payload],
                all_Products: [...action.payload]
            }
        case "SET_GRIDVIEW":
            return {
                ...state,
                gridView: true
            }

        default:
            return state;
    }
}

export default filterReducer