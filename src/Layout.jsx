import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import POs from "./pages/POs";
import POArchived from "./pages/POArchived";
import PODetails from "./pages/PODetails";
import SDBGSub from "./pages/SDBGSub";
import DrawingSub from "./pages/DrawingSub";
import QAPSub from "./pages/QAPSub";
import InspectionCall from "./pages/InspectionCall";
import Shippingdocuments from "./pages/Shippingdocuments";
import GateInSub from "./pages/GateInSub";
// import ChecklistSub from "./pages/ChecklistSub";
import BRNSub from "./pages/BRNSub";
import PaymentAdvisesSub from "./pages/PaymentAdvisesSub";
import PBGuploadSub from "./pages/PBGuploadSub";
import BGExtensionSub from "./pages/BGExtensionSub";
import ClaimLatterSub from "./pages/ClaimLatterSub";
// import ChecklistSubEdit from "./pages/ChecklistSubEdit";
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

// All PDF Files
import GoodsIssueSlip from "./pages/pdfs/GoodsIssueSlip";
import InspectionReport from "./pages/pdfs/InspectionReport";
import StoreIssueRequisition from "./pages/pdfs/StoreIssueRequisition";
import PaymentAdvice from "./pages/pdfs/PaymentAdvice";
import BillsMaterialHybridEdit from "./pages/checklists/BillsMaterialHybridEdit";
import Registration from "./pages/Registration";
import Gateentrypdf from "./pages/pdfs/Gateentrypdf";
import BillsMaterialHybridView from "./pages/checklists/BillsMaterialHybridView";
import GoodsReceiptSlip from "./pages/pdfs/GoodsReceiptSlip";
import ServiceEntrySheetPdf from "./pages/pdfs/ServiceEntrySheetPdf";
import AdvanceBillHybridEdit from "./pages/checklists/AdvanceBillHybridEdit";
import AdvanceBillHybridView from "./pages/checklists/AdvanceBillHybridView";
import BGfinance from "./pages/BGfinance";
import BTNfinance from "./pages/BTNfinance";
import SyncComponent from "./pages/SyncComponent";
import { ASSIGNER } from "./constants/userConstants";
import Authorisation from "./pages/settings/Authorisation";
import QapDashboard from "./pages/dashboard/QapDashboard";
import ForgatePassword from "./pages/ForgatePassword";
import ClaimAgainstPBGSubmissionView from "./pages/checklists/ClaimAgainstPBGSubmissionView";
import ClaimAgainstPBGSubmissionEdit from "./pages/checklists/ClaimAgainstPBGSubmissionEdit";
import NotFound from "./components/NotFound";
import ServiceContractBillsView from "./pages/checklists/ServiceContractBillsView";
import ServiceContractBillsEdit from "./pages/checklists/ServiceContractBillsEdit";
import QapDrawing from "./pages/dashboard/QapDrawing";

