import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

// Smoke test: the home page renders with navigation, the updated hero
// and the new construction-materials section.
test('renders home page with nav, hero and materials section', () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );

  expect(screen.getByRole('navigation', { name: /əsas naviqasiya/i })).toBeInTheDocument();
  expect(screen.getByText(/Etibarlı Ünvanı/i)).toBeInTheDocument();
  // New business line is visible on the home page (section + footer link)
  expect(screen.getAllByText(/Qum, Atsep və Şeben Satışı/i).length).toBeGreaterThan(0);
});
