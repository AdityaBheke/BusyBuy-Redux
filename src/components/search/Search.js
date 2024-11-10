import styles from "./search.module.css"
function Search(){
    return <input type="text" placeholder="Search" className={styles.search}/>;
}
export default Search;