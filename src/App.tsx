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
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.5 }} 
                >
                  <ListCredential />
                </motion.div>
              } 
            />
            <Route 
              path="/viewcrdentials" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.5 }} 
                >
                  <ViewCredential />
                </motion.div>
              } 
            />
            <Route 
              path="/createcredentials" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.5 }} 
                >
                  <CreateCredential />
                </motion.div>
              } 
            />
            <Route 
              path="/success/:id" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.5 }} 
                >
                  <Success />
                </motion.div>
              } 
            />
            <Route 
              path="/design" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.5 }} 
                >
                  <Design />
                </motion.div>
              } 
            />
            <Route 
              path="/pathways" 
              element={
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.5 }} 
                >
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
