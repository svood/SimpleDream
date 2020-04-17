const initialState = {
    products: [],
};

function products(state = initialState, action) {
    switch (action.type) {
        case 'ADD_PRODUCTS':
            return {
                ...state,
                products: action.data
            };
        default:
            return state;
    }
}


export default products


