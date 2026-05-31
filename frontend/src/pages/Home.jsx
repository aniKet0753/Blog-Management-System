import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/PostServices";

const CATEGORIES = ["All Categories", "Technology", "Design", "Business", "Lifestyle"];
const STATUSES = ["All Status", "Published", "Draft"];
const PAGE_SIZE = 5;

function StatusBadge({ status }) {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold";
  return status === "Published"
    ? <span className={`${base} bg-emerald-100 text-emerald-700`}>{status}</span>
    : <span className={`${base} bg-amber-100 text-amber-600`}>{status}</span>;
}

const Home = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PostService.getAllPosts();
      setPosts(data);
    } catch (err) {
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await PostService.deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete post.");
    }
  };

  const handleExport = () => {
    const headers = ["ID", "Title", "Author", "Category", "Status", "Created"];
    const rows = posts.map((p) => [p.id, p.title, p.author, p.category, p.status, p.created]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blog-posts.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = posts.filter((p) => {
    const matchSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.author?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All Categories" || p.category === category;
    const matchStatus = statusFilter === "All Status" || p.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    const close = () => setOpenMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans">
      <div className="bg-white rounded-2xl shadow-sm px-6 py-5 mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Blog Post Manager</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage and organize your blog posts</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
          <button
            onClick={() => navigate("/add")}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Post
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 ">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" strokeWidth={2} />
            <path strokeLinecap="round" strokeWidth={2} d="M21 21l-4.35-4.35" />
          </svg>
          <input
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select
          className="border border-gray-200 rounded-xl text-sm px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-700"
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select
          className="border border-gray-200 rounded-xl text-sm px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-700"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
        >
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
            <svg className="w-5 h-5 animate-spin text-violet-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Loading posts...
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="text-red-500 text-sm">{error}</p>
            <button onClick={fetchPosts} className="text-violet-600 text-sm underline">Retry</button>
          </div>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["ID", "Title", "Author", "Category", "Status", "Created", "Action"].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
                      No posts found.
                    </td>
                  </tr>
                ) : (
                  paginated.map((post,index) => (
                    <tr key={post._id} className="border-b border-gray-50 hover:bg-slate-50 transition">
                      <td className="px-5 py-4 text-gray-400 font-medium"> {(page - 1) * PAGE_SIZE + index + 1}</td>
                      <td className="px-5 py-4 font-medium text-gray-800  truncate">{post.title}</td>
                      <td className="px-5 py-4 text-gray-600">{post.author}</td>
                      <td className="px-5 py-4 text-gray-600">{post.category}</td>
                      <td className="px-5 py-4"><StatusBadge status={post.status} /></td>
                      <td className="px-5 py-4 text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4 relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === post._id ? "" : post._id); }}
                          className="p-1 rounded hover:bg-gray-100 text-gray-500"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                          </svg>
                        </button>
                        {String(openMenu) === String(post._id) && (
                          <div
                            className="absolute right-0 top-10 z-50 bg-white border rounded-xl shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => { navigate(`/view/${post._id}`); setOpenMenu(null); }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </button>
                            <button
                              onClick={() => { navigate(`/edit-post/${post._id}`); setOpenMenu(null); }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => { handleDelete(post._id); setOpenMenu(null); }}
                              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
              <span className="text-xs text-gray-400">
                Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to{" "}
                {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} records
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition text-sm"
                >‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                      n === page
                        ? "bg-violet-600 text-white shadow-sm"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >{n}</button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition text-sm"
                >›</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;