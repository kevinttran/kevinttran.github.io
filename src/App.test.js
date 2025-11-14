import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Kevin Tuan Tran header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Kevin Tuan Tran/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders Full Stack Engineer subtitle', () => {
  render(<App />);
  const subtitleElement = screen.getByText(/Full Stack Engineer/i);
  expect(subtitleElement).toBeInTheDocument();
});

test('renders profile photo', () => {
  render(<App />);
  const profilePhoto = screen.getByAltText(/Kevin Tuan Tran/i);
  expect(profilePhoto).toBeInTheDocument();
});

test('renders About Me section', () => {
  render(<App />);
  const aboutSection = screen.getByText(/About Me/i);
  expect(aboutSection).toBeInTheDocument();
});

test('renders Programming Languages section', () => {
  render(<App />);
  const languagesSection = screen.getByText(/Programming Languages/i);
  expect(languagesSection).toBeInTheDocument();
});

test('renders all programming languages', () => {
  render(<App />);
  const languages = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'C#'];
  languages.forEach(lang => {
    const langElement = screen.getByText(lang);
    expect(langElement).toBeInTheDocument();
  });
});
