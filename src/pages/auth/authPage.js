import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleSignUpThunk, handleSignInThunk } from "../../redux/slices/userSlice";
function AuthPage({type}){
    // const reg = type==="signup"?true:false;
    const [reg, setReg] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                const result = await dispatch(handleSignUpThunk({email, password, name})).unwrap();
                result && navigate("/signin");
                clearForm();
            } else {
                const result = await dispatch(handleSignInThunk({email, password})).unwrap();
                if (result) {
                    navigate("/")
                }
                clearForm()
            }
        } catch (error) {
            console.log("Error in page comp",error);
        }finally{
            setButtonText(reg ? "Sign Up" : "Sign In");
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