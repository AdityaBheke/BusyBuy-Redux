import { Link, useNavigate } from "react-router-dom"; // Importing navigation components from react-router-dom
import styles from "./auth.module.css"; // Importing styles for the authentication page
import { useCallback, useEffect, useState } from "react"; // Importing hooks for handling state and effects
import { useDispatch } from "react-redux"; // Importing hook to dispatch actions to the Redux store
import { handleSignUpThunk, handleSignInThunk } from "../../redux/slices/userSlice"; // Importing the signup and signin thunks from Redux slice

function AuthPage({ type }) {
    // State to handle whether it's a signup or signin page
    const [reg, setReg] = useState(true); // 'true' indicates SignUp, 'false' indicates SignIn
    const [name, setName] = useState(''); // State for user's name (only needed for signup)
    const [email, setEmail] = useState(''); // State for user's email
    const [password, setPassword] = useState(''); // State for user's password
    const [buttonText, setButtonText] = useState(""); // State for button text
    const navigate = useNavigate(); // Hook for navigation
    const dispatch = useDispatch(); // Hook to dispatch actions to Redux store

    // useEffect hook to update form settings based on 'type' prop (signup or signin)
    useEffect(() => {
        if (type === 'signup') {
            setReg(true); // Set to SignUp mode
            setButtonText("Sign Up"); // Set the button text to "Sign Up"
        } else {
            setReg(false); // Set to SignIn mode
            setButtonText("Sign In"); // Set the button text to "Sign In"
        }
    }, [type]); // Dependency on 'type' prop to re-run the effect on change

    // handleSubmit function for form submission
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            setButtonText(<i className="fi fi-rr-loading"></i>); // Change button text to loading icon
            if (reg) { // If it's SignUp
                const result = await dispatch(handleSignUpThunk({ email, password, name })).unwrap(); // Dispatch SignUp thunk
                result && navigate("/signin"); // If SignUp is successful, navigate to SignIn page
                clearForm(); // Clear form fields after successful submission
            } else { // If it's SignIn
                const result = await dispatch(handleSignInThunk({ email, password })).unwrap(); // Dispatch SignIn thunk
                if (result) {
                    navigate("/"); // If SignIn is successful, navigate to home page
                }
                clearForm(); // Clear form fields after successful submission
            }
        } catch (error) {
            console.log("Error in page comp", error); // Log any error that occurs during submission
        } finally {
            setButtonText(reg ? "Sign Up" : "Sign In"); // Reset button text back to default
        }
    },[dispatch, name, password, email, reg, navigate])

    // Function to clear form fields
    const clearForm = () => {
        setEmail(""); // Reset email field
        setPassword(""); // Reset password field
        setName(""); // Reset name field (only needed for signup)
    }

    // Function to handle input changes and update corresponding state
    const handleOnChange = (e) => {
        if (e.target.id === 'name') {
            setName(e.target.value); // Update name state
        } else if (e.target.id === 'email') {
            setEmail(e.target.value); // Update email state
        } else if (e.target.id === 'password') {
            setPassword(e.target.value); // Update password state
        }
    }

    return (
        <div className={styles.main}> {/* Main container */}
            <h1 className={styles.heading}>{reg ? "Sign Up" : "Sign In"}</h1> {/* Heading based on reg state */}
            <form className={styles.authForm} onSubmit={handleSubmit}> {/* Form for signup/signin */}
                {reg && <input type="text" id="name" placeholder="Enter name" value={name} onChange={handleOnChange} required />} {/* Only show name field for SignUp */}
                <input type="email" id="email" placeholder="Enter email" value={email} onChange={handleOnChange} required /> {/* Email input */}
                <input type="password" id="password" placeholder="Enter Password" value={password} onChange={handleOnChange} required /> {/* Password input */}
                <button type="submit">{buttonText}</button> {/* Submit button with dynamic text */}
            </form>
            <div className={styles.alternate}>
                {/* Link to alternate page (SignIn or SignUp) */}
                <Link to={reg ? "/signin" : "/signup"}>or {reg ? "Sign In" : "Sign Up"} instead?</Link>
            </div>
        </div>
    );
}

export default AuthPage; // Exporting the AuthPage component
