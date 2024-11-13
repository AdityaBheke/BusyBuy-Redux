import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const userContext = createContext();

const useUserValue = ()=>{
    const value = useContext(userContext);
    return value;
}

function UserContextProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const [orders, setOrders] = useState([]);
    const auth = getAuth();

    // useEffect(()=>{
    //     setUser({id:"user1"})
    // },[])
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
            setUser(signedInUser);
            setIsLoggedIn(true);
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
          setUser({});
        }
      }
    // Function to add product to cart
    const handleAddToCart = (product)=>{
        const isAvailable = cart.find((cartItem)=>cartItem.productId===product.id);
        if (isAvailable) {
            setCart(cart.map((cartItem)=>cartItem.productId===product.id?{...cartItem, quantity: cartItem.quantity+1}:cartItem))
        } else {
            setCart([...cart, {userId: user.uid, productId: product.id, title: product.title, description: product.description, image: product.image, price:product.price, quantity: 1}])
        }
    }
    // function to remove product from cart
    const handleRemoveCart = (productId)=>{
        setCart(cart.filter((cartItem)=>cartItem.productId!==productId))
    }
    // function to increase quantity
    const increaseQuantity = (productId)=>{
        setCart(cart.map((cartItem)=>cartItem.productId===productId?{...cartItem, quantity: cartItem.quantity+1}:cartItem))
    }
    // function to decrease quantity
    const decreaseQuantity = (productId)=>{
        setCart(cart.map((cartItem)=>{
            if (cartItem.productId===productId && cartItem.quantity>0) {
                return {...cartItem, quantity: cartItem.quantity-1}
            }else{
                return cartItem;
            }
        }).filter((cartItem)=>!(cartItem.productId===productId&&cartItem.quantity===0)))
    }

    // calculate grandTotal
    useEffect(()=>{
        setGrandTotal(Math.round((cart.reduce((total,cartItem)=>{return total+(cartItem.price*cartItem.quantity)},0))*100)/100)
    },[cart]);

    // function to handle purchase
    function handlePurchase() {
        if (cart.length>0) {
            setOrders([...orders, {userId:user.uid, myOrder: cart, grandTotal: grandTotal, date: new Date()}]);
            setCart([]);
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