import styles from "./productCard.module.css";

function ProductCard() {
  return (
    <div className={styles.card}>
      <img
        src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        alt="product-image"
        className={styles.thumbnail}
      />
      <div className={styles.cardInfo}>
        <span className={styles.title}>Product Title</span>
        <span className={styles.price}>$00.00</span>
      </div>

      <button className={styles.addToCart}>Add to cart</button>
    </div>
  );
}
export default ProductCard;
