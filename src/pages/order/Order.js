import OrderItem from "../../components/orderItem/OrderItem";
import { useUserValue } from "../../context/userContext";
import styles from "./order.module.css";

function Order(){
    const {orders} = useUserValue();
    return (<>
    {orders.length>0 && <div className={styles.main}>
        <h1>Your Orders</h1>
        <div className={styles.orderContainer}>
            {orders.map((orderItem)=><OrderItem key={orderItem.id} orderItem={orderItem}/>)}
        </div>
    </div>}
    {orders.length===0 && <h1 className={styles.emptyPageMessage}>No orders found</h1>}
    </>);
}
export default Order;