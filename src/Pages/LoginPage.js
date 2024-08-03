import { createRef } from "react"
//import styles here
import styles from "../styles/LoginPage.module.css"
// import context here
import { useValue } from "../Context/RegisterContext"
// import useful component from router
import { Link } from "react-router-dom"

export default function LoginPage() {

    //destructure value here
    const {handleLogin,setFormData } = useValue()

    // define ref for input value
    const emailRef = createRef()
    const passwordRef = createRef()

    // function to update date from inputbox
    const handleChange = () => {
        setFormData(
            {
                email: emailRef.current.value,
                password: passwordRef.current.value
            }
        )
    }

    // return LoginPage components here
    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.heading}>Welcome Back</h1>
            <div className={styles.loginForm}>
                <input onChange={handleChange} ref={emailRef} type="email" className={styles.loginInput} placeholder="Enter Email"></input>
                <input onChange={handleChange} ref={passwordRef} type="password" className={styles.loginInput} placeholder="Enter Password"></input>
                <button type="submit" className={styles.loginSubmit} onClick={() => handleLogin()}> Submit</button>
                <Link to={"/signup"} className={styles.SignUpText}>New User | Sign Up</Link>
            </div>
        </div>
    )
}