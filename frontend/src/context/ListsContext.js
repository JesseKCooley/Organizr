import {createContext, useReducer} from 'react'

export const ListsContext = createContext()

export const listsReducer = (state,action) =>{
    switch(action.type){
        case 'ALL_TODOS': 
            return {lists: action.payload}
        case 'CREATE_TODO':
            return {lists: [action.payload, ...state.lists]}
        case 'GET_TODO':
            return {lists: action.payload}
        case 'DELETE_TODO':
            return {lists: state.lists.filter((t)=>t._id !== action.payload._id)}
        default:
            return state
    }

}

export const ListsContextProvider = ({children}) =>
{
    const [state,dispatch] = useReducer(listsReducer, {
        lists: null
    });

    return (
        <ListsContext.Provider value = {{...state,dispatch}}>
            {children}
        </ListsContext.Provider>
    )
}