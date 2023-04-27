//this is the panel representing a todo list that appears on the dashboard
//it is itself a link to the list view page where you can view a single todoo list
import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import Edits from'./Edits';

import {useListsContext} from '../hooks/useListsContext'
import { useAuthContext } from '../hooks/useAuthContext'
const TodoListLink = ({list})=>{

   const [isShown, setIsShown] = useState(false);
    const {dispatch} = useListsContext()
    const { user } = useAuthContext()

   const [buttonEdit, setButtonEdit] = useState(false);


    //deleting a todo
   const handleClick = async () => {
        if (!user) {
          return
        }
    
        const response = await fetch('/api/todos/' + list._id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
    
        if (response.ok) {
          dispatch({type: 'DELETE_TODO', payload: json})
        }
      }

      const navigate = useNavigate();
      const linkToList =()=>{
        navigate('/listView',{state:{_id:list._id}});
      }

      const backColor=(color)=>{
        document.body.style.setProperty('--dashColor', color);
      }

    return (
      <div className = "list-dashView"  
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      >
        <div className = "list-dashViewPanel" style={backColor(list.color)} onClick={()=>{linkToList()}} 
        
        >
            <h className='list-link'>{list.title}  </h>
            {isShown &&
            <div>
            {list.items && list.items.slice(0,3).map((item) => {
              return(<p>{item.name}</p>)
            })}
            </div>
            }
             
             
        </div>
        <div>
          <button className='std-button-edit' onClick={() => setButtonEdit(true)}>edit</button>
          <button className='std-button-delete' onClick={handleClick}>delete</button>
        </div>
        <Edits trigger={buttonEdit} setTrigger={setButtonEdit} key={list._id} list={list}/>
        </div>
    )

}

export default TodoListLink;