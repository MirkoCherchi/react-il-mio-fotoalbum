import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import { AuthProvider } from "./components/Auth/Context";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Photos from "./components/Photos";
import PhotoForm from "./components/AdminPage/PhotoForm";
import PhotoManagement from "./components/AdminPage/PhotoManagement";
import UpdatePhoto from "./components/AdminPage/PhotoUpdate";
import ProfilePage from "./pages/ProfilePage";
import SinglePhoto from "./pages/SinglePhoto";
import AddCategory from "./pages/AddCategory";
import AllCategories from "./pages/AllCategories";
import CategoryPhotos from "./pages/CategoryPhotos";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/upload-photo" element={<PhotoForm />} />
            <Route path="/edit-photos" element={<PhotoManagement />} />
            <Route path="/admin/photos/:id/edit" element={<UpdatePhoto />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/photos/:id" element={<SinglePhoto />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/categories" element={<AllCategories />} />
            <Route
              path="/categories/:categoryId/photos"
              element={<CategoryPhotos />}
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
