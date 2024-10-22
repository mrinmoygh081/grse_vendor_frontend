import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ASSIGNER } from "./constants/userConstants";
import ChakraLoader from "./components/ChakraLoader";

// import Login from "./pages/Login";
// import POArchived from "./pages/POArchived";
// import PODetails from "./pages/PODetails";
// import SDBGSub from "./pages/SDBGSub";
// import DrawingSub from "./pages/DrawingSub";
// import QAPSub from "./pages/QAPSub";
// import InspectionCall from "./pages/InspectionCall";
// import Shippingdocuments from "./pages/Shippingdocuments";
// import GateInSub from "./pages/GateInSub";
// // import ChecklistSub from "./pages/ChecklistSub";
// import BRNSub from "./pages/BRNSub";
// import PaymentAdvisesSub from "./pages/PaymentAdvisesSub";
// import PBGuploadSub from "./pages/PBGuploadSub";
// import BGExtensionSub from "./pages/BGExtensionSub";
// import ClaimLatterSub from "./pages/ClaimLatterSub";
// // import ChecklistSubEdit from "./pages/ChecklistSubEdit";
// import WDCSub from "./pages/WDCSub";
// import BillSubAttach from "./pages/BillSubAttach";
// import BillVendorAttach from "./pages/BillVendorAttach";
// import WDCattach from "./pages/WDCattach";
// import ReportComponent from "./pages/ReportComponent";
// import RaiseDemand from "./pages/RaiseDemand";
// import WBS from "./pages/WBS";
// import ServiceContractBills from "./pages/checklists/ServiceContractBills";
// import AdvanceBillHybrid from "./pages/checklists/AdvanceBillHybrid";
// import BillsMaterialHybrid from "./pages/checklists/BillsMaterialHybrid";
// import ClaimAgainstPBGSubmission from "./pages/checklists/ClaimAgainstPBGSubmission";
// import Checklist from "./pages/Checklist";
// import ClaimIncorrectDeductions from "./pages/checklists/ClaimIncorrectDeductions";
// import LDPenaltyRefund from "./pages/checklists/LDPenaltyRefund";
// import IlmsSub from "./pages/IlmsSub";
// import MRSSub from "./pages/MRSSub";
// import MaterialIssueReqSub from "./pages/MaterialIssueReqSub";
// import WMCSub from "./pages/WMCSub";
// import DemandDeliveryLeadTime from "./pages/DemandDeliveryLeadTime";
// import Inspectionreleasenote from "./pages/Inspectionreleasenote";
// import HrCompliance from "./pages/HrCompliance";
// import DemandManagement from "./pages/DemandManagement";
// import DisplayStoreActions from "./pages/DisplayStoreActions";
// import ManageVendorActivities from "./pages/ManageVendorActivities";

