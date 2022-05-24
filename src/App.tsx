import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Embauch from "./pages/Embauch";
import ToDoList from "./pages/ToDoList";
import Dashboard from "./pages/Dashboard";
import EditDo from './pages/EditPages/Edit_toDo';
import AddEmployes from './pages/EditPages/AddEmployes'
import AddClient from "./pages/EditPages/AddClient";
import ToDoProfile from './pages/ToDoProfile';
import Login from './pages/Login';
import ProgressCard from './pages/EmbauchProfile';
import ArchivedProfile from './pages/ArchivedProfile';
import ArchivedList from "./pages/ArchivedList";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import EditProgress from "./pages/EditPages/EditProgress";
import EditArchive from "./pages/EditPages/Edit_Archived";
import AddSector from "./pages/AddNewSector";
import UserList from "./pages/EditPages/UserList";
import ClientToDoList from "./pages/ClientPages/ClientTodo";
import ClientProgress from "./pages/ClientPages/ClientProgress"
import ClientContract from "./pages/ClientPages/ClientContract";
import ClientArchived from "./pages/ClientPages/ClientArchived";
import ClientView from "./pages/ClientPages/ClientSeePage"
import ClientProgressView from "./pages/ClientPages/ClientProgressFullview";
import Signed from "./pages/ClientPages/SignedContract";

function App() {
  return (
    <Provider store={configureStore}>
      <Router >
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path={"/todolist"} element={<Sidebar> <ToDoList /></Sidebar>} />
          <Route path={"/todoprofile"} element={<Sidebar> <ToDoProfile /> </Sidebar>} />

          <Route path={"/embauchlist"} element={<Sidebar> <Embauch /> </Sidebar>} />
          <Route path={"/embauchprofile"} element={<Sidebar> <ProgressCard /> </Sidebar>} />

          <Route path={"/archivedlist"} element={<Sidebar> <ArchivedList /></Sidebar>} />
          <Route path={"/archivedprofile"} element={<Sidebar> <ArchivedProfile /> </Sidebar>} />

          <Route path={"/dashboard"} element={<Sidebar> <Dashboard /> </Sidebar>} />

          <Route path={"/addCandidate"} element={<Sidebar> <AddEmployes /></Sidebar>} />
          <Route path={"/addCustomer"} element={<Sidebar> <AddClient /></Sidebar>} />

          <Route path={"/editTodo"} element={<Sidebar> <EditDo /></Sidebar>} />
          <Route path={"/editInProgress"} element={<Sidebar> <EditProgress /></Sidebar>} />
          <Route path={"/editArchived"} element={<Sidebar> <EditArchive /></Sidebar>} />

          <Route path={"/addNewSector"} element={<Sidebar> <AddSector /> </Sidebar>} />
          <Route path={"/userList"} element={<Sidebar> <UserList /> </Sidebar>} />

          <Route path={"/clientTodo"} element={<Sidebar> <ClientToDoList /></Sidebar>} />
          <Route path={"/clientProgress"} element={<Sidebar> <ClientProgress /></Sidebar>} />

          <Route path={"/clientContract"} element={ <Sidebar><ClientContract /></Sidebar>} />
          <Route path={"/archived"} element={ <Sidebar><ClientArchived /></Sidebar>} />

          <Route path={"/clientFullprofile"} element={ <Sidebar><ClientView /></Sidebar>} />
          <Route path={"/clientFullprogress"} element={ <Sidebar><ClientProgressView /></Sidebar>} /> 

          <Route path={"/clientSigned"} element={ <Sidebar><Signed /></Sidebar>} /> 
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
