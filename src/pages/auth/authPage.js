import { Link } from "react-router-dom";
import styles from "./auth.module.css";
function AuthPage({type}){
    const reg = type==="signup"?true:false
    return <div className={styles.main}>
        <h1 className={styles.heading}>{reg?"Sign Up":"Sign In"}</h1>
        <form className={styles.authForm}>
            {reg && <input type="text" placeholder="Enter name" required/>}
            <input type="email" placeholder="Enter email" required/>
            <input type="password" placeholder="Enter Password" required/>
            <button type="submit">{reg?"Sign Up":"Sign In"}</button>
        </form>
        <div className={styles.alternate}><Link to={reg?"/signin":"/signup"}>or {reg?"SignIn":"SignUp"} instead?</Link></div>
    </div>
}
export default AuthPage;