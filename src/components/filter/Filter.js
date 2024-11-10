import styles from "./filter.module.css";
function Filter(){
    return <>
    <div className={styles.filterContainer}>
        <button className={styles.filterButton}><i className="fi fi-rr-settings-sliders"></i></button>
        <div className={`${styles.filters} ${styles.hide}`}>
            <input type="range" min={0} max={100000} step={5000}/>
            <span>filters...</span>
            <span>filters...</span>
            <span>filters...</span>
            <span>filters...</span>
        </div>
    </div>
    </>;
}
export default Filter;