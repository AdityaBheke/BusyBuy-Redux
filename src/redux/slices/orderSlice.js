import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importing Redux Toolkit functions
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"; // Firestore methods
import { db } from "../../config/firebase.config"; // Importing Firebase configuration
import { userSelector } from "./userSlice"; // Importing user selector to get user data

// Initial state for the order slice
const initialState = { 
  orders: [], // List of orders
  isLoading: true // Loading state for orders
};

// Thunk to fetch orders for the logged-in user from Firestore
export const getOrders = createAsyncThunk(
  "order/getOrders", // Name of the action
  async (arg, thunkApi) => {
    thunkApi.dispatch(orderActions.setLoading(true)); // Set loading to true before fetching orders
    try {
      const state = thunkApi.getState(); // Get current Redux state
      const { user } = userSelector(state); // Get logged-in user data from the state
      
      // Fetch orders for the logged-in user from Firestore, ordered by date in descending order
      const snapShot = await getDocs(
        query(
          collection(db, "orders"), // Firestore collection
          where("userId", "==", user.uid), // Query for the user's orders
          orderBy("date", "desc") // Order by date (newest first)
        )
      );
      
      // Map the Firestore documents to add order ID and format the date
      const orders = snapShot.docs.map((doc) => {
        return { 
          id: doc.id, 
          ...doc.data(), 
          date: (doc.data()).date.toDate().toISOString() // Convert Firestore timestamp to ISO string
        };
      });
      
      // Dispatch action to set the fetched orders in the state
      thunkApi.dispatch(orderActions.setOrders(orders));
    } catch (error) {
      console.log(error); // Log any error that occurs during fetching
    } finally {
      thunkApi.dispatch(orderActions.setLoading(false)); // Set loading to false after fetching
    }
  }
);

// Order slice to manage order-related state
const orderSlice = createSlice({
  name: "order", // Slice name
  initialState, // Initial state for orders
  reducers: {
    // Action to set orders in the state
    setOrders: (state, action) => {
      state.orders = action.payload; // Set the orders from the action payload
    },
    // Action to set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload; // Update loading state
    },
  }
});

// Exporting the order slice reducer and actions
export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;

// Selector to get the order state from Redux store
export const orderSelector = (state) => state.orderReducer;
