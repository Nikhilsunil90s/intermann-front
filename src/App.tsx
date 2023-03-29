import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Embauch from "./pages/Embauch";
import ToDoList from "./pages/ToDoList";
import Dashboard from "./pages/Dashboard";
import EditDo from "./pages/EditPages/Edit_toDo";
import AddEmployes from "./pages/EditPages/AddEmployes";
import AddClient from "./pages/EditPages/AddClient";
import ToDoProfile from "./pages/ToDoProfile";
import Login from "./pages/Login";
import ProgressCard from "./pages/EmbauchProfile";
import ArchivedProfile from "./pages/ArchivedProfile";
import ArchivedList from "./pages/ArchivedList";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import EditProgress from "./pages/EditPages/EditProgress";
import EditArchive from "./pages/EditPages/Edit_Archived";
import AddSector from "./pages/AddNewSector";
import UserList from "./pages/EditPages/UserList";
import ClientToDoList from "./pages/ClientPages/ClientTodo";
import ClientProgress from "./pages/ClientPages/ClientProgress";
import ClientContract from "./pages/ClientPages/ClientContract";
import ClientArchived from "./pages/ClientPages/ClientArchived";
import ClientView from "./pages/ClientPages/ClientSeePage";
import ClientProgressView from "./pages/ClientPages/ClientProgressFullview";
import Signed from "./pages/ClientPages/SignedContract";
import RenameSector from "./pages/EditPages/RenameSector";
import ClientTodoEdit from "./pages/EditPages/ClientEdit_Page";
import ClientinProgressEdit from "./pages/EditPages/Client_EditinProgress";
import Preselected from "./pages/preSelected";
import PrivateRoute from "./ProctetedRoute/ProtectedRoute";
import ClientArchivedView from "./pages/ClientPages/ClientArchivedView";
import PreSelectedView from "./pages/preSelectedProfileView";
import PreSelectedEdit from "./pages/EditPages/PreSelectedEdit";
import ClientArchivedEdit from "./pages/EditPages/EditArchivedClient";
import ClientSignedEdit from "./pages/EditPages/SignedContractEdit";
import SignedView from "../src/pages/ClientPages/FullViewProfile/SignedContract";
import Error404 from "./pages/ErrorPages/Error404";
import Error500 from "./pages/ErrorPages/Error500";
import clientSignedGlobalCard from './pages/GlobalCards/ClientPages/ClientContractGlobalCard'
import ClientContractPage from './components/ClientContractPage'
import GlobalDocumentPage from './components/GlobalDocumentCandidatePage'
import DocumentChecker from './components/Document-checker'
import DocumentSign from "./components/DocumentSignCandidatePage";
import DocSignCandidate from "./components/Modal/DocSignCandidate";
import ThankYouPage from "./components/ThankYouPage";
import DownloadCenter from "./components/DownloadCenter";
import DocumentRepresentPDFVIEW from "../src/pages/DocumentRepresentPDFVIEW"
import RepresentanceSign from '../src/components/CandidateComponents/DocSignRepresentance'
import LeadsCenter from "./Leads/LeadsCenter";
import AddCandidate from './Leads/LeadToCandidate/AddCandidate'
import AddLeads from "./Leads/AddLeads"
import JobAdsList from "./JobAdsCenter/JobAdsList";
import AddReaserch from "./JobAdsCenter/AddReaserch";
import EditPage from "./JobAdsCenter/EditPage"
import AddLeadsCom from './CommercialCenter/pages/AddLeads'
import MainCenter from "./CommercialCenter/pages/MainCenter";
import AddInvoice from "./BILLING-CENTER/Pages/AddInvoice";
import BillingCenter from "./BILLING-CENTER/Pages/billing-Center";
import MainCenterOffer from "./Offer_Center/MainCenter";
import OfferSigned from "./Offer_Center/components/LastStepOfSign"
import ViewOffer from "./Offer_Center/components/DocumentSign";
import {Helmet} from "react-helmet";
import Favicon from "../src/images/Tablogo.svg"

