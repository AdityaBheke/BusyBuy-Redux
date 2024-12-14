import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for state management
import styles from "./search.module.css"; // Importing CSS module for styling
import { productSelector } from "../../redux/slices/productSlice"; // Importing selector to access product-related state
import { productActions } from "../../redux/slices/productSlice"; // Importing product actions for dispatching updates
import { useCallback } from "react";

function Search() {
  // Destructuring searchText from the Redux store using productSelector
  const { searchText } = useSelector(productSelector);
  const dispatch = useDispatch(); // Initializing dispatch for triggering Redux actions

  const handleSearch = useCallback((e) => {
    // Dispatching action to update searchText in the Redux store
    dispatch(productActions.setSearchText(e.target.value));
  },[dispatch])
  return (
    // Search input box for filtering products by name
    <input 
      type="text" 
      placeholder="Search by name" 
      className={styles.search} // Applying styles from CSS module
      value={searchText} // Binding input value to searchText from the Redux store
      onChange={handleSearch}
    />
  );
}

export default Search;
