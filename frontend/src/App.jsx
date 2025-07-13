import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/About';
import ServicesPage from './pages/Services';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Contact from './pages/Contact';
import TestimonialsAndCaseStudies from './pages/Testimonial';
import NewsletterPage from './pages/Newsletter';
import BlogPage from './pages/Blog';


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
        {/* Add more routes as needed */}
       
        
      </Routes>
    </Router>
  );
}
export default App;
