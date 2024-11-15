import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../config/firebase.config";
import { collection, getDocs } from "firebase/firestore";
const productContext = createContext();

const useProductValue = () => {
  const value = useContext(productContext);
  return value;
};

function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [filterCategories, setFilterCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch products from firebase db
  const fetchProducts = async () => {
    try {
      const snapShot = await getDocs(collection(db, "products"));
      const docs = snapShot.docs.map((product) => {
        return { id: product.id, ...product.data() };
      });
      const ctg = [];
      docs.forEach((product) => {
        if (!ctg.includes(product.category)) {
          ctg.push(product.category);
        }
      });
      setCategories(ctg);
      setProducts(docs);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false)
    }
  };
  // Initial fetching of products
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle category selection
  const handleCategorySelect = (checked, selectedCategory) => {
    if (checked && !filterCategories.includes(selectedCategory)) {
      setFilterCategories([...filterCategories, selectedCategory]);
    } else {
      setFilterCategories(
        filterCategories.filter((ctg) => ctg !== selectedCategory)
      );
    }
  };

  // function to filter products based on criteria
  const searchAndFilter = () => {
    const result = products.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchText.toLocaleLowerCase()) &&
        product.price <= priceRange &&
        (filterCategories.includes(product.category) ||
          filterCategories.length === 0)
      );
    });
    return result;
  };
  const filterAllProducts = useCallback(searchAndFilter, [
    products,
    priceRange,
    searchText,
    filterCategories,
  ]);

  useEffect(() => {
    setFilteredProducts(filterAllProducts());
  }, [filterAllProducts]);

  return (
    <productContext.Provider
      value={{
        filteredProducts,
        categories,
        setPriceRange,
        handleCategorySelect,
        priceRange,
        searchText,
        setSearchText,
        isLoading
      }}
    >
      {children}
    </productContext.Provider>
  );
}

export { useProductValue };
export default ProductContextProvider;
