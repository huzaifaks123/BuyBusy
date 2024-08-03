//import styles here
import styles from "../styles/CartPage.module.css"

// import context here
import { useProductValue } from "../Context/productContext"

// import Spinner Component here
import Spinner from 'react-spinner-material';

export default function CartPage() {

    //destructure value here
    const { cart, removeFromCart, addOrder, decreaseQty, increaseQty, filteredData, grandTotal } = useProductValue()

    if (!cart) {
        return
    }

    // return cart components here
    return (
        <div className={styles.homeContainer}>
            <div className={styles.content}>
                <aside className={styles.aside}>
                    <div className={styles.purchaseContainer}>
                        <h1 className={styles.filterHeading}>
                            Order Summary
                        </h1>
                        <div className={styles.orderSummary}>
                            <ul className={styles.listContainer}>
                                {cart.map((cart, index) => {
                                    const price = cart.item.price * cart.qty
                                    return <li key={index} className={styles.list}>
                                        <div className={styles.listName} >
                                            {cart.item.title.length >= 15 ? cart.item.title.slice(0, 15) + "..." : cart.item.title}
                                        </div>
                                        <div className={styles.listQty}>{cart.qty}</div>
                                        <div className={styles.listAmount}>{Number(price.toFixed(2))}</div>
                                    </li>
                                })}
                            </ul>
                            <hr />
                            <div className={styles.total}>
                                <div className={styles.listTotal}>Total</div>
                                <div className={styles.listTotalAmount}>{grandTotal}</div>
                            </div>
                            <button className={styles.purchase} onClick={() => addOrder()}>Purchase</button>
                        </div>
                    </div>
                </aside>
                {filteredData.length !== 0 ? <main className={styles.main} style={{ width: 1500 }}>
                    {cart.map((cart, index) => {
                        return <div className={styles.productContainer} key={index}>
                            <div className={styles.productImage}>
                                <img src={cart.item.image} alt="Product" />

                            </div>
                            <div className={styles.productName}>
                                {cart.item.title.length >= 30 ? cart.item.title.slice(0, 30) + "..." : cart.item.title}
                            </div>
                            <div className={styles.productAmount}>
                                <div>${cart.item.price}</div>
                                <div className={styles.productCount}>
                                    <button onClick={() => decreaseQty(cart)} className={styles.incDec}>-</button>
                                    <span >{cart.qty}</span>
                                    <button onClick={() => increaseQty(cart)} className={styles.incDec}>+</button>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(cart)} className={styles.removeFromCart}>
                                Remove From Cart
                            </button>
                        </div>
                    })}
                </main> : <Spinner radius={80} color={"white"} stroke={2} visible={true} className={styles.spinner} />}
            </div>
        </div>
    )
}
