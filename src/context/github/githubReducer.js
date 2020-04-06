import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER  } from '../types';


const githubReducer = (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading:true
            }

        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading:false
            }

        case CLEAR_USERS: 
            return {
                ...state,
                users:[]
            }
        
        case GET_USER: 
            return {
                ...state,
                user: action.payload,
                loading:false
            }


        default:
            return state;
    }


    
}

export default githubReducer