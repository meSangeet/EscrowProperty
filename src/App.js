import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import MyProfile from "./pages/myProfile/myProfile";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import List from "./pages/List/List";
import Home from "./pages/Home/Home";
import YourProps from "./pages/YourProps/YourProps";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Buy from "./pages/Buy/Buy";

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={<Layout />}
      >
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/MyProfile" element={<MyProfile />} /> {/* Use an absolute path */}
        <Route path="/about" element={<About />} />
        <Route path="/addProps" element={<addProps />} />
        <Route path="/list" element={<List />} />
        <Route path="/myProps" element={<YourProps />} />
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />} />
        <Route path="/product/:_id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/paymentgateway" element={<Payment />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Route>
  )
);
function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
//const [errMessages, setErrMessages] = useState('');