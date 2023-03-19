import { Box } from '@mui/material';

export const SectionSpacer = ({spacing}: {spacing?: number}) => {
  return (<Box pt={spacing ?? 4} />);
};