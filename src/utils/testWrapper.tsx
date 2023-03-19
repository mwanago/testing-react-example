import { FC, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const TestWrapper: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);
