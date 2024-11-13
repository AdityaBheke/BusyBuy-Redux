import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

const useUserValue = ()=>{
    const value = useContext(userContext);
    return value;
}

function UserContextProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState({id:"user1"});
    const [cart, setCart] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        setUser({id:"user1"})
    },[])
    
    // Function to add product to cart
    const handleAddToCart = (product)=>{
        const isAvailable = cart.find((cartItem)=>cartItem.productId===product.id);
        if (isAvailable) {
            setCart(cart.map((cartItem)=>cartItem.productId===product.id?{...cartItem, quantity: cartItem.quantity+1}:cartItem))
        } else {
            setCart([...cart, {userId: user.id, productId: product.id, title: product.title, description: product.description, image: product.image, price:product.price, quantity: 1}])
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
        setGrandTotal(cart.reduce((total,cartItem)=>{return total+(cartItem.price*cartItem.quantity)},0))
    },[cart]);

    // function to handle purchase
    function handlePurchase() {
        setOrders([...orders, {userId:user.id, myOrder: cart}]);
        setCart([]);
    }


    return(<userContext.Provider value={{isLoggedIn, setIsLoggedIn, cart, handleAddToCart, handleRemoveCart, increaseQuantity, decreaseQuantity, grandTotal, handlePurchase, orders}}>
        {children}
    </userContext.Provider>)
}

export {useUserValue};
export default UserContextProvider;