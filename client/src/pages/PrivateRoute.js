
import { useSelector} from 'react-redux';
import {  Navigate } from 'react-router-dom';
function PrivateRoute({ children }) {
    const isAuth = useSelector(state => state.auth.isLoggin);

        return isAuth === true 
        ? children
        : <Navigate to="/login" replace />
            
        
    
}

export default PrivateRoute;