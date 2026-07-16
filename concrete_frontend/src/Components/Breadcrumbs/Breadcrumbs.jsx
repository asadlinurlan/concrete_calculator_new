import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Breadcrumbs.css';

// Visible breadcrumb trail for sub-pages (pairs with BreadcrumbList JSON-LD in Seo).
const Breadcrumbs = ({ current }) => (
  <nav className="breadcrumbs" aria-label="Naviqasiya yolu">
    <Link to="/">Ana Səhifə</Link>
    <ChevronRight size={14} aria-hidden="true" className="bc-sep" />
    <span aria-current="page">{current}</span>
  </nav>
);

export default Breadcrumbs;
