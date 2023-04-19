import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import axiosClient from "api/axiosClient";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import CartMenu from "scenes/global/CarMenu";
import Navbar from "scenes/global/Navbar";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProductDetail from "scenes/productDetail";
import ProfilePage from "scenes/profilePage";
import { themeSettings } from "./theme";
import productApi from "api/productApi";
import { setItems } from "state";
import Checkout from "scenes/checkoutPage/Checkout";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

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
          {user && <Navbar />}

          <ScrollToTop />
          <Routes>
            <Route path='/' element={isAuth ? <HomePage /> : <Navigate to='/login' />} />
            {/* <Route path='/' element={<HomePage />} /> */}
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to='/login' />} />
            {/* <Route path="checkout" element={<Checkout />} /> */}
            <Route path='/product/:productId' element={isAuth ? <ProductDetail /> : <Navigate to='/login' />} />
          </Routes>

          <CartMenu />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
