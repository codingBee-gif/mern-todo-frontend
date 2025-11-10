import { useEffect, useState } from "react";
import { API } from "../api.js";
import TodoItem from "../components/TodoItem.jsx";

export default function Todos() {
  const [list, setList] = useState([]);
  const [text, setText] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    try {
      const { data } = await API.get("/todos");
      setList(data);
    } catch (e) {
      setErr("Failed to load todos");
    }
  }

  useEffect(() => { load(); }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const { data } = await API.post("/todos", { text });
    setList([data, ...list]);
    setText("");
  }

  async function toggle(todo) {
    const { data } = await API.put(`/todos/${todo._id}`, { done: !todo.done });
    setList(list.map(t => t._id === data._id ? data : t));
  }

  async function remove(todo) {
    await API.delete(`/todos/${todo._id}`);
    setList(list.filter(t => t._id !== todo._id));
  }

  return (
    <div className="grid gap-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-3">Add a new todo</h2>
        {err && <div className="mb-3 rounded-lg bg-red-50 text-red-700 border border-red-200 px-3 py-2">{err}</div>}
        <form onSubmit={addTodo} className="flex gap-3">
          <input
            className="input"
            placeholder="What do you want to do?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Add</button>
        </form>
      </div>

      <div className="grid gap-3">
        {list.length === 0 && (
          <div className="text-slate-500 text-sm">No todos yet. Add your first one above!</div>
        )}
        {list.map(t => (
          <TodoItem key={t._id} todo={t} onToggle={toggle} onDelete={remove} />
        ))}
      </div>
    </div>
  );
}
