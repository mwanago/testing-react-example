import { HeaderBoxStyled } from './Header.styled';
import { IconButton } from '@mui/material';
import { useState, MouseEvent } from 'react';
import { Menu } from '@mui/icons-material';
import { Navigation } from '../Navigation';

export const Header = () => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);
  const onMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(e.currentTarget);
    setIsNavigationOpen(true);
  };
  const onMenuClose = () => {
    setMenuAnchor(null);
    setIsNavigationOpen(false);
  };

  return (
    <HeaderBoxStyled>
      <IconButton onClick={onMenuOpen}>
        <Menu />
      </IconButton>
      <Navigation
        open={isNavigationOpen}
        anchorEl={menuAnchor}
        onClose={onMenuClose}
      />
    </HeaderBoxStyled>
  );
};
