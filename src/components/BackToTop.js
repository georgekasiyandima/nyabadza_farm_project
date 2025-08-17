import React from 'react';
import { Button, useTheme } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function BackToTop({ colorOverride }) {
  const [show, setShow] = React.useState(false);
  const theme = useTheme();

  React.useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!show) return null;

  const isDark = theme.palette.mode === 'dark';
  const bgColor = colorOverride === 'primary'
    ? theme.palette.primary.main
    : theme.palette.background.paper;
  const iconColor = colorOverride === 'primary' || isDark ? '#fff' : theme.palette.primary.main;

  return (
    <Button
      variant="contained"
      color={colorOverride || 'primary'}
      onClick={handleScrollTop}
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1200,
        borderRadius: '50%',
        minWidth: 0,
        width: 48,
        height: 48,
        boxShadow: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bgColor,
        '&:hover': {
          background: colorOverride === 'primary'
            ? theme.palette.primary.dark
            : theme.palette.action.hover,
        },
      }}
      aria-label="Scroll to top"
    >
      <ArrowUpwardIcon sx={{ color: iconColor }} />
    </Button>
  );
}

export default BackToTop;
