import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../services/PostServices";

function StatusBadge({ status }) {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold";
  return status === "Published"
    ? <span className={`${base} bg-emerald-100 text-emerald-700`}>{status}</span>
    : <span className={`${base} bg-amber-100 text-amber-600`}>{status}</span>;
}

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post,    setPost]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await PostService.getPostById(id);
        setPost(data);
      } catch {
        setError("Failed to load post. It may not exist or there was a network error.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-400 text-sm">
        <svg className="w-5 h-5 animate-spin text-violet-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        Loading post…
      </div>
    </div>
  );

  if (error || !post) return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-3">
      <div className="bg-white rounded-2xl shadow-sm px-8 py-10 flex flex-col items-center gap-4 max-w-sm w-full mx-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          </svg>
        </div>
        <p className="text-gray-600 text-sm text-center">{error || "Post not found."}</p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 mb-5 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back to all posts
        </button>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          {post.thumbnail && (
            <img
              src={post.thumbnail}
              alt="thumbnail"
              className="w-full h-56 object-cover"
              onError={e => (e.target.style.display = "none")}
            />
          )}

          <div className="px-8 py-7">

            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{post.title}</h1>
              {post.status && <StatusBadge status={post.status}/>}
            </div>

            <div className="flex flex-wrap gap-5 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  {post.author}
                </span>
              )}
              {post.email && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  {post.email}
                </span>
              )}
              {post.category && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                  {post.category}
                </span>
              )}
              {post.created && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  {post.created}
                </span>
              )}
            </div>

            {post.description && (
              <p className="text-gray-500 text-sm italic mb-6 bg-slate-50 rounded-xl px-4 py-3 border-l-4 border-violet-300">
                {post.description}
              </p>
            )}

            {post.content && (
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            )}

           {post.tags && (
           <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
             <span key={tag}>
              {tag}
             </span>
                ))}
             </div>
             )}

            <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-gray-100">
              <button
                onClick={() => navigate("/")}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                onClick={() => navigate(`/edit/${post.id}`)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white rounded-lg shadow-sm transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Edit Post
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;