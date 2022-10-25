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
import PrivateRoute from "./ProctetedRoute/ProctedRoute";
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
function App() {
  return (
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
            path={"/todoprofile"}
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
            path={"/embauchprofile"}
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
            path={"/archivedprofile"}
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
            path={"/editTodo"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={EditDo} />
              </Sidebar>
            }
          />
          <Route
            path={"/editInProgress"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={EditProgress} />
              </Sidebar>
            }
          />
          <Route
            path={"/editArchived"}
            element={
              <Sidebar>
               
                <PrivateRoute Component={EditArchive} />
              </Sidebar>
            }
          />
          <Route
            path={"/editPreSelected"}
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
            path={"/clientToDoProfile"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientView} />
              </Sidebar>
            }
          />
          <Route
            path={"/clientInProgressProfile"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientProgressView} />
              </Sidebar>
            }
          />

          <Route
            path={"/clientSigned"}
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
            path={"/clientToDoEdit"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientTodoEdit} />
              </Sidebar>
            }
          />
          <Route
            path={"/clientInProgressEdit"}
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
            path={"/preSelectedView"}
            element={
              <Sidebar>
                <PrivateRoute Component={PreSelectedView} />
              </Sidebar>
            }
          />

          <Route
            path={"/archivedClientSeeprofile"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientArchivedView} />
              </Sidebar>
            }
          />
          <Route
            path={"/archivedClientEditprofile"}
            element={
              <Sidebar>
                <PrivateRoute Component={ClientArchivedEdit} />
              </Sidebar>
            }
          />

          <Route
            path={"/ClientContractEditprofile"}
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
          <Route
            path={"/downloadCenter"}
            element={
              <Sidebar>
                <PrivateRoute Component={DownloadCenter} />
              </Sidebar>
            }
          />
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
          <Route path="/Error404" element={<Error404 />} />
          <Route path="/Error500" element={<Error500 />} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
