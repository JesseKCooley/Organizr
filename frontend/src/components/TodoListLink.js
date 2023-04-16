//this is the panel representing a todo list that appears on the dashboard
//it is itself a link to the list view page where you can view a single todoo list
import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {useListsContext} from '../hooks/useListsContext'
import { useAuthContext } from '../hooks/useAuthContext'
const TodoListLink = ({list})=>{

   const [isShown, setIsShown] = useState(false);
    const {dispatch} = useListsContext()
    const { user } = useAuthContext()

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

    return (
      <div className = "list-dashView"  
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      >
        <div className = "list-dashViewPanel" onClick={()=>{linkToList()}} 
        
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
        <button className='std-button' onClick={handleClick}>delete</button>
        </div>
    )

}

export default TodoListLink;