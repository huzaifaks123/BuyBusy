//import styles here
import styles from "../styles/HomePage.module.css"

// import necessory hooks
import { createRef } from "react"

// import context here
import { useProductValue } from "../Context/productContext"

// import card and filter Component  here
import ProductCard from "../Components/ProductCard"
import Filter from "../Components/filter"

// import Spinner Component here
import Spinner from 'react-spinner-material';

export default function HomePage() {

    //destructure value here
    const { showFilter, searchBar, search, toggleFilter, filteredData, sliderValue } = useProductValue()

    // create ref hook here
    const searchRef = createRef()

    // return HomePage components here
    return (
        <div className={styles.homeContainer}>
            <div className={styles.manage}>
                <div className={styles.filterButton}>
                    <input type="checkbox" className={styles.mainCheckbox} onClick={() => toggleFilter()}></input><span>Filter</span>
                    <input className={styles.searchbar} ref={searchRef} placeholder="Search Here" onChange={() => search(searchRef.current.value)}></input>
                </div>
            </div>
            <div className={styles.content}>
                {showFilter ? <aside className={styles.aside}>
                    <Filter />
                </aside> : ""}
                {/* {console.log(filteredData)} */}
                {filteredData && filteredData.length !== 0 ?

                    <main className={styles.main} style={{ width: 1500 }}>
                        <ProductCard />
                    </main> : searchBar === "" && sliderValue > 10 ?
                        <Spinner radius={80} color={"white"} stroke={2} visible={true} className={styles.spinner} /> : <div className={styles.notFound}>Product Not Found</div>
                }
            </div>
        </div>
    )
}
