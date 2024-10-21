// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // Import Framer Motion components
import Header from './components/Header';
import Footer from './components/Footer';
import CreateCredential from './components/CreateCredential';
import Success from './components/Success';
import ViewCredential from './components/ViewCredential';
import ListCredential from './components/ListCredential';
import Design from './components/Design';
import Pathways from './components/Pathways';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fadeAnimation = {
  initial: { opacity: 0 }, // Start with opacity 0 (invisible)
  animate: { opacity: 1 }, // Fade in to opacity 1 (fully visible)
  exit: { opacity: 0 }, // Fade out to opacity 0 (invisible)
  transition: { duration: 0 } // Control the speed of the fade (0.5 seconds)
};

const App: React.FC = () => {
  const location = useLocation();
  
  // Check if the current path is "/createcredentials"
  const isCreateCredentialPage = location.pathname === '/createcredentials';

  return (
    <div className="app-container">
      <Header />
      <ToastContainer />

      <main>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={
                <motion.div {...fadeAnimation}>
                  <ListCredential />
                </motion.div>
              } 
            />
            <Route 
              path="/viewcredential/:id" 
              element={
                <motion.div {...fadeAnimation}>
                  <ViewCredential />
                </motion.div>
              } 
            />
            <Route 
              path="/createcredentials" 
              element={
                <motion.div {...fadeAnimation}>
                  <CreateCredential />
                </motion.div>
              } 
            />
            <Route 
              path="/success/:id" 
              element={
                <motion.div {...fadeAnimation}>
                  <Success />
                </motion.div>
              } 
            />
            <Route 
              path="/design" 
              element={
                <motion.div {...fadeAnimation}>
                  <Design />
                </motion.div>
              } 
            />
            <Route 
              path="/pathways" 
              element={
                <motion.div {...fadeAnimation}>
                  <Pathways />
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
      {/* Conditionally render the Footer */}
      {!isCreateCredentialPage && <Footer />}
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
