// import required component from router
import { useNavigate } from "react-router-dom";

// import necessory hooks
import { useEffect, useState, createContext, useContext } from "react";

// import firebase elements for usecase
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";

// import database
import { db } from "../FirebaseInIt";

//import toastcontainer for notification after installing
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// create new context
const registerContext = createContext()

// function to use context
function useValue() {
    const value = useContext(registerContext)
    return value
}

function CustomRegisterContext({ children }) {

    // create necessory states
    const [formData, setFormData] = useState({ name: "", email: "", password: "" })
    const [registeredData, setRegisteredData] = useState([])
    const [loginData, setLoginData] = useState([])
    const [loginId, setLoginId] = useState("")
    const [isVerified, setIsVerified] = useState(false)

    // create element to use useNavigate
    const navigate = useNavigate();

    // create necessory toast for notification
    const notify = (message) => {
        toast.success(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };
    const warning = (message) => {
        toast.error(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    // fetch existing log data
    useEffect(() => {
        async function fetchLoginData() {
            onSnapshot(collection(db, "loginData"), (snapshot) => {
                const loginData = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                setLoginData(loginData)
            });
        }
        fetchLoginData()
    }, [])

    // enter new data of customer to database
    function handleFormSubmit() {
        if (!formData.name || !formData.email || !formData.password) {
            warning("Fill form Correctly")
            return
        }
        const docRef = doc(collection(db, "loginData"))
        setDoc(docRef, {
            name: formData.name,
            email: formData.email,
            password: formData.password
        })
        setFormData({ name: "", email: "", password: "" })
        setLoginId(docRef.id)
        setIsVerified(true);
        navigate("/")
        notify("Logged In Successfully")
    }

    // check log data for existing customer 
    function handleLogin() {
        const isEmailTrue = loginData.find((data) => data.email === formData.email);
        const isPasswordTrue = loginData.find((data) => data.password === formData.password);
        if (isEmailTrue && isPasswordTrue) {
            setIsVerified(true);
            const user = loginData.find((data) => data.email === formData.email)
            setLoginId(user.id)
            navigate("/")
            notify("Logged In Successfully")
        } else {
            warning("Invalid Email or Password")
        }
    }

    // handle login and logout button based on condition
    function handleLog() {
        if (isVerified) {
            notify("Logged Out Successfully");
            setIsVerified(false);
        }
    }

    return (
        <registerContext.Provider value={{ loginId, setRegisteredData, loginData, isVerified, registeredData, handleLog, handleLogin, handleFormSubmit, setFormData }}>
            {children}
        </registerContext.Provider>
    )
}

export { useValue }
export default CustomRegisterContext