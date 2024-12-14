import { useCallback, useEffect, useState } from "react"; // Importing React hooks
import CartItem from "../../components/cartItem/CartItem"; // Importing CartItem component to display individual items in the cart
import styles from "./cart.module.css"; // Importing CSS module for styling the Cart page
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigating to different pages
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for state management and dispatching actions
import { cartSelector, getCartItems, handlePurchase } from "../../redux/slices/cartSlice"; // Importing actions and selectors from the Redux slice

function Cart() {
    // State to manage the purchase button text (e.g., "Purchase" / "Purchasing")
    const [purchaseButton, setPurchaseButton] = useState("Purchase");
    const navigate = useNavigate(); // Hook to navigate to different pages
    const dispatch = useDispatch(); // Hook to dispatch actions to Redux store
    const { cart, grandTotal } = useSelector(cartSelector); // Getting cart and grandTotal data from the Redux store

    // Fetching cart items when the component is mounted
    useEffect(() => {
        dispatch(getCartItems()); // Dispatching action to get cart items from the database
    }, [dispatch]);

    // Handling checkout (purchase) process
    const handleCheckout = useCallback(async () => {
        try {
            setPurchaseButton("Purchasing"); // Updating button text while purchase is in progress
            await dispatch(handlePurchase()).unwrap(); // Dispatching action to handle the purchase
            navigate("/orders"); // Navigating to orders page after purchase
        } catch (error) {
            console.log(error.message); // Logging any error that occurs during the purchase process
        } finally {
            setPurchaseButton("Purchase"); // Resetting button text after purchase
        }
    },[dispatch, navigate])

    return (
        <>
            {/* Render cart if there are items */}
            {cart.length > 0 && (
                <div className={styles.main}> {/* Main cart container */}
                    <div className={styles.productContainer}> {/* Container for cart items */}
                        {cart.map((cartItem, index) => (
                            <CartItem key={index} cartItem={cartItem} /> // Rendering CartItem for each item in the cart
                        ))}
                    </div>
                    <div className={styles.totalContainer}> {/* Container for total amount */}
                        <div className={styles.total}> {/* Grand total section */}
                            <span className={styles.totalHead}>Grand Total</span>
                            <span className={styles.totalAmount}>${grandTotal}</span> {/* Displaying grand total */}
                        </div>
                        <button className={styles.purchase} onClick={handleCheckout}>
                            {purchaseButton} {/* Button to initiate purchase */}
                        </button>
                    </div>
                </div>
            )}

            {/* Render empty cart message if there are no items */}
            {cart.length === 0 && (
                <h1 className={styles.emptyPageMessage}>Your cart is empty</h1> // Displaying empty cart message
            )}
        </>
    );
}

export default Cart; // Exporting Cart component to be used in other parts of the app
