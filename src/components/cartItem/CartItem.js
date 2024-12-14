import { useCallback, useState } from "react"; // Importing useState hook for managing component-specific state
import styles from "./cartItem.module.css"; // Importing CSS module for styling the CartItem component
import { useDispatch } from "react-redux"; // Importing useDispatch hook to dispatch Redux actions
import { decreaseQuantity, handleRemoveCart, increaseQuantity } from "../../redux/slices/cartSlice"; // Importing Redux actions for cart management

function CartItem(props) {
  // State to handle the text of the remove button
  const [buttonText, setButtonText] = useState("Remove from cart");
  const dispatch = useDispatch(); // Initializing dispatch to send actions to the store

  // Destructuring cart item properties from props
  const { productId, title, image, price, quantity } = props.cartItem;

  // Function to handle the removal of an item from the cart
  const handleRemove = useCallback(async () => {
    setButtonText("Removing"); // Setting button text to indicate removal process
    try {
      dispatch(handleRemoveCart(productId)); // Dispatching action to remove the item
    } catch (error) {
      console.log(error.message); // Logging error in case of failure
    } finally {
      setButtonText("Remove from cart"); // Resetting button text after operation
    }
  },[dispatch, productId]);

  const handleIncrease = useCallback(() => {
    dispatch(increaseQuantity(productId)); // Dispatching action to increase quantity
  },[dispatch, productId])

  const handleDecrease = useCallback(() => {
    dispatch(decreaseQuantity(productId)); // Dispatching action to decrease quantity
    },[dispatch, productId])

  return (
    <div className={styles.card} title={title}> {/* Main container for the cart item */}
      {/* Product image */}
      <img
        src={image}
        alt="product-image"
        className={styles.thumbnail}
      />
      <div className={styles.cardInfo}> {/* Container for product information */}
        {/* Displaying product title */}
        <span className={styles.title}>
          {title.length > 30 ? title.substring(0, 30) + "..." : title} {/* Truncating title if too long */}
        </span>
        <div className={styles.priceContainer}> {/* Container for price and quantity controls */}
          {/* Displaying product price */}
          <span className={styles.price}>${price}</span>
          {/* Quantity adjustment controls */}
          <div className={styles.quantityGroup}>
            {/* Increase quantity button */}
            <button
              className={styles.changeQnty}
              onClick={handleIncrease}
            >
              <i className="fi fi-sr-add"></i> {/* Add icon */}
            </button>
            {/* Displaying current quantity */}
            <span className={styles.quantity}>{quantity}</span>
            {/* Decrease quantity button */}
            <button className={styles.changeQnty} onClick={handleDecrease}>
              <i className="fi fi-sr-minus-circle"></i> {/* Minus icon */}
            </button>
          </div>
        </div>
      </div>
      {/* Remove from cart button */}
      <button
        className={styles.remove}
        onClick={handleRemove}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default CartItem; // Exporting CartItem component for use in other parts of the app
