import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase.config";

// Initial state for the user slice
const initialState = { isLoggedIn: false, user: null };

// Thunk to get the previously logged-in user from localStorage
export const getLoggedInUser = createAsyncThunk('user/getLoggedInUser', (arg, thunkApi) => {
    const prevUser = JSON.parse(localStorage.getItem("user")); // Get the user from localStorage
    if (prevUser) {
        thunkApi.dispatch(userActions.loginUser(prevUser)); // Dispatch action to log in the user if found
    }
});

// Thunk to handle user signup
export const handleSignUpThunk = createAsyncThunk('user/signup', async (arg, thunkApi) => {
    const { email, password, name } = arg;
    try {
        // Create user with email and password
        const createdUser = await createUserWithEmailAndPassword(auth, email, password);
        const user = createdUser.user;

        // Update user's profile with their name
        await updateProfile(user, {
            displayName: name
        });

        toast.success("Welcome aboard! Your account is ready."); // Show success message
        return true;
    } catch (error) {
        console.log(error); // Log any error
        toast.error("Something went wrong!"); // Show error message
        return false;
    }
});

// Thunk to handle user signin
export const handleSignInThunk = createAsyncThunk('user/signin', async (arg, thunkApi) => {
    const { email, password } = arg;
    try {
        // Sign in the user with email and password
        const signedInUser = await signInWithEmailAndPassword(auth, email, password);
        const user = {
            uid: signedInUser.user.uid,
            email: signedInUser.user.email,
            displayName: signedInUser.user.displayName,
        };

        // Dispatch action to log in the user and save to localStorage
        thunkApi.dispatch(userActions.loginUser(user));
        localStorage.setItem("user", JSON.stringify(user));

        toast.success(`Welcome! ${user.displayName ? user.displayName : ""} You’re signed in.`); // Show success message
        return true;
    } catch (error) {
        console.log(error); // Log any error
        toast.error("Oops! Check your credentials and try again."); // Show error message
        return false;
    }
});

// User slice to manage user state
const userSlice = createSlice({
    name: 'user', // Slice name
    initialState, // Initial state for user
    reducers: {
        // Action to log in the user
        loginUser: (state, action) => {
            state.user = action.payload; // Set user data
            state.isLoggedIn = true; // Mark user as logged in
        },
        // Action to log out the user
        logoutUser: (state, action) => {
            if (state.isLoggedIn) {
                state.user = null; // Remove user data
                state.isLoggedIn = false; // Mark user as logged out
                localStorage.setItem("user", ""); // Clear user data from localStorage
                toast.success("You’ve been logged out. See you soon!"); // Show logout success message   
            }
        }
    }
});

// Exporting the user slice reducer and actions
export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;

// Selector to get the user state from Redux store
export const userSelector = (state) => state.userReducer;
