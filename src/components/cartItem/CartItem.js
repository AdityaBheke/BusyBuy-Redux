import { useState } from "react";
// import { useUserValue } from "../../context/userContext";
import styles from "./cartItem.module.css";
import { useDispatch } from "react-redux";
import { decreaseQuantity, handleRemoveCart, increaseQuantity } from "../../redux/slices/cartSlice";
function CartItem(props) {
  const [buttonText, setButtonText] = useState("Remove from cart")
  const dispatch = useDispatch();
  // const {increaseQuantity, decreaseQuantity, handleRemoveCart} = useUserValue();
  const {productId, title, image, price, quantity} = props.cartItem;
  const handleRemove = async()=>{
    setButtonText("Removing")
    try {
      dispatch(handleRemoveCart(productId))
    } catch (error) {
      console.log(error.message);
    }finally{
      setButtonText("Remove from cart")
    }
  }
  return (
    <div className={styles.card} title={title}>
      <img
        src={image}
        alt="product-image"
        className={styles.thumbnail}
      />
      <div className={styles.cardInfo}>
      <span className={styles.title}>{title.length>30?title.substring(0,30)+"...":title}</span>
      <div className={styles.priceContainer}>
        <span className={styles.price}>${price}</span>
        <div className={styles.quantityGroup}>
          <button className={styles.changeQnty} onClick={()=>{dispatch(increaseQuantity(productId))}}><i className="fi fi-sr-add"></i></button>
          <span className={styles.quantity}>{quantity}</span>
          <button className={styles.changeQnty} onClick={()=>{dispatch(decreaseQuantity(productId))}}><i className="fi fi-sr-minus-circle"></i></button>
        </div>
      </div>
      </div>
      <button className={styles.remove} onClick={handleRemove}>{buttonText}</button>
    </div>
  );
}
export default CartItem;
