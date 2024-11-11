import styles from "./cartItem.module.css";
function CartItem() {
  return (
    <div className={styles.card}>
      <img
        src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        alt="product-image"
        className={styles.thumbnail}
      />

      <span className={styles.title}>Product Title</span>
      <div className={styles.priceContainer}>
        <span className={styles.price}>$00.00</span>
        <div className={styles.quantityGroup}>
          <button className={styles.changeQnty}><i className="fi fi-sr-add"></i></button>
          <span className={styles.quantity}>00</span>
          <button className={styles.changeQnty}><i className="fi fi-sr-minus-circle"></i></button>
        </div>
      </div>

      <button className={styles.remove}>Remove from cart</button>
    </div>
  );
}
export default CartItem;
