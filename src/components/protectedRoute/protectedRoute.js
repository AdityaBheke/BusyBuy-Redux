import { Navigate } from "react-router-dom";
import { useValue } from "../../context/userContext";


function ProtectedRoute({children}){
    const {isLoggedIn} = useValue();
    if (!isLoggedIn) {
        return <Navigate to={"/signin"} replace={true}/>
    }
    return children;
}
export default ProtectedRoute;