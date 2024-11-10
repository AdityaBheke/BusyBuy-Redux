import Filter from "../../components/filter/Filter";
import Search from "../../components/search/Search";
import styles from "./home.module.css"
function Home(){
    return <div className={styles.main}>
        <div className={styles.searchContainer}>
            <Search/>
            <Filter/>
        </div>
        <div className={styles.productContainer}>

        </div>
    </div>
}
export default Home;