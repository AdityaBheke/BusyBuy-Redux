import Spinner from "react-spinner-material";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/product-card/ProductCard";
import Search from "../../components/search/Search";
import { useProductValue } from "../../context/productContext";
import styles from "./home.module.css"
function Home(){
    const {filteredProducts, isLoading} = useProductValue();
    return <div className={styles.main}>
        <div className={styles.searchContainer}>
            <Search/>
            <Filter/>
        </div>
        {isLoading && <div className={styles.loadingContainer}>
        <Spinner radius={100} stroke={10} color="#294C60"/>
        </div>}
        <div className={styles.productContainer}>
            {filteredProducts.map(product=><ProductCard key={product.id} product={product}/>)}
        </div>
    </div>
}
export default Home;