import { useAuthContext } from './useAuthContext'
import { useListsContext } from './useListsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchWorkouts } = useListsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchWorkouts({ type: 'SET_TODOS', payload: null })
  }

  return { logout }
}