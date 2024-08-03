// import context here
import CustomRegisterContext from "./Context/RegisterContext";
import CustomProductContext from "./Context/productContext";

// import required component from router
import { RouterProvider, createBrowserRouter } from "react-router-dom"

// import pages and other Components here
import Navbar from "./Components/Navbar";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import OrderPage from "./Pages/OrderPage";
import CartPage from "./Pages/CartPage";


function App() {
  
  const router = createBrowserRouter([
    {
      path: "/", element: <CustomRegisterContext>
        <CustomProductContext>
          <Navbar />
        </CustomProductContext>
      </CustomRegisterContext>, children: [
        { index: true, element: <HomePage /> },
        { path: "/signin", element: <LoginPage /> },
        { path: "/signup", element: <RegisterPage /> },
        { path: "/myorder", element: <OrderPage /> },
        { path: "/cart", element: <CartPage /> },
      ]
    }
  ])
  return (
    <RouterProvider  router={router}/>
  );
}

export default App;
