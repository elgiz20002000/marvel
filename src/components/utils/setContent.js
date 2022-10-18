import ErrorMessage from "../errorMessage/errorMessage"
import Skeleton from "../skeleton/Skeleton"
import Spinner from "../spinner/Spiner"

export const setContent = (process , Component , data) => {
    switch(process) {
        case 'waiting':
            return <Skeleton/>
        case 'loading':
            return <Spinner/>
        case 'confirmed': 
            return <Component data={data}/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('something get wrong')
    }
}

export const customSetContent = (process , Component   ,  newItemLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner/>
        case 'confirmed': 
            return <Component />
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('something get wrong')
    }
}