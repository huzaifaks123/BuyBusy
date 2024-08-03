//import styles here
import styles from "../styles/Navbar.module.css"

// import context here
import { useValue } from "../Context/RegisterContext"

// import useful component from router
import { Link, Outlet } from "react-router-dom"

export default function Navbar() {

    //destructure product value here
    const { isVerified, handleLog } = useValue()

    return (
        <>
            <div className={styles.navContainer}>
                <Link to={"/"}>
                    <div className={styles.brandName}>
                    </div>
                </Link>
                <div className={styles.navList}>
                    <Link to={"/"} className={styles.link} >
                        <div className={styles.navButton}>
                            <div className={styles.homelogo}></div>
                            <h2 className={styles.navHeading}>Home</h2>
                        </div>
                    </Link>
                    {isVerified ?
                        <>
                            <Link to={"/myorder"} className={styles.link}>
                                <div className={styles.navButton}>
                                    <div className={styles.orderlogo}></div>
                                    <h2 className={styles.navHeading}>My Order</h2>
                                </div>
                            </Link>
                            <Link to={"/cart"} className={styles.link}>
                                <div className={styles.navButton}>
                                    <div className={styles.cartlogo}></div>
                                    <h2 className={styles.navHeading}>Cart</h2>
                                </div>
                            </Link></> : ""}
                    <Link to={isVerified ? "/" : "/signin"} className={styles.link}>
                        <div className={styles.navButton} onClick={handleLog}>
                            <div className={styles.loginlogo}></div>
                            <h2 className={styles.navHeading}>{isVerified ? "Logout" : "Login"}</h2>

                        </div>
                    </Link>
                </div>
            </div>

            {/* render outlet here */}
            <Outlet />
        </>
    )
}