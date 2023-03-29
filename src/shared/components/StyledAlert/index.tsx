import { Alert, alertClasses, AlertProps, styled } from '@mui/material';

export const StyledAlert = styled((p: AlertProps) => (
  <Alert severity={'error'} variant={'filled'} {...p} />
))`
  & .${alertClasses.icon} {
    flex-shrink: 0;
  }
`;
