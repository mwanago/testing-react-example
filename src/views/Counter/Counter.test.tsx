import { fireEvent, render } from '@testing-library/react';
import { Counter } from '.';

describe('The Counter component', () => {
  describe('if the button is not clicked', () => {
    it('should display 0', () => {
      const counter = render(<Counter />);

      const paragraph = counter.getByText('The number of clicks: 0', {
        selector: 'p',
      });

      expect(paragraph).toBeDefined();
    });
  });
  describe('if the button is clicked once', () => {
    it('should display 1', async () => {
      const counter = render(<Counter />);

      const button = counter.getByText('Click', { selector: 'button' });

      fireEvent.click(button);

      const paragraph = await counter.findByText('The number of clicks: 1', {
        selector: 'p',
      });

      expect(paragraph).toBeDefined();
    });
  });
  describe('if the button is clicked twice', () => {
    it('should display 2', async () => {
      const counter = render(<Counter />);

      const button = counter.getByText('Click', { selector: 'button' });

      fireEvent.click(button);
      fireEvent.click(button);

      const paragraph = await counter.findByText('The number of clicks: 2', {
        selector: 'p',
      });

      expect(paragraph).toBeDefined();
    });
  });
});
