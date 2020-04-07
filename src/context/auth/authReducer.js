import { REGISTER_SUCCESS, CHECK_SUCCESS, REGISTER_FAIL, CHECK_FAIL, SET_LOADING } from '../types';


const authReducer = (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading:true
            }
        
        case REGISTER_SUCCESS: 
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                redirect: true,
                loading:false
            }

         case REGISTER_FAIL: 
            return {
                ...state,
                error: action.payload, 
                loading:false
            }

            case CHECK_SUCCESS: 
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                redirect: true,
                loading:false
            }

         case CHECK_FAIL: 
            return {
                ...state,
                error: action.payload, 
                loading:false
            }


        default:
            return state;
    }


    
}

export default authReducer