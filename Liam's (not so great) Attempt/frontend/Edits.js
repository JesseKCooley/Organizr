import React from 'react'
import { useState } from 'react';
import { useListsContext } from '../hooks/useListsContext';
import { useAuthContext } from '../hooks/useAuthContext';



function Edits(props){
    const [title,setTitle] = useState("");
    const [color,setColor] = useState("");
    const {dispatch} = useListsContext()
    const {user} = useAuthContext()

    const {info} ={
        id: props.list._id,
        title: useState(title),
        items: props.list.items,
        color: useState(color),
        index: 0
    }

    const updateList=async(e)=>{      
        e.preventDefault();  
        if (!user) {
            return
          }
          const response = await fetch('/api/todos/'+props.list._id,{
            method:'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        const json = await response.json();
        console.warn(response.status);
        if(response.ok){
            dispatch({type:'UPDATE_TODO', payload:json})
        }
        }

        /*Attempt at making the buttons their own color*/
        const backColor=(color)=>{
            document.body.style.setProperty('--buttonColor', color);
          }

    return(props.trigger)?(
        <form>
            <label>New List Name:
                <input className="todo-list-input" type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                Color:
                <button className='std-color-group' style={backColor('red')} onClick={()=>setColor('red')}>red</button>
                <button className='std-color-group' style={backColor('blue')} onClick={()=>setColor('blue')}>blue</button>
                
            </label>
            <div>
                <button type="submit" className='std-button-edit' onClick={updateList}>save</button>
                <button type="button" className='std-button-delete' onClick={()=>props.setTrigger(false)}>close</button>
            </div>
            {props.children}
        </form>
    ) : "";
}

export default Edits