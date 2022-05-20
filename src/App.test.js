import { render, screen } from '@testing-library/react';
import Home from './Modules/Home';

test('Find pokemon element', ()=>{
  render(<Home/>);
  setTimeout(()=>{
      expect(screen.baseElement.querySelector('#pokemon')).toBeInTheDocument();
  }, 2000)
});