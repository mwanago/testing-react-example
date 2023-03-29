import { useNavigate } from 'react-router';
import { MenuProps } from '@mui/material';
import {
  StyledMenu,
  StyledItem,
} from './Navigation.styled';
import { FC } from 'react';

interface Props extends MenuProps {
  onClose: () => void;
}

const navigationItems = [
  { path: '/', label: 'Home' },
  { path: '/posts', label: 'Posts' },
  { path: '/counter', label: 'Counter' },
];

export const Navigation: FC<Props> = ({ onClose, ...materialProps }) => {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <StyledMenu onClose={onClose} {...materialProps}>
      {navigationItems.map((navItem) => (
        <StyledItem
          key={navItem.path}
          onClick={() => handleClick(navItem.path)}
        >
          {navItem.label}
        </StyledItem>
      ))}
    </StyledMenu>
  );
};
