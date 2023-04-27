import { useState } from 'react'
import { useListsContext } from "../hooks/useListsContext";
import { useAuthContext } from '../hooks/useAuthContext'

const NewListForm = ()=>{
    const {dispatch} = useListsContext();
    const [title,setTitle] = useState('New todo list');
    const [error,setError] = useState(null);
    const { user } = useAuthContext()
    const [items,setItems] = useState([{name:"New todo"}]);
    const [color,setColor] = useState('#84cac2');
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if (!user) {
            setError('You must be logged in')
            return
          }
        const list = {title, items, color,index: 0};
        const response = await fetch('/api/todos',{
            method:'POST',
            body: JSON.stringify(list),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
    if (!response.ok){
        setError(json.error);
    }
    if (response.ok){
        setTitle('New todo list');
        setItems([{name:"New todo"}]);
        setColor('#84cac2');
        dispatch({type:'CREATE_TODO', payload:json})
        setError(null);

    }

}

    return (
        <form className="todo-newTodoForm" onSubmit={handleSubmit}>
            <input 
            className='todo-newTodoInputField'
            type = "text"
            onChange = {(e) => setTitle(e.target.value)}
            value ={title}
            />
            <button>Create</button>
            {error && <div className="error">{error}</div> }
        </form>
    );
}

export default NewListForm;