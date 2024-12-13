import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase.config";

const initialState = {
    products:[],
    filteredProducts:[],
    categories:[],
    filterCategories:[],
    priceRange:1000,
    searchText:"",
    isLoading:false
}
export const getAllProducts = createAsyncThunk('product/fetchProducts',async(arg, thunkApi)=>{
    try {
        thunkApi.dispatch(productActions.setLoading(true))
        const snapShot = await getDocs(collection(db, "products"));
        const products = snapShot.docs.map((product) => {
            return { id: product.id, ...product.data() };
          });
        const categories = [];
        products.forEach((product) => {
            if (!categories.includes(product.category)) {
              categories.push(product.category);
            }
          });
        thunkApi.dispatch(productActions.setProdAndCat({products,categories}))
    } catch (error) {
        console.log(error)
    }finally{
        thunkApi.dispatch(productActions.setLoading(false))
    }
})
const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        setLoading:(state, action)=>{
            state.isLoading = action.payload;
        },
        setProdAndCat: (state, action)=>{
            const {products, categories} = action.payload;
            state.products = [...products];
            state.categories = [...categories];
        },
        handleCategorySelect:(state, action)=>{
            const {checked, selectedCategory} = action.payload;
            if (checked && !state.filterCategories.includes(selectedCategory)) {
                state.filterCategories = [...state.filterCategories, selectedCategory];
            } else {
                state.filterCategories = state.filterCategories.filter((ctg) => ctg !== selectedCategory)
            }
            productSlice.caseReducers.searchAndFilter(state);
        },
        setSearchText:(state, action)=>{
            state.searchText = action.payload;
            productSlice.caseReducers.searchAndFilter(state);
        },
        setPriceRange:(state, action)=>{
            state.priceRange = action.payload;
            productSlice.caseReducers.searchAndFilter(state);
        },
        searchAndFilter: (state, action)=>{
            const {products,priceRange,searchText,filterCategories} = state;
            state.filteredProducts = products.filter((product) => {
                return (
                  product.title.toLowerCase().includes(searchText.toLocaleLowerCase()) &&
                  product.price <= priceRange &&
                  (filterCategories.includes(product.category) ||
                    filterCategories.length === 0)
                );
              });
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getAllProducts.fulfilled,(state, action)=>{
            productSlice.caseReducers.searchAndFilter(state);
        })
    }
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
export const productSelector = (state)=>state.productReducer;