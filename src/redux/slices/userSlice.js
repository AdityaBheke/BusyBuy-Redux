import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase.config";

const initialState = {isLoggedIn:false, user:null}

export const getLoggedInUser = createAsyncThunk('user/getLoggedInUser',(arg, thunkApi)=>{
    const prevUser = JSON.parse(localStorage.getItem("user"));
    if (prevUser) {
        thunkApi.dispatch(userActions.loginUser(prevUser));
        // toast.success(`Welcome! ${prevUser.displayName?prevUser.displayName:""} You’re signed in.`);
    }
});

export const handleSignUpThunk = createAsyncThunk('user/signup',async(arg, thunkApi)=>{
    console.log(arg);
    const {email, password, name} = arg;
    try {
        const createdUser = await createUserWithEmailAndPassword(auth, email, password);
        const user = createdUser.user;
        await updateProfile(user,{
            displayName:name
        })
        toast.success("Welcome aboard! Your account is ready.");
        return true;
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong!")
        return false;
    }
});

export const handleSignInThunk = createAsyncThunk('user/signin', async(arg, thunkApi)=>{
    const {email, password} = arg;
    try {
        const signedInUser = await signInWithEmailAndPassword(auth, email, password);
        console.log(signedInUser.user);
        const user = {
          uid: signedInUser.user.uid,
          email: signedInUser.user.email,
          displayName: signedInUser.user.displayName,
        };
        thunkApi.dispatch(userActions.loginUser(user));
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(`Welcome! ${user.displayName?user.displayName:""} You’re signed in.`);
        return true;
    } catch (error) {
        console.log(error);
        toast.error("Oops! Check your credentials and try again.")
        return false;
    }
});

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginUser:(state, action)=>{
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logoutUser: (state, action)=>{
            state.user = null;
            state.isLoggedIn = false;
            localStorage.setItem("user", "");
            toast.success("You’ve been logged out. See you soon!");
        }
    }
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelector = (state)=>state.userReducer;