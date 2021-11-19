import { render, screen, waitFor, 
  waitForElementToBeRemoved } from '@testing-library/react';
import { Async } from '.';

test('it rendes correctly', async () => {
  render(<Async />)

  expect(screen.getByText('Hello World')).toBeInTheDocument();
  const content = screen.queryByText('button');
  //await waitForElementToBeRemoved(content);
   await waitFor(() => {
     return expect(content).not.toBeInTheDocument();
   })
  //expect(await screen.findByText('button')).toBeInTheDocument();
})