import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import POs from "./pages/POs";
import PODetails from "./pages/PODetails";
import SDBGSub from "./pages/SDBGSub";
import DrawingSub from "./pages/DrawingSub";
import QAPSub from "./pages/QAPSub";
import InspectionCall from "./pages/InspectionCall";
import Shippingdocuments from "./pages/Shippingdocuments";
import GateInSub from "./pages/GateInSub";
import ChecklistSub from "./pages/ChecklistSub";
import BRNSub from "./pages/BRNSub";
import PaymentAdvisesSub from "./pages/PaymentAdvisesSub";
import PBGuploadSub from "./pages/PBGuploadSub";
import BGExtensionSub from "./pages/BGExtensionSub";
import ClaimLatterSub from "./pages/ClaimLatterSub";
import ChecklistSubEdit from "./pages/ChecklistSubEdit";
import WDCSub from "./pages/WDCSub";
import BillSubAttach from "./pages/BillSubAttach";
import BillVendorAttach from "./pages/BillVendorAttach";
import WDCattach from "./pages/WDCattach";
import ReportComponent from "./pages/ReportComponent";
import RaiseDemand from "./pages/RaiseDemand";

function Layout() {
  const { token, isLoggedIn, userType } = useSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        {!token && !isLoggedIn ? (
          <Routes>
            <Route exact path="/" element={<Login />} />
          </Routes>
        ) : userType === 1 ? (
          <Routes>
            <Route exact path="/" element={<POs />} />
            <Route exact path="/po/:id" element={<PODetails />} />
            <Route exact path="/sdbg/:id" element={<SDBGSub />} />
            <Route exact path="/drawing/:id" element={<DrawingSub />} />
            <Route exact path="/qap/:id" element={<QAPSub />} />
            <Route exact path="/inspection/:id" element={<InspectionCall />} />
            <Route
              exact
              path="/shipping-documents/:id"
              element={<Shippingdocuments />}
            />
            <Route exact path="/gate-in/:id" element={<GateInSub />} />
            <Route exact path="/checklist/:id" element={<ChecklistSub />} />
            <Route
              exact
              path="/bill-registration-number/:id"
              element={<BRNSub />}
            />
            <Route
              exact
              path="/payment-advise/:id"
              element={<PaymentAdvisesSub />}
            />
            <Route exact path="/pbg-upload/:id" element={<PBGuploadSub />} />
            <Route
              exact
              path="/bg-extension/:id"
              element={<BGExtensionSub />}
            />
            <Route
              exact
              path="/claim-letter/:id"
              element={<ClaimLatterSub />}
            />
            <Route
              exact
              path="/checklistedit/:id"
              element={<ChecklistSubEdit />}
            />
            <Route exact path="/wdc/:id" element={<WDCSub />} />
            <Route exact path="/BillSubAttach" element={<BillSubAttach />} />
            <Route
              exact
              path="/BillVendorAttach"
              element={<BillVendorAttach />}
            />
            <Route exact path="/WDCattach" element={<WDCattach />} />
            <Route exact path="/raise-demand" element={<RaiseDemand />} />
            <Route exact path="/log-report" element={<ReportComponent />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<POs />} />
            <Route exact path="/po/:id" element={<PODetails />} />
            <Route exact path="/sdbg/:id" element={<SDBGSub />} />
            <Route exact path="/drawing/:id" element={<DrawingSub />} />
            <Route exact path="/qap/:id" element={<QAPSub />} />
            <Route exact path="/inspection/:id" element={<InspectionCall />} />
            <Route
              exact
              path="/shipping-documents/:id"
              element={<Shippingdocuments />}
            />
            <Route exact path="/gate-in/:id" element={<GateInSub />} />
            <Route exact path="/checklist/:id" element={<ChecklistSub />} />
            <Route
              exact
              path="/bill-registration-number/:id"
              element={<BRNSub />}
            />
            <Route
              exact
              path="/payment-advise/:id"
              element={<PaymentAdvisesSub />}
            />
            <Route exact path="/pbg-upload/:id" element={<PBGuploadSub />} />
            <Route
              exact
              path="/bg-extension/:id"
              element={<BGExtensionSub />}
            />
            <Route
              exact
              path="/claim-letter/:id"
              element={<ClaimLatterSub />}
            />
            <Route
              exact
              path="/checklistedit/:id"
              element={<ChecklistSubEdit />}
            />
            <Route exact path="/wdc/:id" element={<WDCSub />} />
            <Route exact path="/BillSubAttach" element={<BillSubAttach />} />
            <Route
              exact
              path="/BillVendorAttach"
              element={<BillVendorAttach />}
            />
            <Route exact path="/WDCattach" element={<WDCattach />} />
            <Route exact path="/raise-demand" element={<RaiseDemand />} />
            <Route exact path="/log-report" element={<ReportComponent />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default Layout;
