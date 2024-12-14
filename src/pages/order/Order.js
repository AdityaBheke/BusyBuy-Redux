import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/orderItem/OrderItem";
// import { useUserValue } from "../../context/userContext";
import styles from "./order.module.css";
import { getOrders, orderSelector } from "../../redux/slices/orderSlice";
import { useEffect } from "react";
import Spinner from "react-spinner-material";

function Order(){
    // const {orders} = useUserValue();
    const {orders, isLoading} = useSelector(orderSelector);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getOrders());
    },[dispatch])

    if (isLoading) {
        return <div className={styles.loadingContainer}>
        <Spinner radius={100} stroke={10} color="#294C60"/>
        </div>
    }
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