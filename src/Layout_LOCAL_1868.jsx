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
import WBS from "./pages/WBS";
import ServiceContractBills from "./pages/checklists/ServiceContractBills";
import AdvanceBillHybrid from "./pages/checklists/AdvanceBillHybrid";
import BillsMaterialHybrid from "./pages/checklists/BillsMaterialHybrid";
import ClaimAgainstPBGSubmission from "./pages/checklists/ClaimAgainstPBGSubmission";
import Checklist from "./pages/Checklist";
import ClaimIncorrectDeductions from "./pages/checklists/ClaimIncorrectDeductions";
import HybridServicePOBills from "./pages/checklists/HybridServicePOBills";
import LDPenaltyRefund from "./pages/checklists/LDPenaltyRefund";
import IlmsSub from "./pages/IlmsSub";
import MRSSub from "./pages/MRSSub";
import MaterialIssueReqSub from "./pages/MaterialIssueReqSub";
import WMCSub from "./pages/WMCSub";
import DemandDeliveryLeadTime from "./pages/DemandDeliveryLeadTime";
import Inspectionreleasenote from "./pages/Inspectionreleasenote";
import HrCompliance from "./pages/HrCompliance";
import DemandManagement from "./pages/DemandManagement";
import DisplayStoreActions from "./pages/DisplayStoreActions";
import ManageVendorActivities from "./pages/ManageVendorActivities";
import InvoiceAndPaymentProcess from "./pages/InvoiceAndPaymentProcess";

import Goods_issue_slip from "./pages/pdfs/Goods_issue_slip";
import Inspection_report from "./pages/pdfs/Inspection_report";
import Purchase_document from "./pages/pdfs/Purchase_document";
import Payment_Advice from "./pages/pdfs/Payment_Advice";

function Layout() {
  const { token, isLoggedIn, userType } = useSelector((state) => state.auth);

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
            <Route exact path="/wdc" element={<WBS />} />
            <Route exact path="/po/:id" element={<PODetails />} />
            <Route exact path="/sdbg/:id" element={<SDBGSub />} />
            <Route exact path="/drawing/:id" element={<DrawingSub />} />
            <Route exact path="/qap/:id" element={<QAPSub />} />
            <Route
              exact
              path="/demand-delivery-lead-time/:id"
              element={<DemandDeliveryLeadTime />}
            />
            <Route exact path="/inspection/:id" element={<InspectionCall />} />
            <Route
              exact
              path="/inspection-release-note/:id"
              element={<Inspectionreleasenote />}
            />
            <Route
              exact
              path="/demand-management/:id"
              element={<DemandManagement />}
            />
            <Route
              exact
              path="/display-store-actions/:id"
              element={<DisplayStoreActions />}
            />
            <Route
              exact
              path="/manage-vendor-activities/:id"
              element={<ManageVendorActivities />}
            />
            <Route
              exact
              path="/invoice-and-payment-process/:id"
              element={<InvoiceAndPaymentProcess />}
            />
            <Route exact path="/hr-compliance/:id" element={<HrCompliance />} />
            <Route
              exact
              path="/shipping-documents/:id"
              element={<Shippingdocuments />}
            />
            <Route exact path="/gate-in/:id" element={<GateInSub />} />
            <Route exact path="/checklist" element={<Checklist />} />
            <Route
              exact
              path="/checklist/hybrid-bill-material"
              element={<BillsMaterialHybrid />}
            />
            <Route
              exact
              path="/checklist/hybrid-bill-service"
              element={<HybridServicePOBills />}
            />
            <Route
              exact
              path="/checklist/contract-bill-service"
              element={<ServiceContractBills />}
            />
            <Route
              exact
              path="/checklist/bill-incorrect-deductions"
              element={<ClaimIncorrectDeductions />}
            />
            <Route
              exact
              path="/checklist/bill-advance-payment"
              element={<AdvanceBillHybrid />}
            />
            <Route
              exact
              path="/checklist/claim-against-pbg"
              element={<ClaimAgainstPBGSubmission />}
            />
            <Route
              exact
              path="/checklist/ld-penalty-refund"
              element={<LDPenaltyRefund />}
            />
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
            <Route exact path="/bg-extension" element={<BGExtensionSub />} />
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
            <Route exact path="/ilms/:id" element={<IlmsSub />} />
            <Route exact path="/mrs/:id" element={<MRSSub />} />
            <Route exact path="/mir/:id" element={<MaterialIssueReqSub />} />
            <Route exact path="/wmc/:id" element={<WMCSub />} />

            <Route
              exact
              path="/display-store-actions/goods-receipt"
              element={<Goods_issue_slip />}
            />
            <Route
              exact
              path="/display-store-actions/icgn-report"
              element={<Inspection_report />}
            />
            <Route
              exact
              path="/display-store-actions/gate-in-entry"
              element={<Purchase_document />}
            />
            <Route
              exact
              path="/display-store-actions/payment-advice"
              element={<Payment_Advice />}
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default Layout;
