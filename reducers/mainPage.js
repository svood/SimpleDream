const initialState = {
    userPhone: '',
    userMailNumber: '',
    userFio: '',
    userCity: '',
    payType:1,
    card: [],
};

function mainPage(state = initialState, action) {
    switch (action.type) {
        case 'ADD_PHONE':
            return {
                ...state,
                userPhone: action.data
            };
        case 'ADD_MAIL_NUMBER':
            return {
                ...state,
                userMailNumber: action.data
            };
        case 'ADD_FIO':
            return {
                ...state,
                userFio: action.data
            };
        case 'ADD_CITY':
            return {
                ...state,
                userCity: action.data
            };
        case 'SET_CARD':
            return {
                ...state,
                card: action.data
            };
        case 'SET_PAY_TYPE':
            return {
                ...state,
                payType: action.data
            };
        default:
            return state;
    }
}


export default mainPage


