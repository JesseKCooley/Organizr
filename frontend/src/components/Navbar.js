import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
const Navbar = ()=>{
    const { logout } = useLogout()
    const { user } = useAuthContext()
  
    const handleClick = () => {
      logout()
    }
    return (
        <header>
        <div className = "navbar">
            <Link to="/">
                <h1>Organizr</h1>
            </Link>
            <nav>
          {user && (
            <div>
              <p>{user.email}</p>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          
        </nav>
        </div>
        </header>
    )
}

export default Navbar;