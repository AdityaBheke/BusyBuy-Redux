import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase.config";

const initialState = {isLoggedIn:false, user:null}

export const getLoggedInUser = createAsyncThunk('user/getLoggedInUser',(arg, thunkApi)=>{
    const prevUser = JSON.parse(localStorage.getItem("user"));
    if (prevUser) {
        thunkApi.dispatch(userActions.loginUser(prevUser))
    }
});

export const handleSignUpThunk = createAsyncThunk('user/signup',async(arg, thunkApi)=>{
    console.log(arg);
    const {email, password} = arg;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Welcome");
        return true;
    } catch (error) {
        console.log(error);
        toast.error("Error")
        return false;
    }
});

export const handleSignInThunk = createAsyncThunk('user/signin', async(arg, thunkApi)=>{
    const {email, password} = arg;
    try {
        const signedInUser = await signInWithEmailAndPassword(auth, email, password);
        thunkApi.dispatch(userActions.loginUser(signedInUser.user));
        localStorage.setItem("user", JSON.stringify(signedInUser.user));
        toast.success("Welcome!");
        return true;
    } catch (error) {
        console.log(error);
        toast.error("Error")
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
        }
    }
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelector = (state)=>state.userReducer;