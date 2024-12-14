import { useState } from "react"; // Importing useState hook for local state management
import styles from "./filter.module.css"; // Importing CSS module for styling
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for state management
import { productActions, productSelector } from "../../redux/slices/productSlice"; // Importing product actions and selector from the product slice

function Filter() {
    // State for toggling the visibility of the filter panel
    const [isOpen, setIsOpen] = useState(false);

    // Accessing categories and priceRange from the product slice state
    const { categories, priceRange } = useSelector(productSelector);
    const { setPriceRange, handleCategorySelect } = productActions; // Destructuring actions from the product slice
    const dispatch = useDispatch(); // Initializing the dispatch function

    // Function to toggle the visibility of the filter panel
    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={styles.filterContainer}>
                {/* Toggle button to show/hide the filter panel */}
                <button onClick={toggleFilter} className={styles.filterButton}>
                    {isOpen ? (
                        <i className="fi fi-rr-cross-circle"></i> // Close icon when the filter is open
                    ) : (
                        <i className="fi fi-rr-settings-sliders"></i> // Settings icon when the filter is closed
                    )}
                </button>

                {/* Filter panel */}
                <div className={`${styles.filters} ${isOpen ? styles.show : styles.hide}`}>
                    <h3>Filter</h3>

                    {/* Price range filter */}
                    <div className={styles.rangeGroup}>
                        <label>Price: ${Math.round(priceRange * 100) / 100}</label>
                        <input
                            type="range"
                            min={10}
                            max={1000}
                            step={10}
                            value={priceRange}
                            onChange={(e) => {
                                dispatch(setPriceRange(e.target.value)); // Dispatching action to update price range
                            }}
                        />
                    </div>

                    {/* Category filter */}
                    <h3>Category</h3>
                    {categories.map((category, index) => (
                        <div key={index} className={styles.checkboxGroup}>
                            <input
                                type="checkbox"
                                id={category}
                                value={category}
                                onClick={(e) => {
                                    dispatch(
                                        handleCategorySelect({
                                            checked: e.target.checked, // Whether the checkbox is selected
                                            selectedCategory: e.target.value, // Category value
                                        })
                                    );
                                }}
                            />
                            <label htmlFor={category}>{category}</label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Filter; // Exporting the Filter component
