
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout.js';
import Home from './pages/Home.js';
import Server from './pages/Server.js';
import Manager from './pages/Manager.js';
import NoPage from './pages/NoPage.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import './App.scss';

import { useState, useEffect } from "react";
import { gapi } from 'gapi-script';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = "353017377567-v6vncaa13jatei1ngfk32gg371fgva5b.apps.googleusercontent.com";

function App() {

  // useEffect(() => {
  //   const initClient = () => {
  //         gapi.auth2.init({
  //         clientId: clientId,
  //         scope: 'email'
  //       });
  //   };
  //   gapi.load('client:auth2', initClient);
  // });

  return (
    <div className="App">
      <GoogleOAuthProvider clientId="353017377567-v6vncaa13jatei1ngfk32gg371fgva5b.apps.googleusercontent.com">
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
      </GoogleOAuthProvider>;
      
    </div>
  );
}

export default App;
