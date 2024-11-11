import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/product-card/ProductCard";
import Search from "../../components/search/Search";
import { useValue } from "../../context/userContext";
import styles from "./home.module.css"
function Home(){
    const {products} = useValue();
    return <div className={styles.main}>
        <div className={styles.searchContainer}>
            <Search/>
            <Filter/>
        </div>
        <div className={styles.productContainer}>
            {products.map(product=><ProductCard key={product.id} product={product}/>)}
        </div>
    </div>
}
export default Home;