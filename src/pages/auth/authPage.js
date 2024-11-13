import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { useUserValue } from "../../context/userContext";
import { useState } from "react";
function AuthPage({type}){
    const reg = type==="signup"?true:false;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {handleSignUp, handleSignIn} = useUserValue();
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if (reg) {
            const result = await handleSignUp(email, password)
            console.log(result);
            result && navigate("/signin")
        } else {
            const result = await handleSignIn(email, password)
            result && navigate("/")
        }
    }
    const handleOnChange = (e)=>{
        if (e.target.id==='name') {
            setName(e.target.value);
        } else if (e.target.id==='email'){
            setEmail(e.target.value);
        }else if (e.target.id==='password'){
            setPassword(e.target.value);
        }
    }
    return <div className={styles.main}>
        <h1 className={styles.heading}>{reg?"Sign Up":"Sign In"}</h1>
        <form className={styles.authForm} onSubmit={handleSubmit}>
            {reg && <input type="text" id="name" placeholder="Enter name" value={name} onChange={handleOnChange} required/>}
            <input type="email" id="email" placeholder="Enter email" value={email} onChange={handleOnChange} required/>
            <input type="password" id="password" placeholder="Enter Password" value={password} onChange={handleOnChange} required/>
            <button type="submit">{reg?"Sign Up":"Sign In"}</button>
        </form>
        <div className={styles.alternate}><Link to={reg?"/signin":"/signup"}>or {reg?"SignIn":"SignUp"} instead?</Link></div>
    </div>
}
export default AuthPage;