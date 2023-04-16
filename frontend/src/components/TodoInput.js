import { useState, useEffect } from "react";

const TodoInput = ({todo, index})=>{

    const [location,setLocation] = useState("");
    const handleFormChange = (e)=>{
        setLocation(e.target.value);
    }
    const handleClearField = (e)=>{setLocation("")}

    const adjustInputSize = ()=>{
        const locationButton = document.getElementById({index});
  
        if (!location)return;
        if (location.length<1){
          locationButton.style.width = locationButton.placeholder.length+2+'ch';
        }else{
          locationButton.style.width = location.length+5+'ch';
        }
      }
      useEffect(()=>{adjustInputSize()},[location])

      return (
        <>
        <input className="todo-list-input"
                        id = {index}
                        name='name'
                        placeholder='New todo'
                        onChange={handleFormChange}
                        onFocus={handleClearField}
                        value={todo.name}
        />
        </>
      );
}

export default TodoInput;