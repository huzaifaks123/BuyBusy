//import styles here
import styles from "../styles/HomePage.module.css"

// import context here
import { useValue } from "../Context/RegisterContext"
import { useProductValue } from "../Context/productContext"

// import useful component from router
import { Link } from "react-router-dom"

export default function ProductCard() {

    //destructure value here
    const { isVerified } = useValue()
    const { filteredData, buyNow, addToCart, signin } = useProductValue()

    return (filteredData.map((item) => {
        return <div className={styles.productContainer} key={item.id}>
            <div className={styles.productImage}>
                <img src={item.image} alt="ProductName" />
            </div>
            <div className={styles.productName}>
                {item.title.length >= 30 ? item.title.slice(0, 30) + "..." : item.title}
            </div>
            <div className={styles.productAmount}>
                ${item.price}
            </div>
            <Link to={isVerified ? "/myorder" : "/signin"} className={styles.buyNow}>
                <button className={styles.buyNow} onClick={isVerified ? () => buyNow({ item }) : () => signin()}>
                    Buy Now
                </button>
            </Link>
            <button className={styles.addToCart} onClick={isVerified ? () => addToCart({ item }) : () => signin()}>
                Add To Cart
            </button>
        </div>
    }))
}