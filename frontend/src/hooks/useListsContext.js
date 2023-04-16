import { useContext } from "react"

import { ListsContext } from "../context/ListsContext"

export const useListsContext = ()=>{
    const context = useContext(ListsContext)

    if (!context){
        throw Error('Bad context')
    }

    return context
}