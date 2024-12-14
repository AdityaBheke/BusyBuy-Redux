import { useEffect, useState } from "react";
import CartItem from "../../components/cartItem/CartItem";
// import { useUserValue } from "../../context/userContext";
import styles from "./cart.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, getCartItems, handlePurchase } from "../../redux/slices/cartSlice";

function Cart(){
    const [purchaseButton, setPurchaseButton] = useState("Purchase");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cart, grandTotal} = useSelector(cartSelector);
    // const {cart, grandTotal, handlePurchase} = useUserValue();
    useEffect(()=>{
        dispatch(getCartItems())
    },[dispatch])
    const handleCheckout = async()=>{
        try {
            setPurchaseButton("Purchasing")
            dispatch(handlePurchase())
            navigate("/orders")
        } catch (error) {
            console.log(error.message);
        }finally{
            setPurchaseButton("Purchase")
        }
    }
    return (<>
    {cart.length>0 && <div className={styles.main}>
        <div className={styles.productContainer}>
            {cart.map((cartItem, index)=><CartItem key={index} cartItem={cartItem}/>)}
        </div>
        <div className={styles.totalContainer}>
            <div className={styles.total}>
                <span className={styles.totalHead}>Grand Total</span>
                <span className={styles.totalAmount}>${grandTotal}</span>
            </div>
            <button className={styles.purchase} onClick={handleCheckout}>{purchaseButton}</button>
        </div>
    </div>}
    {cart.length===0 && <h1 className={styles.emptyPageMessage}>Your cart is empty</h1>}
    </>);
}
export default Cart;