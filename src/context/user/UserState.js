import userContext from './userContext';
import userReducer from './userReducer';

const UserState = (props) => {

    const initialState = {
        
    };

    const [state, dispatch] = useReducer(userReducer, initialState);

    return(
        <userContext>
            {props.children}
        </userContext>
    )
}