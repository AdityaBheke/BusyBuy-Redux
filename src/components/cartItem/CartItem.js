import { useState } from "react";
import { useUserValue } from "../../context/userContext";
import styles from "./cartItem.module.css";
function CartItem(props) {
  const [buttonText, setButtonText] = useState("Remove from cart")
  const {increaseQuantity, decreaseQuantity, handleRemoveCart} = useUserValue();
  const {productId, title, image, price, quantity} = props.cartItem;
  const handleRemove = async()=>{
    setButtonText("Removing")
    try {
      await handleRemoveCart(productId)
    } catch (error) {
      console.log(error.message);
    }finally{
      setButtonText("Remove from cart")
    }
  }
  return (
    <div className={styles.card}>
      <img
        src={image}
        alt="product-image"
        className={styles.thumbnail}
      />

      <span className={styles.title}>{title.length>30?title.substring(0,30)+"...":title}</span>
      <div className={styles.priceContainer}>
        <span className={styles.price}>${price}</span>
        <div className={styles.quantityGroup}>
          <button className={styles.changeQnty} onClick={()=>{increaseQuantity(productId)}}><i className="fi fi-sr-add"></i></button>
          <span className={styles.quantity}>{quantity}</span>
          <button className={styles.changeQnty} onClick={()=>{decreaseQuantity(productId)}}><i className="fi fi-sr-minus-circle"></i></button>
        </div>
      </div>

      <button className={styles.remove} onClick={handleRemove}>{buttonText}</button>
    </div>
  );
}
export default CartItem;
