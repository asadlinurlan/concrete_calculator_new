import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Routes are prerendered to static HTML at build time (scripts/prerender.js):
// crawlers and social bots get full content without JavaScript, and users see
// an instant static first paint. We deliberately render (not hydrate) — the
// serialized client DOM merges adjacent text nodes, which React 18's strict
// hydration rejects (#418/#423). A clean render swaps in identical markup with
// zero mismatch errors.
ReactDOM.createRoot(rootElement).render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
