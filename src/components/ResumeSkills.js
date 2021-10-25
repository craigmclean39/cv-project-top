import React from 'react';
import { Chip, Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const ResumeSkills = (props) => {
  const { skills } = props;
  const isLarge = useMediaQuery('(min-width:600px)');
  const lineHeight = isLarge ? '24px' : '12px';

  const mySkills = skills.map((value) => {
    return (
      <Chip
        sx={{
          m: 0,
          height: isLarge ? '24px' : '12px',
          borderRadius: isLarge ? '16px' : '8px',
          fontSize: isLarge ? '13px' : '6.5px',
          '& .MuiChip-label': {
            px: isLarge ? '8px' : '4px',
          },
        }}
        label={value._skill}
        key={value._id}
        size='small'
        color='primary'
      />
    );
  });

  if (mySkills.length > 0) {
    return (
      <Box
        sx={{
          boxSizing: 'border-box',
          m: isLarge ? 1 : 0.5,
          lineHeight: lineHeight,
        }}>
        <Typography variant='button' component='h4'>
          Skills
        </Typography>
        <Box
          sx={{
            boxSizing: 'border-box',
            m: isLarge ? 1 : 0.5,
            display: 'flex',
            flexWrap: 'wrap',
            gap: isLarge ? '2px' : '1px',
            rowGap: isLarge ? '10px' : '5px',
            lineHeight: lineHeight,
          }}>
          {mySkills}
        </Box>
      </Box>
    );
  }
  return null;
};

export default ResumeSkills;
