// frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/About";
import ServicesPage from "./pages/Services";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Contact from "./pages/Contact";
import TestimonialsAndCaseStudies from "./pages/Testimonial";
import NewsletterPage from "./pages/Newsletter";
import BlogPage from "./pages/Blog";

import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
// import ProfilePage from "./pages/Profile";
// import SettingsPage from "./pages/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonials" element={<TestimonialsAndCaseStudies />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/blog" element={<BlogPage />} />

        {/* Dashboard layout with nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="profile" element={<ProfilePage />} /> */}
          {/* <Route path="settings" element={<SettingsPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;