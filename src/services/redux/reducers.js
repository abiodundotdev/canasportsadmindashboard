import {Types} from './actions'

const initialState = {
    isUserLoggedIn : false,
    user : ""
} 

export default function authReducer(state = initialState, action){
    let newState = state
    switch(action.type){
        case Types.setUserLoggedIn:
            return {...newState, isUserLoggedIn : action.payload.data}
        case Types.setUser:
            return {...newState, user : action.payload}
            console.log(action.payload)
        default: 
            return newState
    }
}