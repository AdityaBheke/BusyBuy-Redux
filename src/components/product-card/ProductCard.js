import styles from "./productCard.module.css";

function ProductCard(props) {
  const {title, price, image} = props.product;
  
  return (
    <div className={styles.card}>
      <img
        src={image}
        alt="product-image"
        className={styles.thumbnail}
      />
      <div className={styles.cardInfo}>
        <span className={styles.title}>{title.length>30?title.substring(0,30)+"...":title}</span>
        <span className={styles.price}>${price}</span>
      </div>

      <button className={styles.addToCart}>Add to cart</button>
    </div>
  );
}
export default ProductCard;
