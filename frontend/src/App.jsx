import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link, Outlet, useParams } from "react-router-dom";
import Yarn from "./Yarn";
import GetYarns from "./Yarns";
import Yarns from "./Yarns";
import Login from "./Login";
import User from "./User";
import CreateAccount from "./CreateAccount";
import Seller from "./Seller";
import NavigationBar from "./Navbar";
import { SessionStatusProvider } from "./SessionStatus";
import { FavoriteContextProvider } from "./FavoriteContext";

function Layout() {
  return (
    <>
      <h1>Welcome!</h1>
      <h2>Search yarns from Ravelry by price!</h2>
    </>
  );
}

function App() {
  return (
    <>
      <SessionStatusProvider>
        <FavoriteContextProvider>
          <NavigationBar> </NavigationBar>

          <div>
            <Routes>
              <Route path="" element={<Layout />} />
              <Route />
              <Route path="/user/:userId" element={<User />} />
              <Route />
              <Route path="/seller/:sellerId" element={<Seller />} />
              <Route />
              <Route path="CreateAccount" element={<CreateAccount />} />
              <Route />
              <Route path="Login" element={<Login />} />
              <Route />
              <Route path="/yarns" element={<GetYarns />} /> <Route />
              <Route path="/yarns/:yarnId" element={<Yarn />} />
              <Route path="/yarns/price" element={<Yarns />} /> <Route />
            </Routes>
          </div>
        </FavoriteContextProvider>
      </SessionStatusProvider>
    </>
  );
}

export default App;
