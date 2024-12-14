import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { userSelector } from "./userSlice";

const initialState = {orders:[]};
export const getOrders = createAsyncThunk('order/getOrders',async(arg,thunkApi)=>{
    const state = thunkApi.getState();
    const {user} = userSelector(state);
    const snapShot = await getDocs(query(
            collection(db, "orders"),
            where("userId", "==", user.uid),
            orderBy("date", "desc")
          ));
    const orders = snapShot.docs.map((doc)=>{return {id:doc.id, ...doc.data()}});
    thunkApi.dispatch(orderActions.setOrders(orders));
})
const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{
        setOrders:(state, action)=>{
            state.orders = action.payload;
        }
    }
})

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
export const orderSelector = (state)=>state.orderReducer;