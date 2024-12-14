import { useNavigate } from "react-router-dom"; // Importing for navigation between routes
import styles from "./productCard.module.css"; // Importing CSS module for styling
import { useState } from "react"; // Importing useState for local state management
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import { userSelector } from "../../redux/slices/userSlice"; // Importing userSelector to get user-related state
import { handleAddToCart } from "../../redux/slices/cartSlice"; // Importing cart-related action

function ProductCard(props) {
  // Extracting product details from props
  const { title, price, image } = props.product;

  // Getting user login state from Redux store
  const { isLoggedIn } = useSelector(userSelector);

  const dispatch = useDispatch(); // Initializing dispatch for dispatching Redux actions
  const [buttonText, setButtonText] = useState(<>Add to Cart</>); // Managing button state for "Add to Cart"
  const navigate = useNavigate(); // Initializing navigation hook

  // Handle "Add to Cart" button click
  const handleAdd = async () => {
    try {
      // Setting button state to show loading spinner
      setButtonText(<i className="fi fi-rr-loading"></i>);
      if (isLoggedIn) {
        // Dispatching action to add product to cart if the user is logged in
        await dispatch(handleAddToCart(props.product)).unwrap();
      } else {
        // Redirecting to signin page if the user is not logged in
        navigate("/signin");
      }
    } catch (error) {
      console.log(error.message); // Logging error message to the console
    } finally {
      // Resetting button state back to "Add to Cart"
      setButtonText(<>Add to Cart</>);
    }
  };

  return (
    <div className={styles.card} title={title}>
      {/* Displaying product image */}
      <img
        src={image}
        alt="product-image"
        className={styles.thumbnail}
      />
      <div className={styles.cardInfo}>
        {/* Displaying product title and truncating if it's too long */}
        <span className={styles.title}>
          {title.length > 30 ? title.substring(0, 30) + "..." : title}
        </span>
        {/* Displaying product price */}
        <span className={styles.price}>${price}</span>
      </div>
      {/* Add to Cart button */}
      <button className={styles.addToCart} onClick={handleAdd}>
        {buttonText}
      </button>
    </div>
  );
}

export default ProductCard;
