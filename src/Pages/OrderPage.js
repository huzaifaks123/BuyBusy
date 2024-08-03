//import styles here
import styles from "../styles/OrderPage.module.css"
// import context here
import { useProductValue } from "../Context/productContext"
// import Spinner Component here
import Spinner from 'react-spinner-material';


export default function OrderPage() {

    //destructure value here
    const { order, filteredData } = useProductValue()

    // return OrderPage components here
    return (
        <div className={styles.orderContainer}>
            {filteredData.length !== 0 ?
                <><h1>My Order</h1>
                    {order.map((list, index) => (
                        <div className={styles.purchaseContainer} key={index}>
                            <h2 className={styles.date}>On :- {list[0].date}</h2>
                            <div className={styles.orderSummary}>
                                <ul className={styles.listContainer}>
                                    <li key={index} className={styles.list}>
                                        <h3 className={styles.listName}>Name</h3>
                                        <h3 className={styles.listQty}>Qty</h3>
                                        <h3 className={styles.listAmount}>Price</h3>
                                    </li>
                                    <hr className={styles.tagHr} />
                                    {Object.keys(list).map((prod, index) => {
                                        return (
                                            <li key={index} className={styles.list}>
                                                <div className={styles.listName}>{list[prod].item.title}</div>
                                                <div className={styles.listQty}>{list[prod].qty}</div>
                                                <div className={styles.listAmount}>${list[prod].item.price}</div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <hr className={styles.hr} />
                                <div className={styles.total}>
                                    <div className={styles.listTotal}>Total</div>
                                    <div className={styles.listTotalAmount}>${list[0].totalAmount}</div>
                                </div>
                            </div>
                        </div>
                    ))}</>
                : <Spinner radius={80} color={"white"} stroke={2} visible={true} className={styles.spinner} />}
        </div>
    );
}
