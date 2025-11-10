export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo)}
        className="h-5 w-5 accent-blue-600 cursor-pointer"
      />
      <span className={`flex-1 ${todo.done ? "line-through text-slate-400" : "text-slate-800"}`}>
        {todo.text}
      </span>
      <button className="btn btn-ghost" onClick={() => onDelete(todo)}>Delete</button>
    </div>
  );
}
