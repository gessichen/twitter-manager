import { forwardRef } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Box from '@mui/material/Box';

const Scrollbar = forwardRef((props, ref) => {
  const { children, ...other } = props;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    return (
      <Box
        ref={ref}
        sx={{ overflowX: 'auto' }}
      >
        {children}
      </Box>
    );
  }

  return (
    <PerfectScrollbar
      // @ts-ignore
      ref={ref}
      {...other}
    >
      {children}
    </PerfectScrollbar>
  );
});

export default Scrollbar;
