import React from 'react';
import ReactDOM from 'react-dom/client';
import CommentsProvider from './contexts/CommentsContext';
import App from './App';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CommentsProvider>
      <App />
    </CommentsProvider>
  </React.StrictMode>,
);
