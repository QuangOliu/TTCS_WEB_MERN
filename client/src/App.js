import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { themeSettings } from "./theme";
import axiosClient from "api/axiosClient";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  const token = useSelector((state) => state.token);
  if (token) {
    const authHeader = `Bearer ${token}`;
    axiosClient.defaults.headers.common["Authorization"] = authHeader;
  }
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={isAuth ? <HomePage /> : <Navigate to='/login' />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to='/login' />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
