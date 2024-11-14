import { useState } from "react";
import CartItem from "../../components/cartItem/CartItem";
import { useUserValue } from "../../context/userContext";
import styles from "./cart.module.css";
import { useNavigate } from "react-router-dom";

function Cart(){
    const [purchaseButton, setPurchaseButton] = useState("Purchase");
    const navigate = useNavigate();
    const {cart, grandTotal, handlePurchase} = useUserValue();
    const handleCheckout = async()=>{
        try {
            setPurchaseButton("Purchasing")
            await handlePurchase();
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
            <div className={styles.total}>Grand Total <br/>$ {grandTotal}</div>
            <button className={styles.purchase} onClick={handleCheckout}>{purchaseButton}</button>
        </div>
    </div>}
    {cart.length===0 && <h1 className={styles.emptyPageMessage}>Your cart is empty</h1>}
    </>);
}
export default Cart;