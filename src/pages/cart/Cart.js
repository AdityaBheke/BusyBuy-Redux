import CartItem from "../../components/cartItem/CartItem";
import styles from "./cart.module.css";

function Cart(){
    return <div className={styles.main}>
        <div className={styles.productContainer}>
        <CartItem/>
        <CartItem/>
        <CartItem/>
        <CartItem/>
        </div>
        <div className={styles.totalContainer}>
            <div className={styles.total}>Grand Total <br/>$ 00000.00</div>
            <button className={styles.purchase}>Purchase</button>
        </div>
    </div>
}
export default Cart;