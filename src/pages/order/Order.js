import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/orderItem/OrderItem";
// import { useUserValue } from "../../context/userContext";
import styles from "./order.module.css";
import { getOrders, orderSelector } from "../../redux/slices/orderSlice";
import { useEffect } from "react";

function Order(){
    // const {orders} = useUserValue();
    const {orders} = useSelector(orderSelector);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getOrders());
    },[dispatch])
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