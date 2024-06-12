// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import { useSelector } from "react-redux";
// import POs from "./pages/POs";
// import POArchived from "./pages/POArchived";
// import PODetails from "./pages/PODetails";
// import SDBGSub from "./pages/SDBGSub";
// import DrawingSub from "./pages/DrawingSub";
// import QAPSub from "./pages/QAPSub";
// import InspectionCall from "./pages/InspectionCall";
// import Shippingdocuments from "./pages/Shippingdocuments";
// import GateInSub from "./pages/GateInSub";
// import ChecklistSub from "./pages/ChecklistSub";
// import BRNSub from "./pages/BRNSub";
// import PaymentAdvisesSub from "./pages/PaymentAdvisesSub";
// import PBGuploadSub from "./pages/PBGuploadSub";
// import BGExtensionSub from "./pages/BGExtensionSub";
// import ClaimLatterSub from "./pages/ClaimLatterSub";
// import ChecklistSubEdit from "./pages/ChecklistSubEdit";
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
// import HybridServicePOBills from "./pages/checklists/HybridServicePOBills";
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
// import HybridServicePOBillsEdit from "./pages/checklists/HybridServicePOBillsEdit";
// import HybridServicePOBillsView from "./pages/checklists/HybridServicePOBillsView";
// import AdvanceBillHybridEdit from "./pages/checklists/AdvanceBillHybridEdit";
// import AdvanceBillHybridView from "./pages/checklists/AdvanceBillHybridView";
// import BGfinance from "./pages/BGfinance";
// import BTNfinance from "./pages/BTNfinance";

// function Layout() {
//   const { token, isLoggedIn, userType } = useSelector((state) => state.auth);

//   return (
//     <>
//       <BrowserRouter>
//         {!token && !isLoggedIn ? (
//           <Routes>
//             <Route exact path="/" element={<Login />} />
//             <Route exact path="/registration" element={<Registration />} />
//           </Routes>
//         ) : (
//           <Routes>
//             <Route exact path="/" element={<POs />} />
//             <Route exact path="/wdc" element={<WBS />} />
//             <Route exact path="/po/:id" element={<PODetails />} />
//             <Route exact path="/poarchive/:id" element={<POArchived />} />
//             <Route exact path="/sdbg/:id" element={<SDBGSub />} />
//             <Route exact path="/drawing/:id" element={<DrawingSub />} />
//             <Route exact path="/qap/:id" element={<QAPSub />} />
//             <Route
//               exact
//               path="/demand-delivery-lead-time/:id"
//               element={<DemandDeliveryLeadTime />}
//             />
//             <Route exact path="/inspection/:id" element={<InspectionCall />} />
//             <Route
//               exact
//               path="/demand-management/:id"
//               element={<DemandManagement />}
//             />
//             <Route
//               exact
//               path="/display-store-actions/:id"
//               element={<DisplayStoreActions />}
//             />
//             <Route
//               exact
//               path="/manage-vendor-activities/:id"
//               element={<ManageVendorActivities />}
//             />
//             <Route
//               exact
//               path="/invoice-and-payment-process/:id"
//               element={<Checklist />}
//             />
//             <Route
//               exact
//               path="/inspection-release-note/:id"
//               element={<Inspectionreleasenote />}
//             />
//             <Route exact path="/hr-compliance/:id" element={<HrCompliance />} />
//             <Route
//               exact
//               path="/shipping-documents/:id"
//               element={<Shippingdocuments />}
//             />
//             <Route exact path="/gate-in/:id" element={<GateInSub />} />
//             {/* <Route exact path="/checklist/:id" element={<Checklist />} /> */}
//             <Route
//               exact
//               path="/checklist/hybrid-bill-material/:id"
//               element={<BillsMaterialHybrid />}
//             />
//             <Route
//               exact
//               path="/checklist/hybrid-bill-material/edit/:id"
//               element={<BillsMaterialHybridEdit />}
//             />

//             <Route
//               exact
//               path="/checklist/hybrid-bill-material/view/:id"
//               element={<BillsMaterialHybridView />}
//             />
//             <Route
//               exact
//               path="/checklist/hybrid-bill-service/:id"
//               element={<HybridServicePOBills />}
//             />
//             <Route
//               exact
//               path="/checklist/hybrid-bill-service/edit/:id"
//               element={<HybridServicePOBillsEdit />}
//             />
//             <Route
//               exact
//               path="/checklist/hybrid-bill-service/view/:id"
//               element={<HybridServicePOBillsView />}
//             />
//             <Route
//               exact
//               path="/checklist/contract-bill-service/:id"
//               element={<ServiceContractBills />}
//             />
//             <Route
//               exact
//               path="/checklist/bill-incorrect-deductions/:id"
//               element={<ClaimIncorrectDeductions />}
//             />
//             <Route
//               exact
//               path="/checklist/advance-bill-hybrid/:id"
//               element={<AdvanceBillHybrid />}
//             />
//             <Route
//               exact
//               path="/checklist/advance-bill-hybrid/view/:id"
//               element={<AdvanceBillHybridView />}
//             />
//             <Route
//               exact
//               path="/checklist/advance-bill-hybrid/edit/:id"
//               element={<AdvanceBillHybridEdit />}
//             />
//             <Route
//               exact
//               path="/checklist/claim-against-pbg/:id"
//               element={<ClaimAgainstPBGSubmission />}
//             />
//             <Route
//               exact
//               path="/checklist/ld-penalty-refund/:id"
//               element={<LDPenaltyRefund />}
//             />
//             {/* <Route exact path="/checklist/:id" element={<ChecklistSub />} /> */}
//             <Route
//               exact
//               path="/bill-registration-number/:id"
//               element={<BRNSub />}
//             />
//             <Route
//               exact
//               path="/payment-advise/:id"
//               element={<PaymentAdvisesSub />}
//             />
//             <Route exact path="/pbg-upload/:id" element={<PBGuploadSub />} />
//             <Route exact path="/bg-extension" element={<BGExtensionSub />} />
//               <Route path="bg" element={<BGfinance />} />
//               <Route path="btn" element={<BTNfinance />} />

