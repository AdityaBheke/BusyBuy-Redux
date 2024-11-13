import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../config/firebase.config";
import { addDoc, collection, deleteDoc, doc, query, updateDoc, where, onSnapshot, getDocs, orderBy } from "firebase/firestore";
// import { collection, onSnapshot, query, where } from "firebase/firestore";

const userContext = createContext();

const useUserValue = ()=>{
    const value = useContext(userContext);
    return value;
}

function UserContextProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({uid:""});
    const [cart, setCart] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const [orders, setOrders] = useState([]);
    const auth = getAuth();

    useEffect(()=>{
        const prevUser = JSON.parse(localStorage.getItem("user"));
        if (prevUser?.uid) {
            setIsLoggedIn(true)
            setUser(prevUser)
        }
    },[])
    useEffect(()=>{
        
        onSnapshot(query(collection(db, 'carts'), where("userId","==", user.uid)),(snapshot)=>{
            setCart(snapshot.docs.map((doc)=>{return{id:doc.id,...doc.data()}}));
        });
        onSnapshot(query(collection(db, 'orders'), where("userId","==", user.uid)),orderBy("date","desc"),(snapshot)=>{
            setOrders(snapshot.docs.map((doc)=>{return{id:doc.id,...doc.data()}}));
        })
    },[user])
    // Function to handle signUp
    const handleSignUp = async(email, password)=>{
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            return true
        } catch (error) {
            console.log(error.message);
            return false
        }
    }
    // Function to handle signIn
    const handleSignIn = async(email, password)=>{
        try {
            const signedInUser = await signInWithEmailAndPassword(auth, email, password);
            setUser(signedInUser.user);
            setIsLoggedIn(true);
            localStorage.setItem("user",JSON.stringify(signedInUser.user));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    // Function to handle logout
    const handleLogout = ()=>{
        if (isLoggedIn) {
          setIsLoggedIn(false);
          localStorage.setItem("user",JSON.stringify({uid:""}));
          setUser({uid:""});
        }
      }
    // Function to add product to cart
    const handleAddToCart = async(product)=>{
        const availableItem = cart.find((cartItem)=>cartItem.productId===product.id);
        if (availableItem) {
            // setCart(cart.map((cartItem)=>cartItem.productId===product.id?{...availableItem, quantity: availableItem.quantity+1}:cartItem))
            await updateDoc(doc(db, 'carts',availableItem.id),{...availableItem, quantity: availableItem.quantity+1})
        } else {
            const newItem = {userId: user.uid, productId: product.id, title: product.title, description: product.description, image: product.image, price:product.price, quantity: 1}            
            // setCart([...cart, newItem]);
            await addDoc(collection(db, 'carts'),newItem)
        }
    }
    // function to remove product from cart
    const handleRemoveCart = async(productId)=>{
        // setCart(cart.filter((cartItem)=>cartItem.productId!==productId))
        const snapshot = await getDocs(query(collection(db, 'carts'), where("userId","==",user.uid), where("productId","==",productId)))
        snapshot.forEach(async(doc)=>await deleteDoc(doc.ref))
    }
    // function to increase quantity
    const increaseQuantity = async(productId)=>{
        // setCart(cart.map((cartItem)=>cartItem.productId===productId?{...cartItem, quantity: cartItem.quantity+1}:cartItem))
        const availableItem = cart.find((cartItem)=>cartItem.productId===productId);
        if (availableItem) {
            await updateDoc(doc(db, 'carts',availableItem.id),{...availableItem, quantity: availableItem.quantity+1})
        }
    }
    // function to decrease quantity
    const decreaseQuantity = async(productId)=>{
        // setCart(cart.map((cartItem)=>{
        //     if (cartItem.productId===productId && cartItem.quantity>0) {
        //         return {...cartItem, quantity: cartItem.quantity-1}
        //     }else{
        //         return cartItem;
        //     }
        // }).filter((cartItem)=>!(cartItem.productId===productId&&cartItem.quantity===0)))
        const availableItem = cart.find((cartItem)=>cartItem.productId===productId);
        if (availableItem && availableItem.quantity>1) {
            await updateDoc(doc(db, 'carts',availableItem.id),{...availableItem, quantity: availableItem.quantity-1})
        }else if(availableItem && availableItem.quantity===1){
            await deleteDoc(doc(db, 'carts', availableItem.id))
        }
    }

    // calculate grandTotal
    useEffect(()=>{
        setGrandTotal(Math.round((cart.reduce((total,cartItem)=>{return total+(cartItem.price*cartItem.quantity)},0))*100)/100)
    },[cart]);

    // function to handle purchase
    async function handlePurchase() {
        if (cart.length>0) {
            // setOrders([...orders, {userId:user.uid, myOrder: cart, grandTotal: grandTotal, date: new Date()}]);
            await addDoc(collection(db, "orders"), {userId:user.uid, myOrder: cart, grandTotal: grandTotal, date: new Date()})
            const snapshot = await getDocs(query(collection(db, 'carts'), where("userId","==",user.uid)))
            snapshot.forEach(async(doc)=>await deleteDoc(doc.ref))
            // setCart([]);
        }
    }


    return (
      <userContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          cart,
          handleAddToCart,
          handleRemoveCart,
          increaseQuantity,
          decreaseQuantity,
          grandTotal,
          handlePurchase,
          orders,
          handleSignUp,
          handleSignIn,
          handleLogout
        }}
      >
        {children}
      </userContext.Provider>
    );
}

export {useUserValue};
export default UserContextProvider;