function App() {
  return (
    <>
     <Helmet>
    <meta charSet="utf-8" />
    <title>Intermann CRM</title>
     <link rel="icon" type="image/png" href={Favicon} sizes="26x26" />
</Helmet>
    <Provider store={configureStore}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path={"/todolist"}
            element={
              <Sidebar>
                <PrivateRoute Component={ToDoList} />
              </Sidebar>
            }
          />
          {/* <Route path="/todolist" element={<Sidebar><ListTodo /></Sidebar>} /> */}
          <Route
            path={"/todolist/todoprofile"}
            element={
              <Sidebar>
                <PrivateRoute Component={ToDoProfile} />{" "}
              </Sidebar>
            }
          />

          <Route
            path={"/embauchlist"}
            element={
              <Sidebar>
                <PrivateRoute Component={Embauch} />
              </Sidebar>
            }
          />
          <Route
            path={"/embauchlist/embauchprofile"}
            element={
              <Sidebar>
                <PrivateRoute Component={ProgressCard} />{" "}
              </Sidebar>
            }
          />

          <Route
            path={"/archivedlist"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={ArchivedList} />
              </Sidebar>
            }
          />
          <Route
            path={"/archivedlist/archivedprofile"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={ArchivedProfile} />{" "}
              </Sidebar>
            }
          />

          <Route
            path={"/dashboard"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={Dashboard} />{" "}
              </Sidebar>
            }
          />

          <Route
            path={"/addCandidate"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={AddEmployes} />
              </Sidebar>
            }
          />
          <Route
            path={"/addCustomer"}
            element={
              <Sidebar>
               
                <AddClient />
              </Sidebar>
            }
          />

          <Route
            path={"/todolist/editTodo"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={EditDo} />
              </Sidebar>
            }
          />
          <Route
            path={"/embauchlist/editInProgress"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={EditProgress} />
              </Sidebar>
            }
          />
          <Route
            path={"/archivedlist/editArchived"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={EditArchive} />
              </Sidebar>
            }
          />
          <Route
            path={"/preSelected/editPreSelected"}
            element={
              <Sidebar>
                <PrivateRoute Component={PreSelectedEdit} />
              </Sidebar>
            }
          />

          <Route
            path={"/addNewSector"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={AddSector} />{" "}
              </Sidebar>
            }
          />
          <Route
            path={"/userList"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={UserList} />{" "}
              </Sidebar>
            }
          />

          <Route
            path={"/clientTodo"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={ClientToDoList} />
              </Sidebar>
            }
          />
          <Route
            path={"/clientProgress"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={ClientProgress} />
              </Sidebar>
            }
          />

          <Route
            path={"/clientContract"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientContract} />
              </Sidebar>
            }
          />
          <Route
            path={"/archived"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientArchived} />
              </Sidebar>
            }
          />

          <Route
            path={"/clientTodo/clientToDoProfile"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientView} />
              </Sidebar>
            }
          />
          <Route
            path={"/clientProgress/clientInProgressProfile"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientProgressView} />
              </Sidebar>
            }
          />

          <Route
            path={"/clientContract/clientSigned"}
            element={
              <Sidebar>
                <PrivateRoute Component={Signed} />
              </Sidebar>
            }
          />
          <Route
            path={"/joblist"}
            element={
              <Sidebar>
                <PrivateRoute Component={RenameSector} />
              </Sidebar>
            }
          />

          <Route
            path={"/clientTodo/clientToDoEdit"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientTodoEdit} />
              </Sidebar>
            }
          />
          <Route
            path={"/clientProgress/clientInProgressEdit"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientinProgressEdit} />
              </Sidebar>
            }
          />

          <Route
            path={"/preSelected"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={Preselected} />{" "}
              </Sidebar>
            }
          />
          <Route
            path={"/preSelected/preSelectedView"}
            element={
              <Sidebar>
                <PrivateRoute Component={PreSelectedView} />
              </Sidebar>
            }
          />

          <Route
            path={"/archived/archivedClientSeeprofile"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientArchivedView} />
              </Sidebar>
            }
          />
          <Route
            path={"/archived/archivedClientEditprofile"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientArchivedEdit} />
              </Sidebar>
            }
          />

          <Route
            path={"/clientContract/ClientContractEditprofile"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientSignedEdit} />
              </Sidebar>
            }
          />
