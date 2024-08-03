//import styles here
import styles from "../styles/LoginPage.module.css"

// import context here
import { useValue } from "../Context/RegisterContext"

// import necessory hooks
import { createRef } from "react"

export default function RegisterPage() {

    //destructure value here
    const { handleFormSubmit, setFormData } = useValue()

    // define ref for input value
    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()

    // function to update date from inputbox
    const handleChange = () => {
        setFormData(
            {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            }
        )
    }

    // return RegisterPage components here
    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.heading}>Welcome</h1>
            <div className={styles.loginForm}>
                <input onChange={handleChange} ref={nameRef} type="text" className={styles.loginInput} placeholder="Enter Name" required></input>
                <input onChange={handleChange} ref={emailRef} type="email" className={styles.loginInput} placeholder="Enter Email" required></input>
                <input onChange={handleChange} ref={passwordRef} type="password" className={styles.loginInput} placeholder="Enter Password" required></input>
                <button onClick={() => handleFormSubmit()} type="submit" className={styles.loginSubmit}> Submit</button>
            </div>
        </div>
    )
}