import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Todos from "./pages/Todos.jsx";
import { getUser, logout } from "./auth.jsx";

export default function App() {
  const user = getUser();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div>
      {/* Top bar */}
      <header className="bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/todos" className="font-semibold text-slate-900">MERN Todos</Link>
          <nav className="flex gap-4 items-center">
            {!user && <Link className="link" to="/login">Login</Link>}
            {!user && <Link className="link" to="/register">Register</Link>}
            {user && (
              <div className="flex items-center gap-3">
                <span className="badge">Hi, {user.name}</span>
                <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Page body */}
      <main className="container-page">
        <Routes>
          <Route path="/" element={<Navigate to="/todos" />} />
          <Route path="/login" element={user ? <Navigate to="/todos" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/todos" /> : <Register />} />
          <Route path="/todos" element={user ? <Todos /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}
