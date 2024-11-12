import { useProductValue } from "../../context/productContext";
import styles from "./search.module.css"
function Search(){
    const {searchText, setSearchText} = useProductValue();
    return <input type="text" placeholder="Search" className={styles.search} value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>;
}
export default Search;