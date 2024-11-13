import { useUserValue } from "../../context/userContext";
import styles from "./cartItem.module.css";
function CartItem(props) {
  const {increaseQuantity, decreaseQuantity, handleRemoveCart} = useUserValue();
  const {productId, title, image, price, quantity} = props.cartItem;
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

      <button className={styles.remove} onClick={()=>{handleRemoveCart(productId)}}>Remove from cart</button>
    </div>
  );
}
export default CartItem;