//             <Route
//               exact
//               path="/claim-letter/:id"
//               element={<ClaimLatterSub />}
//             />
//             <Route
//               exact
//               path="/checklistedit/:id"
//               element={<ChecklistSubEdit />}
//             />
//             <Route exact path="/wdc/:id" element={<WDCSub />} />
//             <Route exact path="/BillSubAttach" element={<BillSubAttach />} />
//             <Route
//               exact
//               path="/BillVendorAttach"
//               element={<BillVendorAttach />}
//             />
//             <Route exact path="/WDCattach" element={<WDCattach />} />
//             <Route exact path="/raise-demand" element={<RaiseDemand />} />
//             <Route exact path="/log-report" element={<ReportComponent />} />
//             <Route exact path="/ilms/:id" element={<IlmsSub />} />
//             <Route exact path="/mrs/:id" element={<MRSSub />} />
//             <Route exact path="/mir/:id" element={<MaterialIssueReqSub />} />
//             <Route exact path="/wmc/:id" element={<WMCSub />} />

//             {/* All PDF File Routes  */}
//             <Route
//               exact
//               path="/display-store-actions/store-issue-requisition/:payload"
//               element={<StoreIssueRequisition />}
//             />
//             <Route
//               exact
//               path="/display-store-actions/goods-issue-slip/:payload"
//               element={<GoodsIssueSlip />}
//             />
//             <Route
//               exact
//               path="/display-store-actions/goods-entry/:payload"
//               element={<Gateentrypdf />}
//             />
//             <Route
//               exact
//               path="/display-store-actions/icgrn-report/:payload"
//               element={<InspectionReport />}
//             />
//             <Route
//               exact
//               path="/display-store-actions/good-receipt-slip/:payload"
//               element={<GoodsReceiptSlip />}
//             />
//             <Route
//               exact
//               path="/display-store-actions/payment-advice/:payload"
//               element={<PaymentAdvice />}
//             />
//             <Route
//               exact
//               path="/display-store-actions/service-entry-sheet/:payload"
//               element={<ServiceEntrySheetPdf />}
//             />
//           </Routes>
//         )}
//       </BrowserRouter>
//     </>
//   );
// }

// export default Layout;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import POs from "./pages/POs";
import POArchived from "./pages/POArchived";
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
import HybridServicePOBillsEdit from "./pages/checklists/HybridServicePOBillsEdit";
import HybridServicePOBillsView from "./pages/checklists/HybridServicePOBillsView";
import AdvanceBillHybridEdit from "./pages/checklists/AdvanceBillHybridEdit";
import AdvanceBillHybridView from "./pages/checklists/AdvanceBillHybridView";
import BGfinance from "./pages/BGfinance";
import BTNfinance from "./pages/BTNfinance";

function Layout() {
  const { token, isLoggedIn } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      {!token && !isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      ) : (
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
            path="/checklist/hybrid-bill-service/:id"
            element={<HybridServicePOBills />}
          />
          <Route
            path="/checklist/hybrid-bill-service/edit/:id"
            element={<HybridServicePOBillsEdit />}
          />
          <Route
            path="/checklist/hybrid-bill-service/view/:id"
            element={<HybridServicePOBillsView />}
          />
          <Route
            path="/checklist/contract-bill-service/:id"
            element={<ServiceContractBills />}
          />
          <Route
            path="/checklist/bill-incorrect-deductions/:id"
            element={<ClaimIncorrectDeductions />}
          />
          <Route
            path="/checklist/advance-bill-hybrid/:id"
            element={<AdvanceBillHybrid />}
          />
          <Route
            path="/checklist/advance-bill-hybrid/view/:id"
            element={<AdvanceBillHybridView />}
          />
          <Route
            path="/checklist/advance-bill-hybrid/edit/:id"
            element={<AdvanceBillHybridEdit />}
          />
          <Route
            path="/checklist/claim-against-pbg/:id"
            element={<ClaimAgainstPBGSubmission />}
          />
          <Route
            path="/checklist/ld-penalty-refund/:id"
            element={<LDPenaltyRefund />}
          />
          <Route path="/bill-registration-number/:id" element={<BRNSub />} />
          <Route path="/payment-advise/:id" element={<PaymentAdvisesSub />} />
          <Route path="/pbg-upload/:id" element={<PBGuploadSub />} />
          <Route path="/bg-extension" element={<BGExtensionSub />} />
          <Route path="/dashboard/bg" element={<BGfinance />} />
          <Route path="/dashboard/btn" element={<BTNfinance />} />
          <Route path="/claim-letter/:id" element={<ClaimLatterSub />} />
          <Route path="/checklistedit/:id" element={<ChecklistSubEdit />} />
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
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default Layout;
