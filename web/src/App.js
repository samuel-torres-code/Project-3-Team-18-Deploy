import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import Home from "./pages/Home.js";
import Server from "./pages/Server.js";
import Manager from "./pages/Manager.js";
import NoPage from "./pages/NoPage.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Order from "./pages/Order.js";
import Pizza from "./pages/Pizza.js";
import Pickup from "./pages/Pickup.js";
import Reports from "./pages/Reports.js";
import "./App.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <div className='notranslate'>
      <div className="App">
        <GoogleOAuthProvider clientId="353017377567-v6vncaa13jatei1ngfk32gg371fgva5b.apps.googleusercontent.com">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="server" element={<Server />} />
                <Route path="manager" element={<Manager />} />
                <Route path="reports" element={<Reports />} />
                <Route path="login" element={<Login />} />
                <Route path="order" element={<Order />} />
                <Route path="pizza" element={<Pizza />} />
                <Route path="pickup" element={<Pickup />} />
                <Route path="*" element={<NoPage />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default App;
