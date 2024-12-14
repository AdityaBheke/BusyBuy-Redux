import { useDispatch, useSelector } from "react-redux";
// import { useProductValue } from "../../context/productContext";
import styles from "./search.module.css"
import { productSelector } from "../../redux/slices/productSlice";
import { productActions } from "../../redux/slices/productSlice";
function Search(){
    // const {searchText, setSearchText} = useProductValue();
    const {searchText} = useSelector(productSelector);
    const dispatch = useDispatch();
    return <input type="text" placeholder="Search by name" className={styles.search} value={searchText} onChange={(e)=>{dispatch(productActions.setSearchText(e.target.value))}}/>;
}
export default Search;