// a logged-in user's homepage->todo lists are visible

import {useState, useEffect } from "react"
import { useListsContext } from "../hooks/useListsContext";
import { useAuthContext } from "../hooks/useAuthContext"
import TodoListLink from '../components/TodoListLink';
import NewListForm from '../components/NewListForm';

const Dashboard = ()=>{

    const {lists,dispatch} = useListsContext();
    const {user} = useAuthContext()
    const [_lists,setLists] = useState(lists);
   
    useEffect(()=>{
        const fetchTodos = async ()=> {
            const response = await fetch('/api/todos', {
            headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()

            if (response.ok){
                dispatch({type:'ALL_TODOS',payload: json})
            }
        }
        if (user){
            fetchTodos()
            
        }
    
    },[dispatch,user]);

    useEffect(()=>{setLists(lists)},[lists]);
    
    if (_lists && _lists.map === undefined)
    {
        return <div>loading</div>
    }

    return(
        <div className="todo-dash" >
     
            {_lists && _lists.map((list) => (
            <TodoListLink key = {list._id} list ={list}/>
            ))}

        <NewListForm />
        </div>
    )
}


export default Dashboard