<Route
            path={"/clientSignedView"}
            element={
              <Sidebar>
                <PrivateRoute Component={SignedView} />
              </Sidebar>
            }
          />
          {/* Download Center */}
          <Route
            path={"/downloadCenter"}
            element={
              <Sidebar>
                <PrivateRoute Component={DownloadCenter} />
              </Sidebar>
            }
          />

          {/* End */}
          {/* Leads Center */}

          <Route
            path={"/LeadsCenter"}
            element={
              <Sidebar>
                <PrivateRoute Component={LeadsCenter} />
              </Sidebar>
            }
          />
          
          <Route
            path={"/AddLeadToCandidate"}
            element={
              <Sidebar>
                <PrivateRoute Component={AddCandidate} />
              </Sidebar>
            }
          />
  <Route
            path={"/LeadsCenter/AddLeads"}
            element={
              <Sidebar>
                <PrivateRoute Component={AddLeads} />
              </Sidebar>
            }
          />
          {/* End */}

          {/* Job Ads */}
          <Route
            path={"/JobAdsCenter"}
            element={
              <Sidebar>
                <PrivateRoute Component={JobAdsList} />
              </Sidebar>
            }
          />
 <Route
            path={"/JobAdsCenter/AddReaserch"}
            element={
              <Sidebar>
                <PrivateRoute Component={AddReaserch} />
              </Sidebar>
            }
          />
           <Route
            path={"/JobAdsCenter/EditPage"}
            element={
              <Sidebar>
                <PrivateRoute Component={EditPage} />
              </Sidebar>
            }
          />

          {/* End Job Ads */}

          {/* commercialCenter */}

          <Route
            path={"commercialCenter/AddLeads"}
            element={
              <Sidebar>
                <PrivateRoute Component={AddLeadsCom} />
              </Sidebar>
            }
          />
           <Route
            path={"/commercialCenter"}
            element={
              <Sidebar>
                <PrivateRoute Component={MainCenter} />
              </Sidebar>
            }
          />

<Route
            path={"/ViewOffer/OfferSigned"}
            element={
            
                <OfferSigned />
            
            }
          />
             <Route
            path={"/ViewOffer/:id"}
            element={
            
                <ViewOffer />
            
            }
          />
       




          {/* end commercialCenter */}
          {/* Global Search Routes  */}
        
           <Route 
           path={"/clientSignedGlobalCard"}
           element={
            <Sidebar>
              <PrivateRoute Component={clientSignedGlobalCard} />
            </Sidebar>
           }

           />
       <Route
            path={"/documentbox/:clientCompanyName/:id"}
            element={
            
                <ClientContractPage />
            
            }
          />
           <Route
            path={"/ContractSigend"}
            element={
            
                <DocSignCandidate />
            
            }
          />
            <Route
            path={"/RepresentenceContractSigend"}
            element={
            
                <RepresentanceSign />
            
            }
          />
            <Route
            path={"/AvanceContractSigend"}
            element={
            
                <RepresentanceSign />
            
            }
          />
           <Route
            path={"/documentSigned/thankYou"}
            element={
            
                <ThankYouPage />
            
            }
          />
                <Route
            path={"/:ClientEmp/documentSign/:Candidate/:id"}
            element={
            
                <DocumentSign />
            
            }
          />
              <Route
            path={"/:ReAvance/documentSignForReAvance/:Candidate/:id"}
            element={
            
                <DocumentRepresentPDFVIEW />
            
            }
          />
              <Route
            path={"/document-checker"}
            element={
            
                <DocumentChecker />
            
            }
          />
              <Route
            path={"/candidateDocumentbox/:candidateName/:id"}
            element={
            
                <GlobalDocumentPage />
            
            }
          />
          {/* End */}
          {/* Billing Center */}
          <Route
            path={"/billing-Center/AddInvoice"}
            element={
            
                <AddInvoice />
            
            }
          />
           <Route
            path={"/billing-Center"}
            element={
            
             <Sidebar >  <BillingCenter /></Sidebar>
            
            }
          />

          {/* End */}
          {/* Offer - Center */}
          <Route
            path={"/offerCenter"}
            element={
            
             <Sidebar > <MainCenterOffer   /></Sidebar>
            
            }
          />
          
          {/* End */}

          <Route path="/Error404" element={<Error404 />} />
          <Route path="/Error500" element={<Error500 />} />

        </Routes>
      </Router>
    </Provider>
    </> );
}

export default App;
