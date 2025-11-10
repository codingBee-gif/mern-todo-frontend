import { useState } from "react";
import { API } from "../api.js";
import { saveAuth } from "../auth.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await API.post("/auth/register", form);
      saveAuth(data);
      navigate("/todos");
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to register");
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Create your account</h2>
        {err && <div className="mb-3 rounded-lg bg-red-50 text-red-700 border border-red-200 px-3 py-2">{err}</div>}
        <form onSubmit={submit} className="grid gap-4">
          <div>
            <label className="block mb-1 text-sm text-slate-600">Name</label>
            <input className="input" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-600">Email</label>
            <input className="input" type="email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-600">Password</label>
            <input className="input" type="password" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary w-full">Create account</button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account? <Link className="link" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
