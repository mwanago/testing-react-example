import { Box, Container, InputLabel, styled } from '@mui/material';

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const Content = styled(Box)`
  height: 100%;
  position: relative;
  overflow: auto;
`;

export const DarkContainer = styled(Container)`
  background: ${(p) => p.theme.palette.primary.main};
  color: ${(p) => p.theme.palette.primary.contrastText};
`;

export const DarkContainerWide = styled(Box)`
  background: ${(p) => p.theme.palette.primary.main};
  color: ${(p) => p.theme.palette.primary.contrastText};
`;

export const DarkInputLabel = styled(InputLabel)`
  color: ${(p) => p.theme.palette.primary.contrastText};
`;
