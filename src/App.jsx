import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import {
  AuthProvider,
} from "./context/AuthContext";

import ProtectedRoute
from "./components/ProtectedRoute";

import MainLayout
from "./layouts/MainLayout";

import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";

function App() {

  return (
    <BrowserRouter>

      <AuthProvider>

        <Routes>
<Route
  path="/"
  element={<Login />}
/>

<Route
  path="/login"
  element={<Login />}
/>

<Route
  path="/register"
  element={<Register />}
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/projects"
  element={
    <ProtectedRoute>
      <MainLayout>
        <Projects />
      </MainLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/projects/:id"
  element={
    <ProtectedRoute>
      <MainLayout>
        <ProjectDetails />
      </MainLayout>
    </ProtectedRoute>
  }
/>

        </Routes>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;