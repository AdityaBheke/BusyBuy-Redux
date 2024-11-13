import CartItem from "../../components/cartItem/CartItem";
import { useUserValue } from "../../context/userContext";
import styles from "./cart.module.css";

function Cart(){
    const {cart, grandTotal} = useUserValue();
    return <div className={styles.main}>
        <div className={styles.productContainer}>
            {cart.map((cartItem, index)=><CartItem key={index} cartItem={cartItem}/>)}
        </div>
        <div className={styles.totalContainer}>
            <div className={styles.total}>Grand Total <br/>$ {grandTotal}</div>
            <button className={styles.purchase}>Purchase</button>
        </div>
    </div>
}
export default Cart;