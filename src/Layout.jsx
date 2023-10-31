import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import POs from "./pages/POs";
import PODetails from "./pages/PODetails";
import SDBGSub from "./pages/SDBGSub";
import DrawingSub from "./pages/DrawingSub";
import QAPSub from "./pages/QAPSub";
import InspectionCall from "./pages/InspectionCall";

function Layout() {
  const { token, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(token, isLoggedIn);
  }, [token, isLoggedIn]);

  return (
    <>
      <BrowserRouter>
        {!token && !isLoggedIn ? (
          <Routes>
            <Route exact path="/" element={<Login />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<POs />} />
            <Route exact path="/po/:id" element={<PODetails />} />
            <Route exact path="/sdbg/:id" element={<SDBGSub />} />
            <Route exact path="/drawing/:id" element={<DrawingSub />} />
            <Route exact path="/qap/:id" element={<QAPSub />} />
            <Route exact path="/inspection/:id" element={<InspectionCall />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default Layout;
