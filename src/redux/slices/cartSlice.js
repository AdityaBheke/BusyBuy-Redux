import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importing Redux Toolkit functions
import { userSelector } from "./userSlice"; // Importing user selector to get user data
import { addDoc, collection, deleteDoc, doc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore"; // Firestore methods for handling cart and orders
import { db } from "../../config/firebase.config"; // Firebase configuration
import { toast } from "react-toastify"; // Toast notifications for success/error messages

// Initial state for the cart slice
const initialState = {
  cart: [], // Cart items array
  grandTotal: 0, // Total amount for all items in the cart
};

// Thunk to fetch cart items for the logged-in user
export const getCartItems = createAsyncThunk("cart/getCartItems", async (arg, thunkApi) => {
  try {
    const state = thunkApi.getState(); // Get the current Redux state
    const { user } = userSelector(state); // Get logged-in user data from the state
    
    // Fetch cart items for the logged-in user from Firestore
    const snapShot = await getDocs(query(collection(db, "carts"), where("userId", "==", user.uid)));
    const cart = snapShot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    
    // Dispatch action to set the cart items in the state
    thunkApi.dispatch(cartActions.setCart(cart));
  } catch (error) {
    console.log(error); // Log any error that occurs during fetching
  }
});

// Thunk to add a product to the cart
export const handleAddToCart = createAsyncThunk("cart/handleAddToCart", async (arg, thunkApi) => {
  // fetch all and set cartItems of user before adding new cartItem
  await thunkApi.dispatch(getCartItems());

  const product = arg; // Product to be added to the cart
  const state = thunkApi.getState(); // Get the current Redux state
  const { user } = userSelector(state); // Get logged-in user data from the state
  const { cart } = cartSelector(state); // Get current cart items

  // Check if the product is already in the cart
  const availableItem = cart.find((cartItem) => cartItem.productId === product.id);
  
  if (availableItem) {
    // If the product is in the cart, update the quantity
    await updateDoc(doc(db, "carts", availableItem.id), {
      ...availableItem,
      quantity: availableItem.quantity + 1,
    });
  } else {
    // If the product is not in the cart, add it as a new item
    const newItem = {
      userId: user.uid,
      productId: product.id,
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
      quantity: 1,
    };
    await addDoc(collection(db, "carts"), newItem);
  }
  
  // Fetch updated cart items and show success toast
  thunkApi.dispatch(getCartItems());
  toast.success("Item added to cart.");
});

// Thunk to remove a product from the cart
export const handleRemoveCart = createAsyncThunk("cart/removeCart", async (arg, thunkApi) => {
  const productId = arg; // Product ID to be removed
  const state = thunkApi.getState(); // Get the current Redux state
  const { user } = userSelector(state); // Get logged-in user data from the state
  
  // Fetch cart items for the logged-in user from Firestore
  const snapshot = await getDocs(
    query(collection(db, "carts"), where("userId", "==", user.uid), where("productId", "==", productId))
  );
  
  // Remove the product from the cart
  snapshot.forEach(async (doc) => await deleteDoc(doc.ref));
  
  // Fetch updated cart items and show success toast
  thunkApi.dispatch(getCartItems());
  toast.success("Item removed from cart.");
});

// Thunk to increase the quantity of a product in the cart
export const increaseQuantity = createAsyncThunk("cart/increaseQuantity", async (arg, thunkApi) => {
  const productId = arg; // Product ID for which the quantity needs to be increased
  const state = thunkApi.getState(); // Get the current Redux state
  const { cart } = cartSelector(state); // Get current cart items
  
  // Find the product in the cart and increase the quantity
  const availableItem = cart.find((cartItem) => cartItem.productId === productId);
  
  if (availableItem) {
    await updateDoc(doc(db, "carts", availableItem.id), {
      ...availableItem,
      quantity: availableItem.quantity + 1,
    });
  }
  
  // Fetch updated cart items
  thunkApi.dispatch(getCartItems());
});

// Thunk to decrease the quantity of a product in the cart
export const decreaseQuantity = createAsyncThunk("cart/decreaseQuantity", async (arg, thunkApi) => {
  const productId = arg; // Product ID for which the quantity needs to be decreased
  const state = thunkApi.getState(); // Get the current Redux state
  const { cart } = cartSelector(state); // Get current cart items
  
  // Find the product in the cart and decrease the quantity
  const availableItem = cart.find((cartItem) => cartItem.productId === productId);
  
  if (availableItem && availableItem.quantity > 1) {
    await updateDoc(doc(db, "carts", availableItem.id), {
      ...availableItem,
      quantity: availableItem.quantity - 1,
    });
  } else if (availableItem && availableItem.quantity === 1) {
    // If the quantity is 1, remove the product from the cart
    await deleteDoc(doc(db, "carts", availableItem.id));
    toast.warning("Item removed as quantity reached zero.");
  }
  
  // Fetch updated cart items
  thunkApi.dispatch(getCartItems());
});

// Thunk to handle the purchase of items in the cart
export const handlePurchase = createAsyncThunk("cart/handlePurchase", async (arg, thunkApi) => {
  const state = thunkApi.getState(); // Get the current Redux state
  const { user } = userSelector(state); // Get logged-in user data from the state
  const { cart, grandTotal } = cartSelector(state); // Get cart items and grand total
  
  // If the cart has items, create an order and clear the cart
  if (cart.length > 0) {
    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      myOrder: cart,
      grandTotal: grandTotal,
      date: Timestamp.fromDate(new Date()), // Add current date to the order
    });
    
    // Remove cart items after order is placed
    const snapshot = await getDocs(query(collection(db, "carts"), where("userId", "==", user.uid)));
    snapshot.forEach(async (doc) => await deleteDoc(doc.ref));
    
    // Fetch updated cart items and show success toast
    thunkApi.dispatch(getCartItems());
    toast.success("Order placed! Thank you for shopping with us!");
  }
});

// Cart slice to manage cart-related state
const cartSlice = createSlice({
  name: "cart", // Slice name
  initialState, // Initial state for the cart
  reducers: {
    // Action to set cart items and calculate grand total
    setCart: (state, action) => {
      state.cart = action.payload; // Set the cart items from the action payload
      state.grandTotal = Math.round(
        action.payload.reduce((total, cartItem) => {
          return total + cartItem.price * cartItem.quantity;
        }, 0) * 100
      ) / 100; // Calculate the grand total of cart items
    }
  },
});

// Exporting the cart slice reducer and actions
export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;

// Selector to get the cart state from Redux store
export const cartSelector = (state) => state.cartReducer;