// // All PDF Files
// import GoodsIssueSlip from "./pages/pdfs/GoodsIssueSlip";
// import InspectionReport from "./pages/pdfs/InspectionReport";
// import StoreIssueRequisition from "./pages/pdfs/StoreIssueRequisition";
// import PaymentAdvice from "./pages/pdfs/PaymentAdvice";
// import BillsMaterialHybridEdit from "./pages/checklists/BillsMaterialHybridEdit";
// import Registration from "./pages/Registration";
// import Gateentrypdf from "./pages/pdfs/Gateentrypdf";
// import BillsMaterialHybridView from "./pages/checklists/BillsMaterialHybridView";
// import GoodsReceiptSlip from "./pages/pdfs/GoodsReceiptSlip";
// import ServiceEntrySheetPdf from "./pages/pdfs/ServiceEntrySheetPdf";
// import AdvanceBillHybridEdit from "./pages/checklists/AdvanceBillHybridEdit";
// import AdvanceBillHybridView from "./pages/checklists/AdvanceBillHybridView";
// import BGfinance from "./pages/BGfinance";
// import BTNfinance from "./pages/BTNfinance";
// import SyncComponent from "./pages/SyncComponent";
// import Authorisation from "./pages/settings/Authorisation";
// import QapDashboard from "./pages/dashboard/QapDashboard";
// import ForgatePassword from "./pages/ForgatePassword";
// import ClaimAgainstPBGSubmissionView from "./pages/checklists/ClaimAgainstPBGSubmissionView";
// import ClaimAgainstPBGSubmissionEdit from "./pages/checklists/ClaimAgainstPBGSubmissionEdit";
// import NotFound from "./components/NotFound";
// import ServiceContractBillsView from "./pages/checklists/ServiceContractBillsView";
// import ServiceContractBillsEdit from "./pages/checklists/ServiceContractBillsEdit";
// import QapDrawing from "./pages/dashboard/QapDrawing";
// import ClaimAgainstJCCubmission from "./pages/checklists/ClaimAgainstJCCubmission";
// import ClaimIncorrectDeductionsview from "./pages/checklists/ClaimIncorrectDeductionsview";
// import ClaimIncorrectDeductionsEdit from "./pages/checklists/ClaimIncorrectDeductionsEdit";
// import AnyOtherClaim from "./pages/checklists/AnyOtherClaim";
// import AnyOtherClaimview from "./pages/checklists/AnyOtherClaimview";
// import AnyOtherClaimviewEdit from "./pages/checklists/AnyOtherClaimviewEdit";

const Login = lazy(() => import("./pages/Login"));
const POs = lazy(() => import("./pages/POs"));
const POArchived = lazy(() => import("./pages/POArchived"));
const PODetails = lazy(() => import("./pages/PODetails"));
const SDBGSub = lazy(() => import("./pages/SDBGSub"));
const DrawingSub = lazy(() => import("./pages/DrawingSub"));
const QAPSub = lazy(() => import("./pages/QAPSub"));
const InspectionCall = lazy(() => import("./pages/InspectionCall"));
const Shippingdocuments = lazy(() => import("./pages/Shippingdocuments"));
const GateInSub = lazy(() => import("./pages/GateInSub"));
const BRNSub = lazy(() => import("./pages/BRNSub"));
const PaymentAdvisesSub = lazy(() => import("./pages/PaymentAdvisesSub"));
const PBGuploadSub = lazy(() => import("./pages/PBGuploadSub"));
const BGExtensionSub = lazy(() => import("./pages/BGExtensionSub"));
const ClaimLatterSub = lazy(() => import("./pages/ClaimLatterSub"));
const WDCSub = lazy(() => import("./pages/WDCSub"));
const BillSubAttach = lazy(() => import("./pages/BillSubAttach"));
const BillVendorAttach = lazy(() => import("./pages/BillVendorAttach"));
const WDCattach = lazy(() => import("./pages/WDCattach"));
const ReportComponent = lazy(() => import("./pages/ReportComponent"));
const RaiseDemand = lazy(() => import("./pages/RaiseDemand"));
const WBS = lazy(() => import("./pages/WBS"));
const ServiceContractBills = lazy(() =>
  import("./pages/checklists/ServiceContractBills")
);
const AdvanceBillHybrid = lazy(() =>
  import("./pages/checklists/AdvanceBillHybrid")
);
const BillsMaterialHybrid = lazy(() =>
  import("./pages/checklists/BillsMaterialHybrid")
);
const ClaimAgainstPBGSubmission = lazy(() =>
  import("./pages/checklists/ClaimAgainstPBGSubmission")
);
const Checklist = lazy(() => import("./pages/Checklist"));
// const ClaimIncorrectDeductions = lazy(() => import("./pages/checklists/ClaimIncorrectDeductions"));
// const LDPenaltyRefund = lazy(() => import("./pages/checklists/LDPenaltyRefund"));
const IlmsSub = lazy(() => import("./pages/IlmsSub"));
const MRSSub = lazy(() => import("./pages/MRSSub"));
const MaterialIssueReqSub = lazy(() => import("./pages/MaterialIssueReqSub"));
const WMCSub = lazy(() => import("./pages/WMCSub"));
const DemandDeliveryLeadTime = lazy(() =>
  import("./pages/DemandDeliveryLeadTime")
);
const Inspectionreleasenote = lazy(() =>
  import("./pages/Inspectionreleasenote")
);
const HrCompliance = lazy(() => import("./pages/HrCompliance"));
const DemandManagement = lazy(() => import("./pages/DemandManagement"));
const DisplayStoreActions = lazy(() => import("./pages/DisplayStoreActions"));
const ManageVendorActivities = lazy(() =>
  import("./pages/ManageVendorActivities")
);

