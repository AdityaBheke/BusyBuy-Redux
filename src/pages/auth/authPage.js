import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { useUserValue } from "../../context/userContext";
import { useEffect, useState } from "react";
function AuthPage({type}){
    // const reg = type==="signup"?true:false;
    const [reg, setReg] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState("");
    const {handleSignUp, handleSignIn} = useUserValue();
    const navigate = useNavigate();
    useEffect(()=>{
        if (type==='signup') {
            setReg(true);
            setButtonText("Sign Up");
        }else{
            setReg(false);
            setButtonText("Sign In");
        }
    },[type])
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            setButtonText(<i className="fi fi-rr-loading"></i>)
            if (reg) {
                const result = await handleSignUp(email, password);
                result && navigate("/signin");
                clearForm();
            } else {
                const result = await handleSignIn(email, password)
                result && navigate("/")
                clearForm()
            }
        } catch (error) {
            
        }finally{
            if (reg) {
                setButtonText("Sign Up")
            } else {
                setButtonText("Sign In")
            }
        }
    }
    const clearForm = ()=>{
        setEmail("");
        setPassword("");
        setName("");
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
            <button type="submit">{buttonText}</button>
        </form>
        <div className={styles.alternate}><Link to={reg?"/signin":"/signup"}>or {reg?"SignIn":"SignUp"} instead?</Link></div>
    </div>
}
export default AuthPage;