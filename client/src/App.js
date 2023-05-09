import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import axiosClient from "api/axiosClient";
import productApi from "api/productApi";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Checkout from "scenes/checkoutPage/Checkout";
import CartMenu from "scenes/global/CarMenu";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProductDetail from "scenes/productDetail";
import ProfilePage from "scenes/profilePage";
import { setItems } from "state";
import { themeSettings } from "./theme";
import ProductCreate from "scenes/productCreate";
import ManageOrder from "scenes/Admin/ManageOrder";
import Navbar from "scenes/global/Navbar";
import ManageProduct from "scenes/Admin/ManageProduct";
import ManageDashboad from "scenes/Admin";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);
  const isAdmin = user?.role === "admin";

  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  if (token) {
    const authHeader = `Bearer ${token}`;
    axiosClient.defaults.headers.common["Authorization"] = authHeader;
  }

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  productApi
    .getAllProduct()
    .then((result) => {
      dispatch(setItems(result));
    })
    .catch((err) => {});

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to='/login' />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='/product/:productId' element=<ProductDetail /> />

            {isAdmin && (
              <Route path='/manage'>
                <Route path='order' element=<ManageOrder /> />

                <Route path='product'>
                  <Route path='create' element={<ProductCreate />} />
                  <Route index element={<ManageProduct />} />
                </Route>

                <Route index element={<ManageDashboad />} />
              </Route>
            )}
          </Routes>

          <CartMenu />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
