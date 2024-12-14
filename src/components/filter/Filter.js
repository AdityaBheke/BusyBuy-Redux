import { useState } from "react";
import styles from "./filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { productActions, productSelector } from "../../redux/slices/productSlice";
function Filter(){
    const [isOpen, setIsOpen] = useState(false);
    const {categories, priceRange} = useSelector(productSelector);
    const {setPriceRange, handleCategorySelect} = productActions;
    const dispatch = useDispatch();
    
    const toggleFilter = ()=>{
        setIsOpen(!isOpen);
    }

    return <>
    <div className={styles.filterContainer}>
        <button onClick={toggleFilter} className={styles.filterButton}>{isOpen?<i className="fi fi-rr-cross-circle"></i>:<i className="fi fi-rr-settings-sliders"></i>}</button>
        <div className={`${styles.filters} ${isOpen?styles.show:styles.hide}`}>
            <h3>Filter</h3>
            <div className={styles.rangeGroup}>
                <label>Price: {Math.round(priceRange*100)/100}</label>
                <input type="range" min={10} max={1000} step={10} value={priceRange} onChange={(e)=>{dispatch(setPriceRange(e.target.value))}}/>
            </div>
            <h3>Category</h3>
            {
            categories.map((category, index)=><div key={index} className={styles.checkboxGroup}>
                <input type="checkbox" id={category} value={category} onClick={(e)=>{dispatch(handleCategorySelect({checked:e.target.checked, selectedCategory:e.target.value}))}}/>
                <label htmlFor={category}>{category}</label>
            </div>)
            }
        </div>
    </div>
    </>;
}
export default Filter;