import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/product-card/ProductCard";
import Search from "../../components/search/Search";
import styles from "./home.module.css"
function Home(){
    return <div className={styles.main}>
        <div className={styles.searchContainer}>
            <Search/>
            <Filter/>
        </div>
        <div className={styles.productContainer}>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
    </div>
}
export default Home;