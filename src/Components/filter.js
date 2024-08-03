//import style modules here
import styles from "../styles/HomePage.module.css"

// import context here
import { useProductValue } from "../Context/productContext"

export default function Filter() {

    //destructure product value here
    const { addFilter, handleSlider, sliderValue } = useProductValue()

    return (
        <div className={styles.filterContainer}>
            <h1 className={styles.filterHeading}>
                Filter
            </h1>
            <div className={styles.priceRange}>
                <h1>Price: {sliderValue}</h1>
                <div className={styles.range}>
                    <span>0</span>
                    <span>1499</span>
                </div>
            </div>
            <div className={styles.Slider}>
                <input
                    className={styles.runner}
                    type="range"
                    id="distanceSlider"
                    min="0"
                    max="1499"
                    step="1"
                    value={sliderValue}
                    onChange={handleSlider}
                />
            </div>
            <div className={styles.Category}>
                <h1 className={styles.CategoryHeading}>
                    Category
                </h1>
                <div className={styles.checkbox}>
                    <input type="checkbox" onClick={() => addFilter("electronics")}></input><span>electronics</span>
                </div>
                <div className={styles.checkbox}>
                    <input type="checkbox" onClick={() => addFilter("jewelery")}></input><span>jewelery</span>
                </div>
                <div className={styles.checkbox}>
                    <input type="checkbox" onClick={() => addFilter("men's clothing")}></input><span>men's clothing</span>
                </div>
                <div className={styles.checkbox}>
                    <input type="checkbox" onClick={() => addFilter("women's clothing")}></input><span>women's clothing</span>
                </div>
            </div>
        </div>
    )
}