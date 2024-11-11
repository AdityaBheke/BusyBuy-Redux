import OrderItem from "../../components/orderItem/OrderItem";
import styles from "./order.module.css";

function Order(){
    return <div className={styles.main}>
        <h1>Your Orders</h1>
        <div className={styles.orderContainer}>
            <OrderItem/>
            <OrderItem/>
            <OrderItem/>
        </div>
    </div>
}
export default Order;