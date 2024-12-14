import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importing Redux Toolkit functions
import { collection, getDocs } from "firebase/firestore"; // Firebase Firestore methods
import { db } from "../../config/firebase.config"; // Importing Firebase configuration

// Initial state for the product slice
const initialState = {
    products: [], // List of all products
    filteredProducts: [], // List of filtered products based on search and filters
    categories: [], // List of product categories
    filterCategories: [], // List of selected filter categories
    priceRange: 1000, // Price range for filtering
    searchText: "", // Search text for product search
    isLoading: false // Loading state for data fetching
};

// Thunk to fetch all products from Firestore and set products and categories
export const getAllProducts = createAsyncThunk('product/fetchProducts', async (arg, thunkApi) => {
    try {
        thunkApi.dispatch(productActions.setLoading(true)); // Set loading to true before fetching
        const snapShot = await getDocs(collection(db, "products")); // Fetch products from Firestore
        const products = snapShot.docs.map((product) => {
            return { id: product.id, ...product.data() }; // Extract product data
        });

        // Extracting unique categories from products
        const categories = [];
        products.forEach((product) => {
            if (!categories.includes(product.category)) {
                categories.push(product.category); // Add category if not already in the list
            }
        });

        // Dispatch action to set products and categories in the state
        thunkApi.dispatch(productActions.setProdAndCat({ products, categories }));
    } catch (error) {
        console.log(error); // Log any error
    } finally {
        thunkApi.dispatch(productActions.setLoading(false)); // Set loading to false after fetching
    }
});

// Product slice to manage product-related state
const productSlice = createSlice({
    name: 'product', // Slice name
    initialState, // Initial state for products
    reducers: {
        // Action to set loading state
        setLoading: (state, action) => {
            state.isLoading = action.payload; // Update loading state
        },
        // Action to set products and categories
        setProdAndCat: (state, action) => {
            const { products, categories } = action.payload;
            state.products = [...products]; // Set products
            state.categories = [...categories]; // Set categories
        },
        // Action to handle category selection for filtering
        handleCategorySelect: (state, action) => {
            const { checked, selectedCategory } = action.payload;
            if (checked && !state.filterCategories.includes(selectedCategory)) {
                state.filterCategories = [...state.filterCategories, selectedCategory]; // Add category to filter list
            } else {
                state.filterCategories = state.filterCategories.filter((ctg) => ctg !== selectedCategory); // Remove category from filter list
            }
            productSlice.caseReducers.searchAndFilter(state); // Apply filtering after category selection
        },
        // Action to set the search text
        setSearchText: (state, action) => {
            state.searchText = action.payload; // Update search text
            productSlice.caseReducers.searchAndFilter(state); // Apply filtering after updating search text
        },
        // Action to set the price range
        setPriceRange: (state, action) => {
            state.priceRange = action.payload; // Update price range
            productSlice.caseReducers.searchAndFilter(state); // Apply filtering after updating price range
        },
        // Action to perform the search and filtering of products
        searchAndFilter: (state, action) => {
            const { products, priceRange, searchText, filterCategories } = state;
            state.filteredProducts = products.filter((product) => {
                return (
                    product.title.toLowerCase().includes(searchText.toLowerCase()) && // Filter by search text
                    product.price <= priceRange && // Filter by price range
                    (filterCategories.includes(product.category) || // Filter by selected categories
                        filterCategories.length === 0) // If no category is selected, show all products
                );
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            productSlice.caseReducers.searchAndFilter(state); // Apply filtering after fetching products
        });
    }
});

// Exporting the product slice reducer and actions
export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;

// Selector to get the product state from Redux store
export const productSelector = (state) => state.productReducer;
