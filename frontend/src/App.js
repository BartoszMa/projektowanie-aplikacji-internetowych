import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/admin/Admin";
import NotFound from "./pages/NotFound";
import QuestionsPage from "./pages/QuestionsPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

import { Navigate } from "react-router-dom";
import AdminOpenQuestions from "./pages/admin/AdminOpenQuestions";
import EditOpenQuestion from "./pages/admin/EditOpenQuestion";
import AddOpenQuestion from "./pages/admin/AddOpenQuestion";
import AdminClosedQuestions from "./pages/admin/AdminClosedQuestions";
import EditClosedQuestion from "./pages/admin/EditClosedQuestion";
import AddClosedQuestion from "./pages/admin/AddClosedQuestion";
import AddQuestion from "./pages/admin/AddQuestion";

function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <Admin />
                </ProtectedAdminRoute>
              }
            />

            <Route
              path="/admin/open"
              element={
                <ProtectedAdminRoute>
                  <AdminOpenQuestions />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/open/edit/:id"
              element={
                <ProtectedAdminRoute>
                  <EditOpenQuestion />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/open/add"
              element={
                <ProtectedAdminRoute>
                  <AddOpenQuestion />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/add"
              element={
                <ProtectedAdminRoute>
                  <AddQuestion />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/closed"
              element={
                <ProtectedAdminRoute>
                  <AdminClosedQuestions />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/closed/edit/:id"
              element={
                <ProtectedAdminRoute>
                  <EditClosedQuestion />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/closed/add"
              element={
                <ProtectedAdminRoute>
                  <AddClosedQuestion />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/:type" element={<QuestionsPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
