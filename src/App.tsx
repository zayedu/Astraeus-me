import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/login-page"
import DashboardLayout from "./components/dashboard-layout"
import DashboardPage from "./pages/dashboard-page"
import DocumentsPage from "./pages/documents-page"
import ParEditPage from "./pages/par-edit-page"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="par/:id/edit" element={<ParEditPage />} />
        <Route path="par/new/edit" element={<ParEditPage />} />
      </Route>
    </Routes>
  )
}

export default App
