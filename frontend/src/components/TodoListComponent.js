//this is the component that renders on the list view page
//it shows all the individual items on a todo list as input fields

import React, { useEffect, useState, useRef } from 'react'

import { useListsContext } from "../hooks/useListsContext";
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';


const TodoListComponent = ({list}) =>{

  const dragItem = useRef();
  const dragOverItem = useRef();
  const {dispatch} = useListsContext();
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext()
  const form = document.getElementsByClassName('.list-form')[0];
  const [formFields, setFormFields] = useState(list.items);

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
  const drop = (e) => {
    const copyListItems = [...formFields];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setFormFields(copyListItems);
  };

  
  useEffect(()=>{setFormFields(list.items)},[list.items])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);

  }


  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (!user) {
        setError('You must be logged in')
        return
      }
          
            
          const finalVal = {title:list.title, items:formFields,index: list.index};
          const response = await fetch('/api/todos/'+list._id,{
              method:'PATCH',
              body: JSON.stringify(finalVal),
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
              dispatch({type:'UPDATE_TODO', payload:json})
              setError(null);
              navigate('/');
          }
    }
    
    const addFields = () => {
      let object = {
        name: ''
      }
      setFormFields([...formFields, object])
    }
    
    const removeFields = (index) => {
      let data = [...formFields];
      data.splice(index, 1)
      setFormFields(data)
    }



      return (
        
        <div>

            <form className="list-form" onSubmit={handleSubmit}>
                {formFields && formFields.map((form, index) => {
                return (
                    <div key={index}
                    onDragStart={(e) => dragStart(e, index)} 
                    onDragEnter={(e) => dragEnter(e, index)}
                    onDragEnd={drop}
                    draggable
                    >
                       <input className="todo-list-input"
                        id = {index}
                        name='name'
                        placeholder='New todo'
                        onChange={event => handleFormChange(event, index)}

                        value={form.name}
                />
                    <button onClick={() => removeFields(index)}>-</button>
                    </div>
                )
                })}
            </form>
            <button className="std-button" onClick={addFields}>+</button>
            <br />
            <button className="std-button" onClick={handleSubmit}>Home</button> 
        </div>
    ) 

}

export default TodoListComponent