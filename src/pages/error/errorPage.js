import { Link, useNavigate } from "react-router-dom";
import styles from "./errorPage.module.css";
import { useEffect, useState } from "react";

function ErrorPage(){
    const [time, setTime] = useState(5);
    const navigate = useNavigate();
    useEffect(()=>{
        const interval = setInterval(()=>{
            setTime((prev)=>prev>0?prev-1:prev)
        },1000);

        const timeout = setTimeout(()=>{
            navigate("/");
            clearInterval(interval)
        },6000)
        return ()=>{
            clearInterval(interval);
            clearTimeout(timeout);
        }
    },[navigate])
    return (<>
    <div className={styles.main}>
        <div className={styles.errorIcon}><i className="fi fi-rr-404"></i></div>
        <div className={styles.errorMessage}>You will be redirected to home page in {time} <br/>Or click below button</div>
        <Link to={"/"}><button className={styles.redirectButton}>Return to Home</button></Link>
    </div>
    </>)
}
export default ErrorPage;