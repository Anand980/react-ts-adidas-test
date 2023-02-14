import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

// #1. Render Isolated component
test('Render App Component', () => {
  render(<App />);
});
// #2.1 Testing the elements
test('Render title element', () => {
  let app = render(<App />);
  let hello = <h2>Users Post</h2>;
  expect(app.contains(hello)).toEqual(true);
});

//2.2 Test title using data-testid
test('test if "Users Post" title is rendered correctly', async () => {
  const { getByTestId, getByText } = render(<App />);

  const mytitle = getByTestId('my-title');
  expect(mytitle).toBe('Users Post');
});
