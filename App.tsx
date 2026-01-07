import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import IgnitionLoader from './components/UI/IgnitionLoader'; // Use as fallback or separate loading spinner

// Lazy Loading Pages
const Home = React.lazy(() => import('./components/Pages/HomePage'));
const ServicesPage = React.lazy(() => import('./components/Pages/ServicesPage'));
const ServiceDetailPage = React.lazy(() => import('./components/Pages/ServiceDetailPage'));
const ProjectsPage = React.lazy(() => import('./components/Pages/ProjectsPage'));
const ProjectDetailPage = React.lazy(() => import('./components/Pages/ProjectDetailPage'));
const BlogPage = React.lazy(() => import('./components/Pages/BlogPage'));
const BlogDetailPage = React.lazy(() => import('./components/Pages/BlogDetailPage'));
const ContactPage = React.lazy(() => import('./components/Pages/ContactPage'));
const AboutPage = React.lazy(() => import('./components/Pages/AboutPage'));

// Simple Loading Fallback
const PageLoader = () => (
  <div className="w-full h-screen bg-[#F5F5F7] flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;