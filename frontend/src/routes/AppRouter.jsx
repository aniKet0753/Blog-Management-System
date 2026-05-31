import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import AddPost from "../pages/AddPost";
import EditPost from "../pages/EditPost";
import ViewPost from "../pages/ViewPost";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddPost />} />
      <Route path="/edit-post/:id" element={<EditPost />} />
      <Route path="/view/:id" element={<ViewPost />} />
    </Routes>
  );
};

export default AppRoutes;