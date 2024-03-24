
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
                grid_view: true
            }
        case "SET_LISTVIEW":
            return {
                ...state,
                grid_view: false
            }
        case "SORT_VALUE":
            // console.log(action.payload)
            return {
                ...state,
                sorting_value: action.payload
            }
        case "SORT_PRODUCT":
            let newSortedProducts;
            let tempProducts = [...action.payload]

            if (state.sorting_value === 'lowest') {
                newSortedProducts = tempProducts.sort((a, b) => a.price - b.price)
            }
            if (state.sorting_value === 'highest') {
                newSortedProducts = tempProducts.sort((a, b) => b.price - a.price)
            }

            if (state.sorting_value === "a-z") {
                newSortedProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name))
            }

            if (state.sorting_value === "z-a") {
                newSortedProducts = tempProducts.sort((a, b) => {
                    return b.name.localeCompare(a.name)
                })
            }

            return {
                ...state,
                filter_Products: newSortedProducts
            }

        default:
            return state;
    }
}

export default filterReducer