// All PDF Files
const GoodsIssueSlip = lazy(() => import("./pages/pdfs/GoodsIssueSlip"));
const InspectionReport = lazy(() => import("./pages/pdfs/InspectionReport"));
const StoreIssueRequisition = lazy(() =>
  import("./pages/pdfs/StoreIssueRequisition")
);
const PaymentAdvice = lazy(() => import("./pages/pdfs/PaymentAdvice"));
const BillsMaterialHybridEdit = lazy(() =>
  import("./pages/checklists/BillsMaterialHybridEdit")
);
const Registration = lazy(() => import("./pages/Registration"));
const Gateentrypdf = lazy(() => import("./pages/pdfs/Gateentrypdf"));
const BillsMaterialHybridView = lazy(() =>
  import("./pages/checklists/BillsMaterialHybridView")
);
const GoodsReceiptSlip = lazy(() => import("./pages/pdfs/GoodsReceiptSlip"));
const ServiceEntrySheetPdf = lazy(() =>
  import("./pages/pdfs/ServiceEntrySheetPdf")
);
const AdvanceBillHybridEdit = lazy(() =>
  import("./pages/checklists/AdvanceBillHybridEdit")
);
const AdvanceBillHybridView = lazy(() =>
  import("./pages/checklists/AdvanceBillHybridView")
);

// DASHBOARD
const BGfinance = lazy(() => import("./pages/BGfinance"));
const BTNfinance = lazy(() => import("./pages/BTNfinance"));
const QapDashboard = lazy(() => import("./pages/dashboard/QapDashboard"));

const SyncComponent = lazy(() => import("./pages/SyncComponent"));
const Authorisation = lazy(() => import("./pages/settings/Authorisation"));
const ForgatePassword = lazy(() => import("./pages/ForgatePassword"));

// Checklist
const ClaimAgainstPBGSubmissionView = lazy(() =>
  import("./pages/checklists/ClaimAgainstPBGSubmissionView")
);
const ClaimAgainstPBGSubmissionEdit = lazy(() =>
  import("./pages/checklists/ClaimAgainstPBGSubmissionEdit")
);
const NotFound = lazy(() => import("./components/NotFound"));
const ServiceContractBillsView = lazy(() =>
  import("./pages/checklists/ServiceContractBillsView")
);
const ServiceContractBillsEdit = lazy(() =>
  import("./pages/checklists/ServiceContractBillsEdit")
);
const QapDrawing = lazy(() => import("./pages/dashboard/QapDrawing"));
const ClaimAgainstJCCubmission = lazy(() =>
  import("./pages/checklists/ClaimAgainstJCCubmission")
);

const ClaimAgainstJCCubmissionView = lazy(() =>
  import("./pages/checklists/ClaimAgainstJCCubmissionView")
);
const ClaimAgainstJCCubmissionEdit = lazy(() =>
  import("./pages/checklists/ClaimAgainstJCCubmissionEdit")
);

const ClaimIncorrectDeductionsview = lazy(() =>
  import("./pages/checklists/ClaimIncorrectDeductionsview")
);
const AnyOtherClaim = lazy(() => import("./pages/checklists/AnyOtherClaim"));
const AnyOtherClaimview = lazy(() =>
  import("./pages/checklists/AnyOtherClaimview")
);
const AnyOtherClaimviewEdit = lazy(() =>
  import("./pages/checklists/AnyOtherClaimviewEdit")
);

