// import context here
import { useValue } from "./RegisterContext";

// import required component from router
import { useNavigate } from "react-router-dom";

// import necessory hooks
import { createContext, useContext, useEffect, useState } from "react";

// import firebase elements for usecase
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";

// import database
import { db } from "../FirebaseInIt";

// import toastcontainer for notification after installing
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// create new context
const productContext = createContext()

// function to use context
function useProductValue() {
    const value = useContext(productContext)
    return value
}

function CustomProductContext({ children }) {

    // destructure imported usevalue
    const { loginId, isVerified } = useValue()
    
    // create necessory states
    const [productData, setProductData] = useState()
    const [filteredData, setfilteredData] = useState([])
    const [priceFilteredData, setpriceFilteredData] = useState([])
    const [filterCategory, setFilterCategory] = useState([])
    const [cart, setCart] = useState([])
    const [order, setOrder] = useState([])
    const [searchBar, setSearchBar] = useState("")
    const [grandTotal, setGrandTotal] = useState(0)
    const [sliderValue, setSliderValue] = useState(1499)
    const [showFilter, setShowFilter] = useState(false)

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

    // fetch api data for to show product card 
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch('https://fakestoreapi.com/products')
                const data = await response.json()
                setProductData(data)
                setfilteredData(data)
                setpriceFilteredData(data)
            } catch
            {
                warning("Error Loading Data")
            }
        }
        fetchData();
    }, [])

    // fetch particular cart and order data for loggedin user
    useEffect(() => {
        async function fetchCartData() {
            onSnapshot(collection(db, "loginData", loginId, "cart"), (snapshot) => {
                const cartData = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                setCart(cartData)

            });
        }
        async function fetchOrdertData() {
            onSnapshot(collection(db, "loginData", loginId, "order"), (snapshot) => {
                const orderData = snapshot.docs.map((doc) => {
                    return {
                        ...doc.data()
                    }
                })
                setOrder(orderData)
            });
        }
        if (isVerified) {
            fetchCartData()
            fetchOrdertData()
        }
    }, [loginId, isVerified])


    // show data based on the filter applied
    useEffect(() => {
        if (filterCategory.length === 0) {
            let searchData = []
            setfilteredData(productData)
            searchData = priceFilteredData.filter((prod) => prod.price <= sliderValue)
            setfilteredData(searchData.filter((prod) => prod.title.toLowerCase().includes(searchBar.toLowerCase())))
        } else {
            let updatedData = []
            let searchData = []
            filterCategory.forEach(function (category) {
                updatedData = [...updatedData, ...productData.filter(function (productCategory) {
                    return productCategory.category === category;
                })];
            });
            
            if (searchBar) {
                searchData = updatedData.filter((prod) => prod.price < sliderValue)
                setfilteredData(searchData.filter((prod) => prod.title.toLowerCase().includes(searchBar.toLowerCase())))
            } else {
                setfilteredData(updatedData.filter((prod) => prod.price < sliderValue))
            }
        }
    }, [filterCategory, sliderValue, searchBar, priceFilteredData, productData])

    // set total for cart product
    useEffect(() => {
        let total = 0;

        cart.forEach((cartItem) => {
            const productTotal = cartItem.item.price * cartItem.qty;
            total += productTotal;
        });
        total = Number(total.toFixed(2));

        setGrandTotal(total);
    }, [cart]);

    // function to access filter options
    function toggleFilter() {
        setShowFilter(!showFilter)
    }
    
    // function to add filter based on the category
    function addFilter(Category) {
        if (filterCategory.find((activeCategory) => activeCategory === Category)) {
            setFilterCategory(filterCategory.filter((activeCategory) => activeCategory !== Category))
            return
        }
        setFilterCategory([...filterCategory, Category])
    }
    
    // function to set search field
    function search(ref) {
        setSearchBar(ref)
    }

    // function to sign in page
    function signin() {
        navigate("/signin")
    }

    // function for direct buy now button
    async function buyNow(item) {
        const updatedOrder = [];
        updatedOrder.push({ date: new Date().toDateString(), totalAmount: item.item.price, qty: 1, ...item });
        await addDoc(collection(db, "loginData", loginId, "order"), {
            ...updatedOrder
        });
        onSnapshot(collection(db, "loginData", loginId, "order"), (snapshot) => {
            const orderData = snapshot.docs.map((doc) => {
                return {
                    ...doc.data()
                }
            })
            setOrder(orderData)

        });
        notify("Item purchased Successfully")
    }

    // function to add product to the cart
    async function addToCart(item) {
        //if product is already present in the cart increase its count
        if (cart.find((prod) => prod.item.id === item.item.id)) {
            const index = cart.findIndex((prod) => prod.item.id === item.item.id)
            updateDoc(doc(db, "loginData", loginId, "cart", cart[index].id), {
                qty: cart[index].qty + 1
            })
            cart[index].qty += 1
            setCart(cart)
            return
        }
        // if product is not present in the cart
        const docRef = await addDoc(collection(db, "loginData", loginId, "cart"), {
            qty: 1,
            ...item
        });
        setCart([...cart, { id: docRef.id, qty: 1, ...item }])
        notify("Item Added To Cart")

    }

    // function to remove product from cart
    async function removeFromCart(item) {
        await deleteDoc(doc(db, "loginData", loginId, "cart", item.id));
        setCart(cart.filter((prod) => prod.id !== item.id))
        notify("Item Removed From Cart")
    }

    // function to increase qty count
    function increaseQty(item) {
        updateDoc(doc(db, "loginData", loginId, "cart", item.id), {
            qty: item.qty + 1
        })
        const index = cart.findIndex((prod) => prod.id === item.id)
        cart[index].qty += 1
        setCart(cart)
    }

    
    // function to increase qty count
    async function decreaseQty(item) {
        if (item.qty <= 1) {
            await deleteDoc(doc(db, "loginData", loginId, "cart", item.id));
            setCart(cart.filter((prod) => prod.id !== item.id))
        } else {
            
            updateDoc(doc(db, "loginData", loginId, "cart", item.id), {
                qty: item.qty - 1
            })
            const index = cart.findIndex((prod) => prod.id === item.id)
            cart[index].qty -= 1
            setCart(cart)
        }
    }
    
    // function to add price in the total
    function addToTotal(price) {
        setGrandTotal(grandTotal + price)
    }

    // function to set slider count 
    function handleSlider(event) {
        const value = parseInt(event.target.value, 10);
        setSliderValue(value)
    }

    // function to add order 
    async function addOrder() {
        const updatedOrder = [];
        cart.forEach((item) => {
            updatedOrder.push({ date: new Date().toDateString(), totalAmount: grandTotal, qty: 1, ...item });
            deleteDoc(doc(db, "loginData", loginId, "cart", item.id));
        });        
        await addDoc(collection(db, "loginData", loginId, "order"), {
            ...updatedOrder
        });
        onSnapshot(collection(db, "loginData", loginId, "order"), (snapshot) => {
            const orderData = snapshot.docs.map((doc) => {
                return {
                    ...doc.data()
                }
            })
            setOrder(orderData)
            setCart([])
        });
        notify("Items purchased Successfully")
    }



    return (
        <productContext.Provider value={{ signin, handleSlider, searchBar, order, buyNow, addOrder, search, setOrder, sliderValue, priceFilteredData, setSliderValue, productData, cart, grandTotal, addToTotal, setGrandTotal, increaseQty, decreaseQty, removeFromCart, showFilter, filterCategory, setfilteredData, addToCart, toggleFilter, addFilter, filteredData }}>
            {children}
            <ToastContainer />
        </productContext.Provider>
    )
}

export { useProductValue }
export default CustomProductContext