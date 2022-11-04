
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout.js';
import Home from './pages/Home.js';
import Server from './pages/Server.js';
import Manager from './pages/Manager.js';
import NoPage from './pages/NoPage.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

import './App.css';

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
            <Route path="*" element={<NoPage />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
