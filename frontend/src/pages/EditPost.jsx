import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostService from "../services/PostServices";

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-white transition";
const labelCls = "block text-sm font-medium text-gray-700 mb-1.5";

const CATEGORIES = ["Technology", "Design", "Business", "Lifestyle"];

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    email: "",
    category: "",
    tags: "",
    status: "",
    thumbnail: "",
    description: "",
    content: "",
  });

  const [fetchLoading, setFetchLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setFetchLoading(true);
        setFetchError(null);
        const post = await PostService.getPostById(id);
        setForm({
          title: post.title || "",
          author: post.author || "",
          email: post.email || "",
          category: post.category || "",
          tags: post.tags || "",
          status: post.status || "",
          thumbnail: post.thumbnail || "",
          description: post.description || "",
          content: post.content || "",
        });
      } catch {
        setFetchError("Failed to load post. Please go back and try again.");
      } finally {
        setFetchLoading(false);
      }
    };
    loadPost();
  }, [id]);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.author.trim()) errs.author = "Author name is required.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (!form.category) errs.category = "Please select a category.";
    if (!form.status) errs.status = "Please select a status.";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    try {
      setSubmitLoading(true);
      await PostService.updatePost(id, form);
      navigate("/");
    } catch {
      alert("Failed to update post. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <svg className="w-5 h-5 animate-spin text-violet-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading post...
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-3">
        <p className="text-red-500 text-sm">{fetchError}</p>
        <button onClick={() => navigate("/")} className="text-violet-600 text-sm underline">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 font-sans">
      <div className="bg-white rounded-2xl shadow-sm px-6 py-8 mb-5 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Edit Post</h2>
        <p className="text-sm text-gray-400 mt-1">Update the details for post #{id}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm px-6 py-6 space-y-8">

        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Title <span className="text-red-400">*</span></label>
              <input className={inputCls} placeholder="Enter post title" value={form.title} onChange={set("title")} />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className={labelCls}>Author Name <span className="text-red-400">*</span></label>
              <input className={inputCls} placeholder="Enter author name" value={form.author} onChange={set("author")} />
              {errors.author && <p className="text-xs text-red-500 mt-1">{errors.author}</p>}
            </div>
          </div>
          <div className="mt-4">
            <label className={labelCls}>Email Address</label>
            <input className={inputCls} type="email" placeholder="author@example.com" value={form.email} onChange={set("email")} />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
            Classification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category <span className="text-red-400">*</span></label>
              <select className={inputCls} value={form.category} onChange={set("category")}>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
            </div>
            <div>
              <label className={labelCls}>Tags</label>
              <input className={inputCls} placeholder="Comma-separated tags" value={form.tags} onChange={set("tags")} />
              <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
            </div>
          </div>
          <div className="mt-4">
            <label className={labelCls}>Status <span className="text-red-400">*</span></label>
            <select className={inputCls} value={form.status} onChange={set("status")}>
              <option value="">Select status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
            {errors.status && <p className="text-xs text-red-500 mt-1">{errors.status}</p>}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
            Media
          </h3>
          <label className={labelCls}>Thumbnail URL</label>
          <input className={inputCls} placeholder="https://example.com/image.jpg" value={form.thumbnail} onChange={set("thumbnail")} />
        </section>

        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
            Content
          </h3>
          <div>
            <label className={labelCls}>Short Description</label>
            <textarea
              className={`${inputCls} resize-none`}
              rows={3}
              placeholder="Brief summary of the post"
              value={form.description}
              onChange={set("description")}
            />
          </div>
          <div className="mt-4">
            <label className={labelCls}>Post Content</label>
            <textarea
              className={`${inputCls} resize-none`}
              rows={8}
              placeholder="Write your full blog post content here"
              value={form.content}
              onChange={set("content")}
            />
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitLoading}
            className="px-6 py-2.5 text-sm font-semibold bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white rounded-lg shadow-sm transition flex items-center gap-2"
          >
            {submitLoading && (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            )}
            {submitLoading ? "Updating..." : "Update Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;