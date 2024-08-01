import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // Adjust the path if necessary
// import Profile from './image';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
    <Router>
      <App />
      < ToastContainer />
    </Router>
  );


