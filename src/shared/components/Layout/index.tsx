import { Header } from './Header';
import { FC, PropsWithChildren } from 'react';
import { Box } from '@mui/material';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box display={'flex'} flexDirection={'column'} height={{xs: 'auto', md:' 100%'}} overflow={{xs: 'auto', md: 'hidden'}} flex={1}>
      <Header />
      <Box position={'relative'} height={{xs: 'auto'}} display={'flex'} overflow={{xs: 'auto'}} flex={1} width={'100%;'} flexDirection={'column'}>
        {children}
      </Box>
    </Box>
  );
};
