import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userSelector } from "./userSlice";
import { addDoc, collection, deleteDoc, doc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { toast } from "react-toastify";

const initialState = {
    cart: [],
    grandTotal: 0,
    isLoading:true
}
export const getCartItems = createAsyncThunk('cart/getCartItems',async(arg, thunkApi)=>{
  thunkApi.dispatch(cartActions.setLoading(true));
  try {
    const state = thunkApi.getState();
    const {user} = userSelector(state);
    const snapShot = await getDocs(query(collection(db,'carts'), where('userId',"==",user.uid)));
    const cart = snapShot.docs.map((doc)=>{return {id:doc.id, ...doc.data()}});
    thunkApi.dispatch(cartActions.setCart(cart));
  } catch (error) {
    
  }finally{
    thunkApi.dispatch(cartActions.setLoading(false))
  }
});
export const handleAddToCart = createAsyncThunk('cart/handleAddToCart',async(arg,thunkApi)=>{
    const product = arg;
    const state = thunkApi.getState();
    const {user} = userSelector(state);
    const {cart} = cartSelector(state);
    const availableItem = cart.find(
        (cartItem) => cartItem.productId === product.id
      );
    if (availableItem) {
          await updateDoc(doc(db, "carts", availableItem.id), {
            ...availableItem,
            quantity: availableItem.quantity + 1,
          });
    } else {
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
    thunkApi.dispatch(getCartItems())
    toast.success("Item added");
})
export const handleRemoveCart = createAsyncThunk('cart/removeCart',async(arg, thunkApi)=>{
    const productId = arg;
    const state = thunkApi.getState();
    const {user} = userSelector(state);
    const snapshot = await getDocs(
          query(
            collection(db, "carts"),
            where("userId", "==", user.uid),
            where("productId", "==", productId)
          )
        );
        snapshot.forEach(async (doc) => await deleteDoc(doc.ref));
        thunkApi.dispatch(getCartItems())
        toast.success("Item removed");
})
export const increaseQuantity = createAsyncThunk('cart/increaseQuantity', async(arg, thunkApi)=>{
    const productId = arg;
    const state = thunkApi.getState();
    const {cart} = cartSelector(state);
    const availableItem = cart.find(
        (cartItem) => cartItem.productId === productId
      );
      if (availableItem) {
        await updateDoc(doc(db, "carts", availableItem.id), {
          ...availableItem,
          quantity: availableItem.quantity + 1,
        });
      }
      thunkApi.dispatch(getCartItems())
})
export const decreaseQuantity = createAsyncThunk('cart/decreaseQuantity', async(arg, thunkApi)=>{
    const productId = arg;
    const state = thunkApi.getState();
    const {cart} = cartSelector(state);
    const availableItem = cart.find(
        (cartItem) => cartItem.productId === productId
      );
      if (availableItem && availableItem.quantity > 1) {
        await updateDoc(doc(db, "carts", availableItem.id), {
          ...availableItem,
          quantity: availableItem.quantity - 1,
        });
      } else if (availableItem && availableItem.quantity === 1) {
        await deleteDoc(doc(db, "carts", availableItem.id));
        toast.warning("Item removed as quantity reached zero.");
      }
      thunkApi.dispatch(getCartItems())
})
export const handlePurchase = createAsyncThunk('cart/handlePurchase', async(arg, thunkApi)=>{
    const state = thunkApi.getState();
    const {user} = userSelector(state);
    const {cart, grandTotal} = cartSelector(state);
    if (cart.length > 0) {
          await addDoc(collection(db, "orders"), {
            userId: user.uid,
            myOrder: cart,
            grandTotal: grandTotal,
            date: Timestamp.fromDate(new Date()),
          });
          const snapshot = await getDocs(
            query(collection(db, "carts"), where("userId", "==", user.uid))
          );
          snapshot.forEach(async (doc) => await deleteDoc(doc.ref));
          thunkApi.dispatch(getCartItems())
          toast.success("Order placed");
        }
})
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCart:(state, action)=>{
            state.cart = action.payload;
            state.grandTotal=Math.round((action.payload.reduce((total,cartItem)=>{return total+(cartItem.price*cartItem.quantity)},0))*100)/100;
        },
        setLoading:(state, action)=>{
          state.isLoading = action.payload;
      },
    }
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const cartSelector = (state)=>state.cartReducer;