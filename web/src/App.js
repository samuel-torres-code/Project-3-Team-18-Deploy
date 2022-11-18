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

import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="server" element={<Server />} />
            <Route path="manager" element={<Manager />} />
            <Route path="login" element={<Login />} />
            <Route path="order" element={<Order />} />
            <Route path="pizza" element={<Pizza />} />
            <Route path="pickup" element={<Pickup />} />
            <Route path="*" element={<NoPage />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
