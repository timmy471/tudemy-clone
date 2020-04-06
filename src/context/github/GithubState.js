import React, { useReducer } from 'react'
import axios from 'axios';
import githubReducer from './githubReducer';
import githubContext from './githubContext';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER } from '../types';

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

}else{
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {

    const initialState = {
        users: [],
        user:{},
        loading: false
    }

    
    const [state, dispatch] = useReducer(githubReducer, initialState)

     const searchUsers = async text => {
         if(text!==""){
         dispatch({
             type:SET_LOADING
         })

         const res = await axios.get(`https://api.github.com/search/users?q=${text}
         &client_id=${githubClientId}&client_Secret=${githubClientSecret}`);
         
         

         dispatch({
             type:SEARCH_USERS,
             payload: res.data.items
         })
        }
     }

     const clearUsers = () => {
         dispatch({type:CLEAR_USERS})
     }


     const getUser = async user => {
        dispatch({
            type:SET_LOADING
        })

        const res = await axios.get(`https://api.github.com/users/${user}?
        client_id=${githubClientId}&client_Secret=${githubClientSecret}`);
        
        
        dispatch({
            type:GET_USER,
            payload: res.data
        })
    }


    return (
        <githubContext.Provider value = {{
            users: state.users,
            loading: state.loading,
            user: state.user,
            getUser,
            clearUsers,
            searchUsers
        }}>
        <div>
            {props.children}
        </div>
        </githubContext.Provider>
    )
}

export default GithubState
