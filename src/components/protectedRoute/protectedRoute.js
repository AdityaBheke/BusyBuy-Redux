import { Navigate } from "react-router-dom";
import { useUserValue } from "../../context/userContext";


function ProtectedRoute({children}){
    const {isLoggedIn} = useUserValue();
    if (!isLoggedIn) {
        return <Navigate to={"/signin"} replace={true}/>
    }
    return children;
}
export default ProtectedRoute;