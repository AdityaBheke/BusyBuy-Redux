import { Link, useNavigate } from "react-router-dom"; // Importing necessary components from react-router-dom
import styles from "./errorPage.module.css"; // Importing styles for the error page
import { useEffect, useState } from "react"; // Importing hooks for handling state and effects

function ErrorPage() {
    const [time, setTime] = useState(5); // State to manage the countdown timer (default is 5 seconds)
    const navigate = useNavigate(); // Hook for navigating programmatically

    useEffect(() => {
        // Setting up an interval to decrease the time every second
        const interval = setInterval(() => {
            setTime((prev) => prev > 0 ? prev - 1 : prev); // Decrease the time until it reaches 0
        }, 1000);

        // Setting up a timeout to redirect to the home page after 6 seconds
        const timeout = setTimeout(() => {
            navigate("/"); // Navigate to home page
            clearInterval(interval); // Clear the interval once navigation is triggered
        }, 6000);

        // Cleanup function to clear interval and timeout when the component is unmounted
        return () => {
            clearInterval(interval); // Clear the interval
            clearTimeout(timeout); // Clear the timeout
        };
    }, [navigate]); // Dependencies: useEffect will run when the `navigate` changes

    return (
        <>
            {/* Main error page container */}
            <div className={styles.main}>
                {/* Error icon */}
                <div className={styles.errorIcon}><i className="fi fi-rr-404"></i></div>
                {/* Error message showing the countdown time */}
                <div className={styles.errorMessage}>
                    You will be redirected to home page in {time} <br />
                    Or click below button
                </div>
                {/* Redirect button to home page */}
                <Link to={"/"}>
                    <button className={styles.redirectButton}>Return to Home</button>
                </Link>
            </div>
        </>
    );
}

export default ErrorPage; // Exporting ErrorPage component to be used elsewhere