function Layout() {
  const { token, isLoggedIn, user } = useSelector((state) => state.auth);

  console.log(user);

  if (!token || !isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forget-password" element={<ForgatePassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  if (user?.department_id === 19) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/synci-data" replace />} />
          <Route path="/synci-data" element={<SyncComponent />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<POs />} />
        <Route path="/wdc" element={<WBS />} />
        <Route path="/po/:id" element={<PODetails />} />
        <Route path="/poarchive/:id" element={<POArchived />} />
        <Route path="/sdbg/:id" element={<SDBGSub />} />
        <Route path="/drawing/:id" element={<DrawingSub />} />
        <Route path="/qap/:id" element={<QAPSub />} />
        <Route
          path="/demand-delivery-lead-time/:id"
          element={<DemandDeliveryLeadTime />}
        />
        <Route path="/inspection/:id" element={<InspectionCall />} />
        <Route path="/demand-management/:id" element={<DemandManagement />} />
        <Route
          path="/display-store-actions/:id"
          element={<DisplayStoreActions />}
        />
        <Route
          path="/manage-vendor-activities/:id"
          element={<ManageVendorActivities />}
        />
        <Route
          path="/invoice-and-payment-process/:id"
          element={<Checklist />}
        />
        <Route
          path="/inspection-release-note/:id"
          element={<Inspectionreleasenote />}
        />
        <Route path="/hr-compliance/:id" element={<HrCompliance />} />
        <Route path="/shipping-documents/:id" element={<Shippingdocuments />} />
        <Route path="/gate-in/:id" element={<GateInSub />} />
        <Route
          path="/checklist/hybrid-bill-material/:id"
          element={<BillsMaterialHybrid />}
        />
        <Route
          path="/checklist/hybrid-bill-material/edit/:id"
          element={<BillsMaterialHybridEdit />}
        />
        <Route
          path="/checklist/hybrid-bill-material/view/:id"
          element={<BillsMaterialHybridView />}
        />
        <Route
          path="/checklist/contract-bill-service/:id"
          element={<ServiceContractBills />}
        />
        <Route
          path="/checklist/bill-service/view/:id"
          element={<ServiceContractBillsView />}
        />

        <Route
          path="/checklist/bill-service/edit/:id"
          element={<ServiceContractBillsEdit />}
        />
        {/* <Route
          path="/checklist/bill-incorrect-deductions/:id"
          element={<ClaimIncorrectDeductions />}
        /> */}
        <Route
          path="/checklist/bill-other-claims/:id"
          element={<ClaimIncorrectDeductions />}
        />
        <Route
          path="/checklist/bill-advance-payment/:id"
          element={<AdvanceBillHybrid />}
        />
        <Route
          path="/checklist/bill-advance-payment/view/:id"
          element={<AdvanceBillHybridView />}
        />
        <Route
          path="/checklist/bill-advance-payment/edit/:id"
          element={<AdvanceBillHybridEdit />}
        />
        <Route
          path="/checklist/claim-against-pbg/:id"
          element={<ClaimAgainstPBGSubmission />}
        />
        <Route
          path="/checklist/claim-against-pbg/view/:id"
          element={<ClaimAgainstPBGSubmissionView />}
        />
        <Route
          path="/checklist/claim-against-pbg/edit/:id"
          element={<ClaimAgainstPBGSubmissionEdit />}
        />
        <Route
          path="/checklist/ld-penalty-refund/:id"
          element={<LDPenaltyRefund />}
        />
        <Route path="/bill-registration-number/:id" element={<BRNSub />} />
        <Route path="/payment-advise/:id" element={<PaymentAdvisesSub />} />
        <Route path="/pbg-upload/:id" element={<PBGuploadSub />} />
        <Route path="/bg-extension" element={<BGExtensionSub />} />
        {/* {user?.department_id === 3 && (
          <Route path="/dashboard/qa" element={<QapDashboard />} />
        )}
        {user?.department_id === 2 && (
          <Route path="/dashboard/drawing" element={<QapDrawing />} />
        )}
        {user?.department_id === 15 && (
          <>
            <Route path="/dashboard/bg" element={<BGfinance />} />
            <Route path="/dashboard/btn" element={<BTNfinance />} />
          </>
        )} */}
        {(user?.department_id === 3 || user?.department_id === 1) && (
          <Route path="/dashboard/qa" element={<QapDashboard />} />
        )}
        {(user?.department_id === 2 || user?.department_id === 1) && (
          <Route path="/dashboard/drawing" element={<QapDrawing />} />
        )}
        {(user?.department_id === 15 || user?.department_id === 1) && (
          <>
            <Route path="/dashboard/bg" element={<BGfinance />} />
            <Route path="/dashboard/btn" element={<BTNfinance />} />
          </>
        )}

        <Route path="/claim-letter/:id" element={<ClaimLatterSub />} />
        <Route path="/wdc/:id" element={<WDCSub />} />
        <Route path="/BillSubAttach" element={<BillSubAttach />} />
        <Route path="/BillVendorAttach" element={<BillVendorAttach />} />
        <Route path="/WDCattach" element={<WDCattach />} />
        <Route path="/raise-demand" element={<RaiseDemand />} />
        <Route path="/log-report" element={<ReportComponent />} />
        <Route path="/ilms/:id" element={<IlmsSub />} />
        <Route path="/mrs/:id" element={<MRSSub />} />
        <Route path="/mir/:id" element={<MaterialIssueReqSub />} />
        <Route path="/wmc/:id" element={<WMCSub />} />

        {/* All PDF File Routes */}
        <Route
          path="/display-store-actions/store-issue-requisition/:payload"
          element={<StoreIssueRequisition />}
        />
        <Route
          path="/display-store-actions/goods-issue-slip/:payload"
          element={<GoodsIssueSlip />}
        />
        <Route
          path="/display-store-actions/goods-entry/:payload"
          element={<Gateentrypdf />}
        />
        <Route
          path="/display-store-actions/icgrn-report/:payload"
          element={<InspectionReport />}
        />
        <Route
          path="/display-store-actions/good-receipt-slip/:payload"
          element={<GoodsReceiptSlip />}
        />
        <Route
          path="/display-store-actions/payment-advice/:payload"
          element={<PaymentAdvice />}
        />
        <Route
          path="/display-store-actions/service-entry-sheet/:payload"
          element={<ServiceEntrySheetPdf />}
        />
        {user?.internal_role_id === ASSIGNER && (
          <>
            <Route path="/authorisation/" element={<Authorisation />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Layout;
