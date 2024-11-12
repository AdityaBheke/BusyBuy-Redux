import { useState } from "react";
import styles from "./filter.module.css";
import { useProductValue } from "../../context/productContext";
function Filter(){
    const [isOpen, setIsOpen] = useState(false);
    const {categories, setPriceRange, handleCategorySelect, priceRange} = useProductValue();
    
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
                <input type="range" min={0} max={1000} step={10} value={priceRange} onChange={(e)=>{setPriceRange(e.target.value)}}/>
            </div>
            <h3>Category</h3>
            {
            categories.map((category, index)=><div key={index} className={styles.checkboxGroup}>
                <input type="checkbox" id={category} value={category} onClick={(e)=>{handleCategorySelect(e.target.checked, e.target.value)}}/>
                <label htmlFor={category}>{category}</label>
            </div>)
            }
        </div>
    </div>
    </>;
}
export default Filter;