import Context from './Context'
import { useContext } from 'react'

function withContext(Component){
    return function(props){
        const context = useContext(Context)

        return <Component {...props} context={context}/>
    }
}

export default withContext