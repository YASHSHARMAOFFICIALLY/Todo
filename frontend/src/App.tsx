import { FormEvent, useEffect, useState } from "react";
import "./index.css";

type TodoStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

type Todo = {
  id: number;
  title: string;
  Description: string;
  status: TodoStatus;
};

const STATUS_LABELS: Record<TodoStatus, string> = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

// In production this would be "https://api.myapp.com"
const BACKEND_URL = "http://localhost:3000";

const api = async (path: string, options: RequestInit = {}) => {
  const res = await fetch(BACKEND_URL + path, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
};

export function App() {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("todo_token") || "");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TodoStatus>("NOT_STARTED");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const authHeaders = { Authorization: `Bearer ${token}` };

  const loadTodos = async () => {
    if (!token) return;
    try {
      const data = await api("/api/todo", { headers: authHeaders });
      setTodos(typeof data === "string" ? [] : data.todo || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load todos");
    }
  };

  useEffect(() => {
    void loadTodos();
  }, [token]);

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    try {
      const path = authMode === "signin" ? "/api/auth/signin" : "/api/auth/signup";
      const body = authMode === "signin" ? { email, password } : { name, email, password };
      const data = await api(path, { method: "POST", body: JSON.stringify(body) });
      if (data.token) {
        localStorage.setItem("todo_token", data.token);
        setToken(data.token);
        setNotice("Signed in.");
      } else {
        setAuthMode("signin");
        setNotice("Account created. Sign in now.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Auth failed");
    }
  };

  const handleTodoSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    try {
      await api(editingId ? `/api/todo/${editingId}` : "/api/todo", {
        method: editingId ? "PUT" : "POST",
        headers: authHeaders,
        body: JSON.stringify({ title, description, status }),
      });
      setTitle("");
      setDescription("");
      setStatus("NOT_STARTED");
      setEditingId(null);
      setNotice(editingId ? "Updated." : "Created.");
      await loadTodos();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save todo");
    }
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setTitle(todo.title);
    setDescription(todo.Description);
    setStatus(todo.status);
  };

  const deleteTodo = async (id: number) => {
    setError("");
    try {
      await api(`/api/todo/${id}`, { method: "DELETE", headers: authHeaders });
      setNotice("Deleted.");
      await loadTodos();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete");
    }
  };

  const logout = () => {
    localStorage.removeItem("todo_token");
    setToken("");
    setTodos([]);
    setError("");
    setNotice("");
  };

  return (
    <main className="main">
      <div className="container">
        {/* Header */}
        <div className="brutal-panel">
          <p className="label">Todo API Lab</p>
          <h1>Minimal todo client.</h1>
          <p className="subtitle">Learning auth, CRUD, and connecting frontend to backend.</p>
        </div>

        {/* Messages */}
        {error && <div className="brutal-alert">{error}</div>}
        {notice && <div className="brutal-notice">{notice}</div>}

        {!token ? (
          /* Auth Form */
          <div className="brutal-card">
            <div className="card-header">
              <h2>{authMode === "signin" ? "Sign in" : "Create account"}</h2>
              <button
                type="button"
                className="brutal-btn outline"
                onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
              >
                {authMode === "signin" ? "Need account?" : "Have account?"}
              </button>
            </div>
            <form onSubmit={handleAuth}>
              {authMode === "signup" && (
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input id="name" className="brutal-input" value={name} onChange={e => setName(e.target.value)} required minLength={4} />
                </div>
              )}
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" className="brutal-input" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" className="brutal-input" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
                <small>Needs uppercase, lowercase, number, 8+ chars.</small>
              </div>
              <button type="submit" className="brutal-btn primary full">
                {authMode === "signin" ? "Sign in" : "Create account"}
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Todo Form */}
            <div className="brutal-card">
              <div className="card-header">
                <h2>{editingId ? "Edit todo" : "New todo"}</h2>
                <button type="button" className="brutal-btn outline" onClick={logout}>Log out</button>
              </div>
              <form onSubmit={handleTodoSubmit}>
                <div className="field">
                  <label htmlFor="todo-title">Title</label>
                  <input id="todo-title" className="brutal-input" value={title} onChange={e => setTitle(e.target.value)} required minLength={3} />
                </div>
                <div className="field">
                  <label htmlFor="todo-desc">Description</label>
                  <textarea id="todo-desc" className="brutal-input" rows={3} value={description} onChange={e => setDescription(e.target.value)} required minLength={4} />
                </div>
                <div className="field">
                  <label htmlFor="todo-status">Status</label>
                  <select id="todo-status" className="brutal-input" value={status} onChange={e => setStatus(e.target.value as TodoStatus)}>
                    {Object.entries(STATUS_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="btn-row">
                  <button type="submit" className="brutal-btn primary">
                    {editingId ? "Update" : "Add todo"}
                  </button>
                  {editingId && (
                    <button type="button" className="brutal-btn outline" onClick={() => { setEditingId(null); setTitle(""); setDescription(""); setStatus("NOT_STARTED"); }}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Todo List */}
            <div className="brutal-card">
              <div className="card-header">
                <h2>Your todos ({todos.length})</h2>
                <button type="button" className="brutal-btn outline" onClick={loadTodos}>Refresh</button>
              </div>
              {todos.length === 0 ? (
                <p className="empty">No todos yet. Add one above.</p>
              ) : (
                <div className="todo-list">
                  {todos.map(todo => (
                    <div key={todo.id} className="brutal-todo">
                      <div>
                        <div className="todo-header">
                          <h3>{todo.title}</h3>
                          <span className="brutal-badge">{STATUS_LABELS[todo.status]}</span>
                        </div>
                        <p className="todo-desc">{todo.Description}</p>
                      </div>
                      <div className="btn-row">
                        <button type="button" className="brutal-btn outline" onClick={() => startEdit(todo)}>Edit</button>
                        <button type="button" className="brutal-btn danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
