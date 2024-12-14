import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for state management
import OrderItem from "../../components/orderItem/OrderItem"; // Importing OrderItem component to display individual order items
import styles from "./order.module.css"; // Importing CSS module for styling the Order page
import { getOrders, orderSelector } from "../../redux/slices/orderSlice"; // Importing actions and selectors from the Redux slice
import { useEffect } from "react"; // Importing useEffect hook to manage side effects
import Spinner from "react-spinner-material"; // Importing Spinner component to show loading indicator

function Order() {
    // Extracting orders and loading state from the Redux store using useSelector
    const { orders, isLoading } = useSelector(orderSelector);
    const dispatch = useDispatch(); // Initializing dispatch to send actions to the store

    // Fetching orders when the component is mounted
    useEffect(() => {
        dispatch(getOrders()); // Dispatching action to fetch orders from the server
    }, [dispatch]);

    // Displaying loading spinner while orders are being fetched
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}> {/* Container for the spinner */}
                <Spinner radius={100} stroke={10} color="#294C60" /> {/* Spinner component */}
            </div>
        );
    }

    return (
        <>
            {/* If there are orders, render them */}
            {orders.length > 0 && (
                <div className={styles.main}> {/* Main container for the orders */}
                    <h1>Your Orders</h1> {/* Heading for the page */}
                    <div className={styles.orderContainer}> {/* Container for all order items */}
                        {orders.map((orderItem) => (
                            <OrderItem key={orderItem.id} orderItem={orderItem} /> // Rendering each order item 
                        ))}
                    </div>
                </div>
            )}

            {/* If no orders are found, display empty message */}
            {orders.length === 0 && (
                <h1 className={styles.emptyPageMessage}>No orders found</h1> // Empty page message 
            )}
        </>
    );
}

export default Order; // Exporting Order component for use in other parts of the app
