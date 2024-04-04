
const filterReducer = (state, action) => {
    switch (action.type) {

        case "LOAD_FILTER_PRODUCT":

            let priceArr = action.payload.map((product) => { return product.price })
            let maxPrice = Math.max(...priceArr)

            return {
                ...state,
                filter_Products: [...action.payload],
                all_Products: [...action.payload],
                filters: { ...state.filters, maxPrice, price: maxPrice }
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
            let tempProducts = [...state.filter_Products]

            let sortingFunction = (a, b) => {
                if (state.sorting_value === 'lowest') return a.price - b.price
                if (state.sorting_value === 'highest') return b.price - a.price
                if (state.sorting_value === "a-z") return a.name.localeCompare(b.name)
                if (state.sorting_value === "z-a") return b.name.localeCompare(a.name)
            }

            newSortedProducts = tempProducts.sort(sortingFunction)

            return {
                ...state,
                filter_Products: newSortedProducts
            }
        case "UPDATE_FILTER_VALUE":
            let { name, value } = action.payload
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value //! did not understand
                }
            }
        case "FILTER_PRODUCTS":
            let { all_Products } = state
            let tempFilterProducts = [...all_Products];
            const { text, category, company, colors, price } = state.filters

            if (text) {
                tempFilterProducts = tempFilterProducts.filter(product => product.name.toLowerCase().includes(text.toLowerCase()))
            }
            if (category !== "all") {
                tempFilterProducts = tempFilterProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
            }
            if (company !== "all") {
                tempFilterProducts = tempFilterProducts.filter(product => product.company.toLowerCase() === company.toLowerCase());
            }
            if (colors !== "all") {
                tempFilterProducts = tempFilterProducts.filter(product => product.colors.includes(colors));
            }
            if (price) {
                tempFilterProducts = tempFilterProducts.filter(product => product.price <= price)
            }

            return {
                ...state,
                filter_Products: tempFilterProducts
            }
        case "CLEAR_FILTER_VALUE":
            // console.log(state)
            return {
                ...state,

                filters: {
                    ...state.filters, text: "", category: "all", company: "all", colors: "all", maxPrice: state.filters.maxPrice, minPrice: state.filters.minPrice, price: state.filters.maxPrice
                }
            }

        default:
            return state;
    }
}

export default filterReducer