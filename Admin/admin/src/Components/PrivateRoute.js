import {Navigate} from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const isLoggenIn = localStorage.getItem("admin_id")

    return isLoggenIn ? children : <Navigate to='/'/>
}

export default PrivateRoute