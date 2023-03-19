import { Box, lighten, styled } from '@mui/material';

export const HeaderBoxStyled = styled(Box)`
  position: relative;
  display: flex;
  background-color: ${(p) => lighten(p.theme.palette.secondary.main, 0.3)};
  justify-content: flex-start;
  height: 64px;
  padding: ${(p) => p.theme.spacing(1.5, 2)};
`;

export const Logo = styled('img')`
  margin-right: auto;
  height: 100%;
`;
