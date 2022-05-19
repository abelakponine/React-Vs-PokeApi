import { render, screen } from '@testing-library/react';
import Home from './views/home';

test('renders learn react link', async () => {
  
  render(<Home/>);
  
  const linkElement = await screen.findByText((con, elem)=>{
    return elem.id == 'pokemon';
  });
  console.log(linkElement.querySelector('label').textContent)
  expect(linkElement.querySelector('label').textContent.toLowerCase()).toBe('pikachu');
});