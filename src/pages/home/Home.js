import Spinner from "react-spinner-material"; // Importing spinner component for loading indication
import Filter from "../../components/filter/Filter"; // Importing Filter component for filtering products
import ProductCard from "../../components/product-card/ProductCard"; // Importing ProductCard component to display individual product details
import Search from "../../components/search/Search"; // Importing Search component for searching products
import styles from "./home.module.css"; // Importing the CSS module for styling the Home page
import { useEffect } from "react"; // Importing useEffect hook for side-effects
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks to interact with the store
import { getAllProducts, productSelector } from "../../redux/slices/productSlice"; // Importing thunk and selector from Redux slice

function Home() {
    // Destructuring filtered products and loading state from the Redux store
    const { filteredProducts, isLoading } = useSelector(productSelector);
    const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

    // Fetch products on component mount using useEffect
    useEffect(() => {
        dispatch(getAllProducts()); // Dispatching thunk to fetch all products
    }, [dispatch]); // Empty dependency array ensures it runs only once after initial render

    return (
        <div className={styles.main}> {/* Main container */}
            <div className={styles.searchContainer}> {/* Container for search and filter */}
                <Search /> {/* Search component */}
                <Filter /> {/* Filter component */}
            </div>

            {/* Conditionally render loading spinner if data is still being fetched */}
            {isLoading && (
                <div className={styles.loadingContainer}> 
                    <Spinner radius={100} stroke={10} color="#294C60" /> {/* Loading spinner */}
                </div>
            )}

            {/* Product container displaying filtered products */}
            <div className={styles.productContainer}>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} /> // Rendering a ProductCard for each filtered product
                ))}
            </div>
        </div>
    );
}

export default Home; // Exporting Home component to be used in other parts of the app
