import {
  styled,
  Menu,
  MenuItem,
  menuClasses,
  MenuProps,
  Fade,
} from '@mui/material';

export const StyledMenu = styled((p: MenuProps) => (
  <Menu elevation={0} TransitionComponent={Fade} {...p} />
))`
  & .${menuClasses.paper} {
    background-color: ${(p) => p.theme.palette.secondary.main};
    border-radius: unset;
    width: 100%;
    right: 0 !important;
    left: 0 !important;
    max-width: unset;
    margin-top: 12px;
    border-block: 1px solid ${(p) => p.theme.palette.common.black};
  }
`;
export const StyledItem = styled(MenuItem)`
  text-transform: capitalize;
  justify-content: center;
  padding: 16px 0;
  
  font-size: 1.5em;
  & > span {
    justify-content: center;
  }
`;