function Layout() {
  const { token, isLoggedIn, user } = useSelector((state) => state.auth);

  console.log(user);

  if (!token || !isLoggedIn) {
    return (
      <BrowserRouter>
        <Suspense fallback={<ChakraLoader />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forget-password" element={<ForgatePassword />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }

  if (user?.department_id === 19) {
    return (
      <BrowserRouter>
        <Suspense fallback={<ChakraLoader />}>
          <Routes>
            <Route path="*" element={<Navigate to="/synci-data" replace />} />
            <Route path="/synci-data" element={<SyncComponent />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<ChakraLoader />}>
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
          <Route
            path="/shipping-documents/:id"
            element={<Shippingdocuments />}
          />
          <Route path="/gate-in/:id" element={<GateInSub />} />
          {/* Material Checklist  */}
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
          {/* Service Checklist  */}
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

          {/* Advance Checklist  */}
          <Route
            path="/checklist/advance-bill/:id"
            element={<AdvanceBillHybrid />}
          />
          <Route
            path="/checklist/advance-bill/view/:id"
            element={<AdvanceBillHybridView />}
          />
          <Route
            path="/checklist/advance-bill/edit/:id"
            element={<AdvanceBillHybridEdit />}
          />

          {/* Claim Against PBG Checklist  */}
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

          {/* JCC Checklist */}
          <Route
            path="/checklist/claim-against-jcc/:id"
            element={<ClaimAgainstJCCubmission />}
          />
          <Route
            path="/checklist/claim-against-jcc/view/:id"
            element={<ClaimAgainstJCCubmissionView />}
          />
          <Route
            path="/checklist/claim-against-jcc/edit/:id"
            element={<ClaimAgainstJCCubmissionEdit />}
          />

          {/* Any Other Claim Checklist  */}
          <Route path="/checklist/any-other/:id" element={<AnyOtherClaim />} />
          <Route
            path="/checklist/any-other/view/:id"
            element={<AnyOtherClaimview />}
          />
          <Route
            path="/checklist/any-other/edit/:id"
            element={<AnyOtherClaimviewEdit />}
          />

          <Route
            path="/checklist/any-other/view/:id"
            element={<ClaimIncorrectDeductionsview />}
          />
          <Route
            path="/checklist/any-other/edit/:id"
            element={<ClaimIncorrectDeductionsview />}
          />

          {/* <Route
          path="/checklist/bill-incorrect-deductions/:id"
          element={<ClaimIncorrectDeductions />}
        />
        <Route
          path="/checklist/bill-incorrect-deductions/view/:id"
          element={<ClaimIncorrectDeductionsview />}
        />
        <Route
          path="/checklist/ld-penalty-refund/view/:id"
          element={<ClaimIncorrectDeductionsview />}
        />
        <Route
          path="/checklist/other-retentions/view/:id"
          element={<ClaimIncorrectDeductionsview />}
        />

        <Route
          path="/checklist/bill-incorrect-deductions/edit/:id"
          element={<ClaimIncorrectDeductionsEdit />}
        />
        <Route
          path="/checklist/ld-penalty-refund/edit/:id"
          element={<ClaimIncorrectDeductionsEdit />}
        />
        <Route
          path="/checklist/other-retentions/edit/:id"
          element={<ClaimIncorrectDeductionsEdit />}
        />
        
        
        
        <Route
          path="/checklist/ld-penalty-refund/:id"
          element={<LDPenaltyRefund />}
        /> */}
          <Route path="/bill-registration-number/:id" element={<BRNSub />} />
          <Route path="/payment-advise/:id" element={<PaymentAdvisesSub />} />
          <Route path="/pbg-upload/:id" element={<PBGuploadSub />} />
          <Route path="/bg-extension" element={<BGExtensionSub />} />
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
      </Suspense>
    </BrowserRouter>
  );
}

export default Layout;
