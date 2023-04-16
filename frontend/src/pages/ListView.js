//the page that views a given todo list

import { useEffect } from "react"
import { useLocation } from "react-router-dom";

import { useListsContext } from "../hooks/useListsContext";
import { useAuthContext } from "../hooks/useAuthContext"
import TodoListComponent from '../components/TodoListComponent';

const ListView = ()=>{

    const {lists, dispatch} = useListsContext() //Because of funky GET, lists will represent a single list in this script

    const {user} = useAuthContext()
    const location = useLocation();
    const _id = location.state._id

    useEffect(()=>{
        const fetchTodos = async ()=> {
            const response = await fetch('/api/todos/'+_id, {
            headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if (response.ok){
                dispatch({type:'GET_TODO',payload: json})
   
            }
        }
        if (user){
            fetchTodos();
           
        }
    
    },[dispatch,user,_id]);
    
    return(

         <div className="todo-list">
            <h className="todo-list-header">{lists? lists.title : <>Loading</>}</h>
                {lists && <TodoListComponent list ={lists}/>}
        </div>
    )
}


export default ListView